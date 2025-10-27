resource "aws_iam_role" "terraform_actions" {
  name = "terraform-deploy-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect    = "Allow"
        Principal = { Federated = aws_iam_openid_connect_provider.github_actions.arn }
        Action    = "sts:AssumeRoleWithWebIdentity"
        Condition = {
          StringEquals = {
            "token.actions.githubusercontent.com:aud" = "sts.amazonaws.com"
          }
          StringLike = {
            "token.actions.githubusercontent.com:sub" = "repo:${var.github_repo}:*"
          }
        }
      }
    ]
  })
}

resource "aws_iam_role_policy_attachment" "terraform_actions_admin" {
  role       = aws_iam_role.terraform_actions.name
  policy_arn = "arn:aws:iam::aws:policy/AdministratorAccess"
}

output "terraform_deploy_role_arn" {
  description = "ARN of the IAM role assumed by GitHub Actions for Terraform deployment."
  value       = aws_iam_role.terraform_actions.arn
}
