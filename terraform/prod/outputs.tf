output "terraform_deploy_role_arn" {
  description = "ARN of the IAM role assumed by GitHub Actions for Terraform deployment."
  value       = aws_iam_role.terraform_actions.arn
}
