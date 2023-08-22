variable "deploy_bucket_name" {
  type = string
}

resource "aws_s3_bucket" "deploy_bucket" {
  bucket = var.deploy_bucket_name
}

resource "aws_s3_bucket_acl" "deploy_bucket" {
  bucket = aws_s3_bucket.deploy_bucket.id

  acl    = "private"
}

resource "aws_s3_bucket_website_configuration" "deploy_bucket" {
  bucket = aws_s3_bucket.deploy_bucket.id

  index_document {
    suffix = "index.html"
  }

  error_document {
    key = "index.html"
  }
}

resource "aws_s3_bucket_policy" "deploy_bucket" {
  bucket = aws_s3_bucket.deploy_bucket.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Sid       = "PublicReadGetObject"
        Effect    = "Allow"
        Principal = "*"
        Action    = "s3:GetObject"
        Resource  = "${aws_s3_bucket.deploy_bucket.arn}/*"
      },
    ]
  })
}

output "deploy_bucket_id" {
  value = aws_s3_bucket.deploy_bucket.id
}

output "deploy_bucket_website_endpoint" {
  value = aws_s3_bucket.deploy_bucket.website_endpoint
}
