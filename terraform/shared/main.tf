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
