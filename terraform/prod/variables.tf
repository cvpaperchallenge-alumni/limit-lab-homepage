variable "domain_name" {
  type        = string
  description = "The domain name to use for the website."
  default     = "limitlab.xyz"
}

# variable "dev_subdomain_name_servers" {
#   type        = list(string)
#   description = "Name server records for the delegated dev subdomain hosted zone."
# }

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

variable "github_repo" {
  type        = string
  description = "The name of the GitHub repository."
  default     = "cvpaperchallenge-alumni/limit-lab-homepage"
}