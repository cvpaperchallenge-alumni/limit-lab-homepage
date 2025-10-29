locals {
  bucket_name                = "${var.environment}-${var.project_name}-cloudfront-origin"
  origin_access_control_name = "${var.environment}-${var.project_name}-cloudfront-origin-access-control"
  subdomain_domain           = format("%s.%s", var.environment, var.domain_name)
}

resource "aws_route53_zone" "subdomain" {
  name = local.subdomain_domain
}

resource "aws_acm_certificate" "subdomain" {
  provider = aws.virginia

  domain_name               = local.subdomain_domain
  subject_alternative_names = ["*.${local.subdomain_domain}"]
  validation_method         = "DNS"

  lifecycle {
    create_before_destroy = true
  }
}

resource "aws_route53_record" "subdomain_certificate_validation" {
  for_each = {
    for dvo in aws_acm_certificate.subdomain.domain_validation_options :
    dvo.domain_name => {
      name   = dvo.resource_record_name
      type   = dvo.resource_record_type
      record = dvo.resource_record_value
    }
  }

  zone_id         = aws_route53_zone.subdomain.zone_id
  name            = each.value.name
  type            = each.value.type
  ttl             = 60
  records         = [each.value.record]
  allow_overwrite = true
}

resource "aws_acm_certificate_validation" "subdomain" {
  provider                = aws.virginia
  certificate_arn         = aws_acm_certificate.subdomain.arn
  validation_record_fqdns = [for record in aws_route53_record.subdomain_certificate_validation : record.fqdn]
}

module "s3_cloudfront" {
  source = "../modules/s3_cloudfront"

  bucket_name                = local.bucket_name
  origin_access_control_name = local.origin_access_control_name

  own_domain_names = {
    acm_certificate_arn = aws_acm_certificate_validation.subdomain.certificate_arn
    aliases             = [local.subdomain_domain]
  }
}

resource "aws_route53_record" "subdomain_apex" {
  zone_id = aws_route53_zone.subdomain.zone_id
  name    = ""
  type    = "A"

  alias {
    name                   = module.s3_cloudfront.cloudfront_domain_name
    zone_id                = module.s3_cloudfront.cloudfront_hosted_zone_id
    evaluate_target_health = false
  }
}

output "cloudfront_domain_name" { value = module.s3_cloudfront.cloudfront_domain_name }
output "cloudfront_hosted_zone_id" { value = module.s3_cloudfront.cloudfront_hosted_zone_id }
output "cloudfront_distribution_id" { value = module.s3_cloudfront.cloudfront_distribution_id }
output "subdomain_name" { value = aws_route53_zone.subdomain.name }
output "subdomain_zone_id" { value = aws_route53_zone.subdomain.zone_id }
output "subdomain_name_servers" { value = aws_route53_zone.subdomain.name_servers }
