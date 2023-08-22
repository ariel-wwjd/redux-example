# variable "alias" {
  # type = string
# }

variable "deploy_bucket_id" {
  type = string
}

variable "deploy_bucket_website_endpoint" {
  type = string
}

resource "aws_cloudfront_origin_access_identity" "cloudfront_oia" {
  comment = "eiq30 origin access identity"
}

resource "aws_cloudfront_distribution" "eiq_cdn" {
  enabled = true

  # aliases = [var.alias]

  origin {
    origin_id   = "origin-bucket-${var.deploy_bucket_id}"
    domain_name = var.deploy_bucket_website_endpoint

    custom_origin_config {
      http_port              = "80"
      https_port             = "443"
      origin_protocol_policy = "http-only"
      origin_ssl_protocols   = ["TLSv1", "TLSv1.1", "TLSv1.2"]
    }
  }

  default_root_object = "index.html"

  default_cache_behavior {
    allowed_methods        = ["GET", "HEAD"]
    cached_methods         = ["GET", "HEAD"]
    default_ttl            = "300"
    max_ttl                = "1200"
    target_origin_id       = "origin-bucket-${var.deploy_bucket_id}"
    viewer_protocol_policy = "redirect-to-https"
    compress               = true

    forwarded_values {
      query_string = false
      cookies {
        forward = "none"
      }
    }
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  viewer_certificate {
    cloudfront_default_certificate = true
  }
}

output "cdn_id" {
  value = aws_cloudfront_distribution.eiq_cdn.id
}

output "cdn_endpoint" {
  value = aws_cloudfront_distribution.eiq_cdn.domain_name
}
