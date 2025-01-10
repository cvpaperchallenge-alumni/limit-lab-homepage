# LIMIT Lab Terraform

We are using Terraform to manage the infrastructure of the LIMIT Lab website.
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

## Manual deployments

> [!NOTE]
> Ideally, we should use CI/CD to deploy the infrastructure. However, we are doing it manually for now.

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

### Deploy `shared` resources

The `shared` resources are shared among all environments which include following resources.
- ACM Certificate in `us-east-1`. 

> [!NOTE]
> The ACM certificate is created in `us-east-1` because it is required for CloudFront distribution.

```bash
cd terraform/shared

terraform init
terraform plan
terraform apply
```

### Deploy `dev` resources

> [!NOTE]
> Currently, `dev` resources are deployed in the same AWS account (`664418960222`) as `prod` and `shared`.
> This is to minimize operational costs, but ideally, `dev` resources should be deployed in a separate AWS account.

The `dev` environment includes following resources.
- S3 bucket for static website hosting.
- CloudFront distribution for CDN.
- Route 53 record set for sub-domain.

```bash
cd terraform/dev

terraform init
terraform plan
terraform apply
```

### Deploy `prod` resources

The `prod` environment includes following resources.
- S3 bucket for static website hosting.
- CloudFront distribution for CDN.
- Route 53 record set for domain.

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

### Undeploy `dev` resources

```bash
cd terraform/dev

terraform init
terraform destroy
```

### Undeploy `shared` resources

```bash
cd terraform/shared

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