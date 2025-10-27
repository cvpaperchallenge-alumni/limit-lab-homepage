# LIMIT.Lab Terraform

We are using Terraform to manage the infrastructure of the LIMIT.Lab website.
We deploy the website on AWS using CloudFront, S3, and Route 53.

## Start developing

### Enter terraform container

We use an [official Docker image](https://hub.docker.com/r/hashicorp/terraform) to run Terraform in a consistent environment.

```bash
cd environments
docker compose build --no-cache
docker compose up -d
docker compose exec terraform bash

# Inside the container
export AWS_REGION="ap-northeast-1"
export AWS_ACCESS_KEY_ID=<YOUR_AWS_ACCESS_KEY_ID>
export AWS_SECRET_ACCESS_KEY=<YOUR_AWS_SECRET_ACCESS_KEY>
export AWS_SESSION_TOKEN=<YOUR_AWS_SESSION_TOKEN>
```

Now you can run Terraform commands inside the container.

### Codeing style

Please follow the [official style guide](https://developer.hashicorp.com/terraform/language/style) as much as possible.
You can use the following commands to format and validate the code.

```bash
terraform fmt terraform/
terraform validate terraform/

tflint --init
tflint --chdir=terraform/ --recursive
```

## Deployments

### Using GitHub Actions

A reusable workflow lives in `.github/workflows/terraform-run.yaml`.  
Run the environment specific workflow to apply changes:

```text
GitHub UI → Actions → terraform-prod → Run workflow
```

You can run the job in `plan_only` mode first, then re-run with apply enabled.  
The workflow assumes the IAM role stored in the `PROD_TERRAFORM_ROLE_ARN` secret.

#### Bootstrapping the deployment role

Before the GitHub Actions workflow can apply Terraform, create the IAM role and OIDC provider using local credentials that already have sufficient AWS permissions:

```bash
cd terraform/prod
terraform init
terraform apply
```

After the apply completes, take the ARN of `terraform-deploy-role` and store it in the repository secret `PROD_TERRAFORM_ROLE_ARN`.  
Once this one-time bootstrap is done, the workflow can assume the role automatically.

### Manual deployments

> [!NOTE]
> Ideally, we should rely on the GitHub Actions workflow above.  
> The manual steps below are kept for troubleshooting.

### Prerequisites

> [!IMPORTANT]
> The process written below is for the first time setup and it is already done.
> So you can skip this section.

#### Register Domain

The domain `limitlab.xyz` is manually registered from AWS console.
It is registered at **prod-limitlab (664418960222)** account.
It costs **14.0 USD per year** and auto renewed.
You can check it from [Route 53](https://us-east-1.console.aws.amazon.com/route53/v2/hostedzones?region=ap-northeast-1#ListRecordSets/Z0529507QPFVJNMD07YL).
An associated hosted zone is automatically created.

#### Create Terraform Backend

S3 bucket and DynamoDB table to store Terraform state are created by running the following script.

```bash
export AWS_REGION="ap-northeast-1"
export AWS_ACCESS_KEY_ID=<YOUR_AWS_ACCESS_KEY_ID>
export AWS_SECRET_ACCESS_KEY=<YOUR_AWS_SECRET_ACCESS_KEY>
export AWS_SESSION_TOKEN=<YOUR_AWS_SESSION_TOKEN>

python3 scripts/create_terraform_backend.py
```

### Deploy `prod` resources

The `prod` environment includes following resources.
- ACM Certificate in `us-east-1`. 
- S3 bucket for static website hosting.
- CloudFront distribution for CDN.
- Route 53 record set for domain.

> [!NOTE]
> The ACM certificate is created in `us-east-1` because it is required for CloudFront distribution.

```bash
cd terraform/prod

terraform init
terraform plan
terraform apply
```

## Undeployments

### Undeploy `prod` resources

```bash
cd terraform/prod

terraform init
terraform destroy
```

### Delete Terraform Backend

Manually delete the S3 bucket and DynamoDB table created for Terraform backend from AWS console.
- S3 bucket: `limitlab-terraform-state`
- DynamoDB table: `limitlab-terraform-state-lock`

### Deregister Domain and Hosted Zone

Manually delete the hosted zone and deregister the domain from AWS console.
- Hosted zone: `limitlab.xyz`
