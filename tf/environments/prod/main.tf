terraform {
  backend "s3" {
    bucket = "prod.tf.eiq30.edgeiq.io"
    key    = "eiq30/terraform.tfstate"
    region = "us-east-1"
    # dynamodb_table = "prod.tf.eiq30.edgeiq.io"
    # encrypt        = true
  }
}


provider "aws" {
  region = "us-east-1"
}


module "s3_prod" {
  source = "../../modules/s3"
  deploy_bucket_name = "prod.eiq30.edgeiq.io"
}

module "cloudfront_prod" {
  source = "../../modules/cloudfront"

  deploy_bucket_id = module.s3_prod.deploy_bucket_id
  deploy_bucket_website_endpoint = module.s3_prod.deploy_bucket_website_endpoint
}

output "prod_cdn_id" {
  value = module.cloudfront_prod.cdn_id
}

output "prod_cdn_endpoint" {
  value = module.cloudfront_prod.cdn_endpoint
}
