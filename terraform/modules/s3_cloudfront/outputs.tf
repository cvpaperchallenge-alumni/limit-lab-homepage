output "s3_bucket_id" {
  description = "A name of the S3 bucket."
  value       = aws_s3_bucket.cloudfront_origin.id
}
output "s3_bucket_regional_domain_name" {
  description = "A region-specific domain name of the S3 bucket."
  value       = aws_s3_bucket.cloudfront_origin.bucket_regional_domain_name
}
output "cloudfront_domain_name" {
  description = "A domain name of the CloudFront distribution."
  value       = aws_cloudfront_distribution.s3_distribution.domain_name
}
output "cloudfront_aliases" {
  description = "A list of aliases of the CloudFront distribution. e.g. ['dev.limitlab.xyz']"
  value       = aws_cloudfront_distribution.s3_distribution.aliases
}
output "cloudfront_arn" {
  description = "An ARN of the CloudFront distribution resource."
  value       = aws_cloudfront_distribution.s3_distribution.arn
}
output "cloudfront_hosted_zone_id" {
  description = "A hosted zone ID of the CloudFront distribution resource."
  value       = aws_cloudfront_distribution.s3_distribution.hosted_zone_id
}
output "cloudfront_distribution_id" {
  description = "The identifier of the CloudFront distribution."
  value       = aws_cloudfront_distribution.s3_distribution.id
}
