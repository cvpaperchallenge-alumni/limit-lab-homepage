terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "5.82.2"
    }
  }

  required_version = "= 1.10.3"
}

resource "aws_s3_bucket" "cloudfront_origin" {
  bucket        = var.bucket_name
  force_destroy = true
}

resource "aws_s3_bucket_cors_configuration" "cloudfront_origin" {
  bucket = aws_s3_bucket.cloudfront_origin.id

  cors_rule {
    allowed_headers = ["*"]
    allowed_methods = ["GET", "HEAD"]
    allowed_origins = ["*"]
    expose_headers  = ["ETag"]
    max_age_seconds = 3000
  }
}

resource "aws_cloudfront_origin_access_control" "cloudfront_origin" {
  name                              = var.origin_access_control_name
  origin_access_control_origin_type = "s3"
  signing_behavior                  = "always"
  signing_protocol                  = "sigv4"
}

resource "aws_s3_bucket_policy" "cloudfront_origin" {
  bucket = aws_s3_bucket.cloudfront_origin.id
  policy = templatefile("${path.module}/bucket_policy.json.tpl", {
    bucket_name    = aws_s3_bucket.cloudfront_origin.id
    cloudfront_arn = aws_cloudfront_distribution.s3_distribution.arn
  })
}

resource "aws_cloudfront_distribution" "s3_distribution" {

  enabled             = "true"
  http_version        = "http2"
  is_ipv6_enabled     = "true"
  price_class         = "PriceClass_All"
  retain_on_delete    = "false"
  default_root_object = "index.html"

  aliases = var.own_domain_names.aliases != null ? var.own_domain_names.aliases : []
  origin {
    domain_name              = aws_s3_bucket.cloudfront_origin.bucket_regional_domain_name
    origin_id                = aws_s3_bucket.cloudfront_origin.id
    origin_access_control_id = aws_cloudfront_origin_access_control.cloudfront_origin.id
    connection_attempts      = "3"
    connection_timeout       = "10"
  }

  viewer_certificate {
    # If custom domain name is not specified, use the default certificate.
    cloudfront_default_certificate = var.own_domain_names.acm_certificate_arn == null ? true : false

    # If custom domain name is specified, use the ACM certificate.
    acm_certificate_arn = var.own_domain_names.acm_certificate_arn == null ? null : var.own_domain_names.acm_certificate_arn

    ssl_support_method       = "sni-only"
    minimum_protocol_version = "TLSv1"
  }

  default_cache_behavior {
    allowed_methods        = ["GET", "HEAD"]
    cached_methods         = ["GET", "HEAD"]
    compress               = "true"
    default_ttl            = "60"
    max_ttl                = "60"
    min_ttl                = "60"
    smooth_streaming       = "false"
    target_origin_id       = aws_s3_bucket.cloudfront_origin.id
    viewer_protocol_policy = "redirect-to-https"

    forwarded_values {
      query_string = false

      cookies {
        forward = "none"
      }
    }
  }

  # Redirect to the root path when the page is not found.
  # custom_error_response {
  #   error_code            = 403
  #   response_page_path    = "/"
  #   response_code         = 200
  #   error_caching_min_ttl = 0
  # }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }
}
