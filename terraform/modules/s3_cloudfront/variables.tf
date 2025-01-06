variable "bucket_name" {
  type        = string
  description = "The name of the S3 bucket."
}

variable "origin_access_control_name" {
  type        = string
  description = "The name of the CloudFront origin access control."
}

variable "own_domain_names" {
  type = object({
    acm_certificate_arn = optional(string)
    aliases             = optional(list(string))
  })
  description = "The own domain names."
  default = {
    acm_certificate_arn = null
    aliases             = null
  }
}