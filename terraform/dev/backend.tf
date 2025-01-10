terraform {
  backend "s3" {
    key            = "dev/terraform.tfstate"
    region         = "ap-northeast-1"
    bucket         = "prod-limitlab-webpage-state"      # We use prod bucket for now.
    dynamodb_table = "prod-limitlab-webpage-state-lock" # We use prod table for now.
    encrypt        = true
  }

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "5.82.2"
    }
  }

  required_version = "= 1.10.3"
}

provider "aws" {
  region = "ap-northeast-1"
}

# CloudFront requires ACM certificate in us-east-1 region.
provider "aws" {
  alias  = "virginia"
  region = "us-east-1"
}
