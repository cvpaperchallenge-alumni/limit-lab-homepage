variable "domain_name" {
  type        = string
  description = "The domain name to use for the website."
  default     = "limitlab.xyz"
}

variable "environment" {
  type        = string
  description = "The name of the environment."
  default     = "prod"

  validation {
    condition     = contains(["dev", "staging", "prod"], var.environment)
    error_message = "The environment must be one of: dev, staging, prod."
  }
}

variable "project_name" {
  type        = string
  description = "The name of the project."
  default     = "limitlab-webpage"
}


variable "github_username" {
  type        = string
  description = "The GitHub username."
  default     = "cvpaperchallenge"
}