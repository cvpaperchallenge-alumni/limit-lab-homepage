locals {
  cdn_bucket_name                = "${var.environment}-${var.project_name}-cdn-cloudfront-origin"
  cdn_origin_access_control_name = "${var.environment}-${var.project_name}-cdn-cloudfront-origin-access-control"
  cdn_domain                     = format("cdn.%s", var.domain_name)
}

module "cdn_s3_cloudfront" {
  source = "../modules/s3_cloudfront"

  bucket_name                = local.cdn_bucket_name
  origin_access_control_name = local.cdn_origin_access_control_name

  own_domain_names = {
    acm_certificate_arn = data.aws_acm_certificate.virginia_cert.arn
    aliases             = [local.cdn_domain]
  }
}

resource "aws_route53_record" "cdn" {
  zone_id = data.aws_route53_zone.host_domain.zone_id
  name    = "cdn"
  type    = "A"

  alias {
    name                   = module.cdn_s3_cloudfront.cloudfront_domain_name
    zone_id                = module.cdn_s3_cloudfront.cloudfront_hosted_zone_id
    evaluate_target_health = false
  }
}

output "cdn_cloudfront_domain_name" {
  value = module.cdn_s3_cloudfront.cloudfront_domain_name
}

output "cdn_cloudfront_hosted_zone_id" {
  value = module.cdn_s3_cloudfront.cloudfront_hosted_zone_id
}

output "cdn_cloudfront_distribution_id" {
  value = module.cdn_s3_cloudfront.cloudfront_distribution_id
}

output "cdn_s3_bucket_id" {
  value = module.cdn_s3_cloudfront.s3_bucket_id
}

output "cdn_subdomain_name" {
  value = local.cdn_domain
}
