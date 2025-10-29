"""

This script creates a Terraform backend for the given environment to store the
state. This script is idempotent and can be run multiple times.
Following resources are created:
- S3 bucket
- DynamoDB table

"""
import json
import boto3
from botocore.exceptions import ClientError

def create_s3_bucket(bucket_name: str, region: str) -> None:
    """
    Create an S3 bucket for storing Terraform state, ensuring idempotency.

    Args:
        bucket_name (str): The name of the S3 bucket to create.
        region (str): The AWS region where the bucket will be created.

    """
    s3 = boto3.client("s3", region_name=region)
    try:
        # Check if the bucket already exists
        s3.head_bucket(Bucket=bucket_name)
        print(f"S3 bucket '{bucket_name}' already exists.")
    except ClientError as e:
        if e.response["Error"]["Code"] == "404":
            # Create the bucket if it doesn"t exist
            s3.create_bucket(
                Bucket=bucket_name,
                CreateBucketConfiguration={"LocationConstraint": region}
            )
            print(f"S3 bucket '{bucket_name}' created successfully.")
        else:
            print(f"Error checking S3 bucket: {e}")

def enable_versioning(bucket_name: str) -> None:
    """
    Enable versioning on the S3 bucket, ensuring idempotency.

    Args:
        bucket_name (str): The name of the S3 bucket.

    """
    s3 = boto3.client("s3")
    try:
        # Enable versioning (idempotent by default)
        s3.put_bucket_versioning(
            Bucket=bucket_name,
            VersioningConfiguration={"Status": "Enabled"}
        )
        print(f"Versioning enabled on S3 bucket '{bucket_name}'.")
    except ClientError as e:
        print(f"Error enabling versioning: {e}")

def enable_encryption(bucket_name: str) -> None:
    """
    Enable server-side encryption on the S3 bucket.

    Args:
        bucket_name (str): The name of the S3 bucket.

    """
    s3 = boto3.client("s3")
    try:
        s3.put_bucket_encryption(
            Bucket=bucket_name,
            ServerSideEncryptionConfiguration={
                "Rules": [
                    {
                        "ApplyServerSideEncryptionByDefault": {
                            "SSEAlgorithm": "AES256"
                        }
                    }
                ]
            }
        )
        print(f"Encryption enabled on S3 bucket '{bucket_name}'.")
    except ClientError as e:
        print(f"Error enabling encryption: {e}")

def _find_sso_admin_role_arn(region: str) -> str | None:
    """Locate the AWS SSO AdministratorAccess role ARN for the account.

    Args:
        region: AWS region that hosts the SSO-managed roles (used in the path prefix).

    Returns:
        The ARN of the first role whose name starts with
        ``AWSReservedSSO_AdministratorAccess`` under the SSO path in the
        current account. Returns ``None`` when no such role is found.
    """
    iam = boto3.client("iam")
    path_prefix = f"/aws-reserved/sso.amazonaws.com/{region}/"

    paginator = iam.get_paginator("list_roles")
    for page in paginator.paginate(PathPrefix=path_prefix):
        for role in page.get("Roles", []):
            if role["RoleName"].startswith("AWSReservedSSO_AdministratorAccess"):
                return role["Arn"]

    return None


def create_s3_bucket_policy(bucket_name: str, region: str) -> None:
    """
    Create or update the bucket policy for an S3 bucket.

    Args:
        bucket_name (str): The name of the S3 bucket.
        region (str): The AWS region.
    """
    s3 = boto3.client("s3")
    try:
        principal_arn = _find_sso_admin_role_arn(region)
        if not principal_arn:
            print(
                "No AWS SSO AdministratorAccess role found; skipping bucket policy application."
            )
            return

        # Define the bucket policy
        bucket_policy = {
            "Version": "2012-10-17",
            "Statement": [
                {
                    "Sid": "AllowSSOAdministratorAccess",
                    "Effect": "Allow",
                    "Principal": {"AWS": principal_arn},
                    "Action": "s3:*",
                    "Resource": [
                        f"arn:aws:s3:::{bucket_name}",
                        f"arn:aws:s3:::{bucket_name}/*"
                    ]
                }
            ]
        }

        # Put the bucket policy
        s3.put_bucket_policy(
            Bucket=bucket_name,
            Policy=json.dumps(bucket_policy)
        )
        print(f"Bucket policy applied to '{bucket_name}'.")
    except ClientError as e:
        print(f"Error setting bucket policy: {e}")

def create_dynamodb_table(table_name: str, region: str) -> None:
    """
    Create a DynamoDB table for Terraform state locking, ensuring idempotency.

    Args:
        table_name (str): The name of the DynamoDB table to create.
        region (str): The AWS region where the table will be created.

    """
    dynamodb = boto3.client("dynamodb", region_name=region)
    try:
        # Check if the table already exists
        existing_tables = dynamodb.list_tables()["TableNames"]
        if table_name in existing_tables:
            print(f"DynamoDB table '{table_name}' already exists.")
        else:
            # Create the table if it doesn"t exist
            dynamodb.create_table(
                TableName=table_name,
                KeySchema=[
                    {"AttributeName": "LockID", "KeyType": "HASH"}
                ],
                AttributeDefinitions=[
                    {"AttributeName": "LockID", "AttributeType": "S"}
                ],
                ProvisionedThroughput={
                    "ReadCapacityUnits": 1,
                    "WriteCapacityUnits": 1
                }
            )
            print(f"DynamoDB table '{table_name}' created successfully.")
    except ClientError as e:
        print(f"Error creating DynamoDB table: {e}")

def get_aws_account_id() -> str | None:
    """
    Retrieve the AWS account ID of the current caller.

    Returns:
        str: The AWS account ID.
    """
    try:
        sts_client = boto3.client("sts")
        response = sts_client.get_caller_identity()
        account_id = response["Account"]
        return account_id
    except Exception as e:
        print(f"Error retrieving AWS account ID: {e}")
        return None

def main() -> None:
    """
    Main function to parse arguments and execute bucket and table creation.

    Returns:
        None
    """
    import argparse
    import sys
    from typing import Dict

    # Define known AWS accounts and their environments
    id_to_environment: Dict[str, str] = {
        "664418960222": "prod",
        "022731370203": "dev",
    }

    parser = argparse.ArgumentParser(description="Create S3 bucket and DynamoDB table for Terraform backend.")
    parser.add_argument("--project-name", type=str, default="limitlab-webpage", help="Project name.")
    parser.add_argument("--region", type=str, default="ap-northeast-1", help="AWS region to use.")
    args = parser.parse_args()

    # Get AWS account ID
    account_id = get_aws_account_id()
    if account_id not in id_to_environment:
        print(f"AWS account ID: {account_id} is unknown. Exiting.")
        sys.exit(1)

    environment = id_to_environment[account_id]
    print(f"Detected environment '{environment}' for account {account_id}")

    # Determine bucket and table names based on the environment
    project_name = args.project_name
    region = args.region

    s3_bucket_name = f"{environment}-{project_name}-state"
    dynamodb_table_name = f"{environment}-{project_name}-state-lock"

    create_s3_bucket(s3_bucket_name, region)
    enable_versioning(s3_bucket_name)
    enable_encryption(s3_bucket_name)
    create_s3_bucket_policy(s3_bucket_name, region)
    create_dynamodb_table(dynamodb_table_name, region)

if __name__ == "__main__":
    main()
