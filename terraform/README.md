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

### Coding style

Please follow the [official style guide](https://developer.hashicorp.com/terraform/language/style) as much as possible.
You can use the following commands to format and validate the code.

```bash
terraform fmt terraform/
terraform validate terraform/

tflint --init
tflint --chdir=terraform/ --recursive
```

## Deployments

### Prerequisites

> [!IMPORTANT]
> The process written below is for the first time setup and it is already done.
> So you can skip this section and go to "Using GitHub Actions" section.

#### Register Domain

The domain `limitlab.xyz` is manually registered from AWS console.
It is registered at **prod-limitlab (664418960222)** account.
It costs **14.0 USD per year** and auto renewed.
You can check it from [Route 53](https://us-east-1.console.aws.amazon.com/route53/v2/hostedzones?region=ap-northeast-1#ListRecordSets/Z0529507QPFVJNMD07YL).
An associated hosted zone is automatically created.

#### Create Terraform Backend

S3 bucket and DynamoDB table to store Terraform state are created by running the following script.
You need to run following at both `prod` and `dev` env.

```bash
export AWS_REGION="ap-northeast-1"
export AWS_ACCESS_KEY_ID=<YOUR_AWS_ACCESS_KEY_ID>
export AWS_SECRET_ACCESS_KEY=<YOUR_AWS_SECRET_ACCESS_KEY>
export AWS_SESSION_TOKEN=<YOUR_AWS_SESSION_TOKEN>

python3 scripts/create_terraform_backend.py
```

#### Delegating the `dev.limitlab.xyz` subdomain

Currently, there are two environments — `prod` and `dev`.
The `limitlab.xyz` domain is registered in the `prod` environment, but we have configured the system so that the `dev.limitlab.xyz` subdomain is delegated to the `dev` environment. By following the deployment steps below, you can delegate `dev.limitlab.xyz` to the `dev` environment.


1. **Prime the dev workspace** – create only the hosted zone and ACM validation record so you can capture the NS values without waiting for certificate validation:
   ```bash
   cd terraform/dev
   terraform init
   terraform apply \
     -target=aws_route53_zone.subdomain \
     -target=aws_route53_record.subdomain_certificate_validation
   ```
   Record the `subdomain_name_servers` output (`terraform -chdir=terraform/dev output -json subdomain_name_servers`).

2. **Delegate from prod** – supply those name servers when running the prod workspace so the parent zone forwards queries to the dev account:
   ```bash
   cd terraform/prod
   terraform plan -var='dev_subdomain_name_servers=["ns-123.awsdns-00.net", "ns-456.awsdns-10.org", ...]'
   terraform apply -var='dev_subdomain_name_servers=["ns-123.awsdns-00.net", "ns-456.awsdns-10.org", ...]'
   ```

3. **Finish the dev apply** – with delegation live, rerun the dev workspace normally so ACM validation succeeds and the remaining resources are created:
   ```bash
   cd terraform/dev
   terraform apply
   ```
   If the variable is omitted or left empty, the prod workspace skips creating the delegation NS record, and ACM validation in dev remains pending.

#### Register GitHub Actions secrets for workflow

Next, to ensure that the GitHub Actions workflow functions properly, you need to register following secrets through the [GitHub UI](https://github.com/cvpaperchallenge-alumni/limit-lab-homepage/settings/secrets/actions).

| Secret name | Terraform output name | Description |
|:--------|:--------|:-------|
| PROD_AWS_REGION | - | AWS region to deploy for `prod`. Currently `ap-northeast-1`. |
| PROD_DEPLOY_ROLE_ARN | site_deploy_role_arn | ARN of assumed role to deploy site content for `prod`. |
| PROD_S3_BUCKET_NAME | site_s3_bucket_name | A name of target S3 bucket of site content deployment for `prod`. |
| PROD_TERRAFORM_ROLE_ARN | terraform_deploy_role_arn | ARN of assumed role to deploy infra by Terraform for `prod`. |
| PROD_DEV_SUBDOMAIN_NS | subdomain_name_servers | A list of NS record which enable dev subdomain delegation for `prod`. |
| DEV_AWS_REGION | - | AWS region to deploy for `dev`. Currently `ap-northeast-1`. |
| DEV_DEPLOY_ROLE_ARN | site_deploy_role_arn | ARN of assumed role to deploy site content for `dev`. |
| DEV_S3_BUCKET_NAME | site_s3_bucket_name | A name of target S3 bucket of site content deployment for `dev`. |
| DEV_TERRAFORM_ROLE_ARN | terraform_deploy_role_arn | ARN of assumed role to deploy infra by Terraform for `dev`. |

### Using GitHub Actions

A reusable workflow lives in `.github/workflows/terraform-run.yaml`.  
Run the environment specific workflow to apply changes:

```text
GitHub UI → Actions → terraform-prod → Run workflow
```

You can run the job in `plan_only` mode first, then re-run with apply enabled.  
The workflow assumes the IAM role stored in the `PROD_TERRAFORM_ROLE_ARN` secret.  
For environment approvals, configure GitHub environments named `terraform-prod` and `terraform-dev` (separate from any site deployment environments).

> [!IMPORTANT]
> To keep the `dev.limitlab.xyz` delegation intact during automated runs, define the repository (or environment) secret `PROD_DEV_SUBDOMAIN_NS` with the JSON array of name servers emitted by the dev workspace, for example `["ns-123.awsdns-00.net","ns-456.awsdns-10.org",...]`. The workflow automatically injects this value when performing `terraform plan`/`apply` in prod; if the secret is omitted, the delegation NS record is skipped.

### Manual deployments

> [!NOTE]
> Ideally, we should rely on the GitHub Actions workflow above.  
> The manual steps below are kept for troubleshooting.

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
