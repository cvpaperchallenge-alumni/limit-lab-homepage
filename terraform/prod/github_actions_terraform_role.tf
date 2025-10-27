locals {
  terraform_role_name      = "terraform-deploy-role"
  terraform_policy_name    = "terraform-deploy-policy"
  github_actions_role_name = "github-actions-role"
  bucket_arn               = "arn:aws:s3:::${local.bucket_name}"
  bucket_objects_arn       = "${local.bucket_arn}/*"
  state_bucket_name        = "prod-limitlab-webpage-state"
  state_bucket_arn         = "arn:aws:s3:::${local.state_bucket_name}"
  state_bucket_objects_arn = "${local.state_bucket_arn}/*"
  state_lock_table_name    = "prod-limitlab-webpage-state-lock"
  state_lock_table_arn     = "arn:aws:dynamodb:ap-northeast-1:${data.aws_caller_identity.current.account_id}:table/${local.state_lock_table_name}"
  distribution_arn_prefix  = "arn:aws:cloudfront::${data.aws_caller_identity.current.account_id}:distribution"
  origin_access_arn_prefix = "arn:aws:cloudfront::${data.aws_caller_identity.current.account_id}:origin-access-control"
  github_actions_role_arn  = "arn:aws:iam::${data.aws_caller_identity.current.account_id}:role/${local.github_actions_role_name}"
  terraform_role_arn       = "arn:aws:iam::${data.aws_caller_identity.current.account_id}:role/${local.terraform_role_name}"
  iam_policy_arn           = "arn:aws:iam::${data.aws_caller_identity.current.account_id}:policy/${local.terraform_policy_name}"
  acm_certificate_arn      = aws_acm_certificate.virginia_cert.arn
  route53_zone_arn         = "arn:aws:route53:::hostedzone/${data.aws_route53_zone.host_domain.zone_id}"
}

data "aws_caller_identity" "current" {}

data "aws_iam_policy_document" "terraform_actions" {
  statement {
    sid = "S3CloudFrontBucketManagement"
    actions = [
      "s3:CreateBucket",
      "s3:DeleteBucket",
      "s3:GetBucket*",
      "s3:ListBucket",
      "s3:PutBucketAcl",
      "s3:PutBucketCors",
      "s3:PutBucketPolicy",
      "s3:PutBucketPublicAccessBlock",
      "s3:PutBucketTagging",
      "s3:GetBucketPolicy",
      "s3:GetBucketTagging",
      "s3:GetBucketLocation"
    ]
    resources = [local.bucket_arn]
  }

  statement {
    sid       = "S3CloudFrontBucketObjects"
    actions   = ["s3:DeleteObject", "s3:GetObject", "s3:PutObject", "s3:PutObjectAcl"]
    resources = [local.bucket_objects_arn]
  }

  statement {
    sid = "TerraformStateBucketList"
    actions = [
      "s3:ListBucket",
      "s3:GetBucketLocation"
    ]
    resources = [local.state_bucket_arn]
  }

  statement {
    sid       = "TerraformStateBucketObjects"
    actions   = ["s3:GetObject", "s3:PutObject", "s3:DeleteObject"]
    resources = [local.state_bucket_objects_arn]
  }

  statement {
    sid = "CloudFrontManagement"
    actions = [
      "cloudfront:CreateDistribution",
      "cloudfront:UpdateDistribution",
      "cloudfront:DeleteDistribution",
      "cloudfront:GetDistribution",
      "cloudfront:GetDistributionConfig",
      "cloudfront:ListTagsForResource",
      "cloudfront:TagResource",
      "cloudfront:UntagResource",
      "cloudfront:CreateOriginAccessControl",
      "cloudfront:UpdateOriginAccessControl",
      "cloudfront:DeleteOriginAccessControl",
      "cloudfront:GetOriginAccessControl",
      "cloudfront:GetOriginAccessControlConfig"
    ]
    resources = [
      "${local.distribution_arn_prefix}/*",
      "${local.origin_access_arn_prefix}/*"
    ]
  }

  statement {
    sid = "CloudFrontRead"
    actions = [
      "cloudfront:ListDistributions",
      "cloudfront:ListOriginAccessControls"
    ]
    resources = ["*"]
  }

  statement {
    sid = "Route53HostedZoneManagement"
    actions = [
      "route53:ChangeResourceRecordSets",
      "route53:GetHostedZone",
      "route53:ListResourceRecordSets",
      "route53:ListTagsForResource"
    ]
    resources = [local.route53_zone_arn]
  }

  statement {
    sid = "Route53GlobalReads"
    actions = [
      "route53:ListHostedZones",
      "route53:ListHostedZonesByName",
      "route53:GetHostedZoneCount"
    ]
    resources = ["*"]
  }

  statement {
    sid = "Route53DomainsRead"
    actions = [
      "route53domains:ListDomains",
      "route53domains:GetDomainDetail"
    ]
    resources = ["*"]
  }

  statement {
    sid = "OIDCProviderManagement"
    actions = [
      "iam:CreateOpenIDConnectProvider",
      "iam:DeleteOpenIDConnectProvider",
      "iam:GetOpenIDConnectProvider",
      "iam:TagOpenIDConnectProvider",
      "iam:UntagOpenIDConnectProvider",
      "iam:UpdateOpenIDConnectProviderThumbprint"
    ]
    resources = ["arn:aws:iam::${data.aws_caller_identity.current.account_id}:oidc-provider/token.actions.githubusercontent.com"]
  }

  statement {
    sid = "GithubActionsRoleManagement"
    actions = [
      "iam:AttachRolePolicy",
      "iam:CreateRole",
      "iam:DeleteRole",
      "iam:DeleteRolePolicy",
      "iam:DetachRolePolicy",
      "iam:GetOpenIDConnectProvider",
      "iam:GetRole",
      "iam:GetRolePolicy",
      "iam:GetPolicy",
      "iam:GetPolicyVersion",
      "iam:ListPolicyVersions",
      "iam:ListAttachedRolePolicies",
      "iam:ListRolePolicies",
      "iam:PutRolePolicy",
      "iam:TagRole",
      "iam:UntagRole",
      "iam:UpdateAssumeRolePolicy",
      "iam:UpdateRole"
    ]
    resources = [
      local.github_actions_role_arn,
      local.terraform_role_arn,
      local.iam_policy_arn
    ]
  }

  statement {
    sid = "AcmCertificateRead"
    actions = [
      "acm:DescribeCertificate",
      "acm:ListTagsForCertificate"
    ]
    resources = [local.acm_certificate_arn]
  }

  statement {
    sid = "AcmList"
    actions = [
      "acm:ListCertificates"
    ]
    resources = ["*"]
  }

  statement {
    sid = "S3BucketConfigurationRead"
    actions = [
      "s3:GetAccelerateConfiguration",
      "s3:GetEncryptionConfiguration",
      "s3:GetBucketWebsite",
      "s3:GetBucketLogging"
    ]
    resources = [local.bucket_arn]
  }

  statement {
    sid = "TerraformStateLocking"
    actions = [
      "dynamodb:DescribeTable",
      "dynamodb:GetItem",
      "dynamodb:PutItem",
      "dynamodb:DeleteItem",
      "dynamodb:UpdateItem"
    ]
    resources = [local.state_lock_table_arn]
  }
}

resource "aws_iam_policy" "terraform_actions" {
  name        = local.terraform_policy_name
  description = "Least privilege policy for Terraform GitHub Actions deployment role."
  policy      = data.aws_iam_policy_document.terraform_actions.json
}

resource "aws_iam_role" "terraform_actions" {
  name = local.terraform_role_name

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect    = "Allow"
        Principal = { Federated = aws_iam_openid_connect_provider.github_actions.arn }
        Action    = "sts:AssumeRoleWithWebIdentity"
        Condition = {
          StringEquals = {
            "token.actions.githubusercontent.com:aud" = "sts.amazonaws.com"
          }
          StringLike = {
            "token.actions.githubusercontent.com:sub" = "repo:${var.github_repo}:*"
          }
        }
      }
    ]
  })
}

resource "aws_iam_role_policy_attachment" "terraform_actions" {
  role       = aws_iam_role.terraform_actions.name
  policy_arn = aws_iam_policy.terraform_actions.arn
}

output "terraform_deploy_role_arn" {
  description = "ARN of the IAM role assumed by GitHub Actions for Terraform deployment."
  value       = aws_iam_role.terraform_actions.arn
}
