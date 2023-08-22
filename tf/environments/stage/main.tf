terraform {
  backend "s3" {
    bucket = "stage.tf.eiq30.edgeiq.io"
    key    = "eiq30/terraform.tfstate"
    region = "us-east-1"
    # dynamodb_table = "stage.tf.eiq30.edgeiq.io"
    # encrypt        = true
  }
}


provider "aws" {
  region = "us-east-1"
}


module "s3_stage" {
  source = "../../modules/s3"
  deploy_bucket_name = "stage.eiq30.edgeiq.io"
}

module "cloudfront_stage" {
  source = "../../modules/cloudfront"

  deploy_bucket_id = module.s3_stage.deploy_bucket_id
  deploy_bucket_website_endpoint = module.s3_stage.deploy_bucket_website_endpoint
}

output "stage_cdn_id" {
  value = module.cloudfront_stage.cdn_id
}

output "stage_cdn_endpoint" {
  value = module.cloudfront_stage.cdn_endpoint
}
