# TLS certificate data source to retrieve the thumbprint for GitHub Actions OIDC.
# ref: https://zenn.dev/nameless_gyoza/articles/github-actions-aws-oidc-by-terraform
data "tls_certificate" "github_actions" {
  url = "https://token.actions.githubusercontent.com/.well-known/openid-configuration"
}

# OIDC provider for GitHub Actions to access AWS resources.
resource "aws_iam_openid_connect_provider" "github_actions" {
  url             = "https://token.actions.githubusercontent.com"
  client_id_list  = ["sts.amazonaws.com"]
  thumbprint_list = [data.tls_certificate.github_actions.certificates[0].sha1_fingerprint]
}