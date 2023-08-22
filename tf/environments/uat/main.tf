terraform {
  backend "s3" {
    bucket = "uat.tf.eiq30.edgeiq.io"
    key    = "eiq30/terraform.tfstate"
    region = "us-east-1"
    # dynamodb_table = "uat.tf.eiq30.edgeiq.io"
    # encrypt        = true
  }
}


provider "aws" {
  region = "us-east-1"
}


module "s3_uat" {
  source = "../../modules/s3"
  deploy_bucket_name = "uat.eiq30.edgeiq.io"
}

module "cloudfront_uat" {
  source = "../../modules/cloudfront"

  deploy_bucket_id = module.s3_uat.deploy_bucket_id
  deploy_bucket_website_endpoint = module.s3_uat.deploy_bucket_website_endpoint
}

output "uat_cdn_id" {
  value = module.cloudfront_uat.cdn_id
}

output "uat_cdn_endpoint" {
  value = module.cloudfront_uat.cdn_endpoint
}
