locals {
  bucket_name                = "${var.environment}-${var.project_name}-cloudfront-origin"
  origin_access_control_name = "${var.environment}-${var.project_name}-cloudfront-origin-access-control"
}

data "aws_acm_certificate" "virginia_cert" {
  provider    = aws.virginia
  domain      = var.domain_name
  statuses    = ["ISSUED"]
  most_recent = true
}

# Route 53 hosted zone is automatically created when the domain is registered from AWS console.
data "aws_route53_zone" "host_domain" {
  name = "${var.domain_name}."
}

resource "aws_acm_certificate" "virginia_cert" {
  # ACM certificate in us-east-1 region is required for CloudFront.
  provider = aws.virginia

  domain_name               = var.domain_name
  subject_alternative_names = ["*.${var.domain_name}"]
  validation_method         = "DNS"

  lifecycle {
    create_before_destroy = true
  }
}

module "s3_cloudfront" {
  source = "../modules/s3_cloudfront"

  bucket_name                = local.bucket_name
  origin_access_control_name = local.origin_access_control_name

  own_domain_names = {
    acm_certificate_arn = data.aws_acm_certificate.virginia_cert.arn
    aliases = [
      var.domain_name,
      "prod.${var.domain_name}"
    ]
  }
}

resource "aws_route53_record" "root_domain" {
  zone_id = data.aws_route53_zone.host_domain.zone_id
  name    = var.domain_name
  type    = "A"

  alias {
    name                   = module.s3_cloudfront.cloudfront_domain_name
    zone_id                = module.s3_cloudfront.cloudfront_hosted_zone_id
    evaluate_target_health = false
  }
}

resource "aws_route53_record" "google_search_console_verification" {
  zone_id = data.aws_route53_zone.host_domain.zone_id
  name    = var.domain_name
  type    = "TXT"
  ttl     = 300
  records = ["\"google-site-verification=ji-hT4NRIusCUNz2z3vvVhqAUrEYfdUgEbj_Z-K39B0\""]
}

resource "aws_route53_record" "sub_domain" {
  zone_id = data.aws_route53_zone.host_domain.zone_id
  name    = "prod.${var.domain_name}"
  type    = "A"

  alias {
    name                   = module.s3_cloudfront.cloudfront_domain_name
    zone_id                = module.s3_cloudfront.cloudfront_hosted_zone_id
    evaluate_target_health = false
  }
}

resource "aws_route53_record" "dev_domain" {
  # Only create the NS delegation when name servers are provided (i.e. dev hosted zone exists).
  count   = length(var.dev_subdomain_name_servers) > 0 ? 1 : 0
  zone_id = data.aws_route53_zone.host_domain.zone_id
  name    = "dev.${var.domain_name}"
  type    = "NS"
  ttl     = 172800
  records = var.dev_subdomain_name_servers
}

resource "aws_route53_record" "iccv2025_found_workshop_domain" {
  zone_id = data.aws_route53_zone.host_domain.zone_id
  name    = "iccv2025-found-workshop.${var.domain_name}"
  type    = "CNAME"
  ttl     = 300
  records = ["${var.github_username}.github.io."]
}


resource "aws_route53_record" "iccv2025_limit_workshop_domain" {
  zone_id = data.aws_route53_zone.host_domain.zone_id
  name    = "iccv2025-limit-workshop.${var.domain_name}"
  type    = "CNAME"
  ttl     = 300
  records = ["${var.github_username}.github.io."]
}

resource "aws_route53_record" "cambridgecv_workshop_2025sep_domain" {
  zone_id = data.aws_route53_zone.host_domain.zone_id
  name    = "cambridgecv-workshop-2025sep.${var.domain_name}"
  type    = "CNAME"
  ttl     = 300
  records = ["${var.github_username}.github.io."]
}

output "cloudfront_domain_name" {
  description = "CloudFront domain name for the production distribution"
  value       = module.s3_cloudfront.cloudfront_domain_name
}

output "site_s3_bucket_name" {
  description = "S3 bucket that stores the production website assets"
  value       = module.s3_cloudfront.s3_bucket_id
}
