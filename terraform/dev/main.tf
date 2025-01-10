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

module "s3_cloudfront" {
  source = "../modules/s3_cloudfront"

  bucket_name                = local.bucket_name
  origin_access_control_name = local.origin_access_control_name

  own_domain_names = {
    acm_certificate_arn = data.aws_acm_certificate.virginia_cert.arn
    aliases = [
      "dev.${var.domain_name}"
    ]
  }
}

resource "aws_route53_record" "sub_domain" {
  zone_id = data.aws_route53_zone.host_domain.zone_id
  name    = "dev.${var.domain_name}"
  type    = "A"

  alias {
    name                   = module.s3_cloudfront.cloudfront_domain_name
    zone_id                = module.s3_cloudfront.cloudfront_hosted_zone_id
    evaluate_target_health = false
  }
}

output "cloudfront_domain_name" { value = module.s3_cloudfront.cloudfront_domain_name }
