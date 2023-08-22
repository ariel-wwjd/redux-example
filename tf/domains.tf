terraform {
  backend "s3" {
    bucket = "domains.tf.eiq30.edgeiq.io"
    key    = "eiq30/terraform.tfstate"
    region = "us-east-1"
    # dynamodb_table = "domains.tf.eiq30.edgeiq.io"
    # encrypt        = true
  }
}


provider "aws" {
  region = "us-east-1"
}


resource "aws_route53_zone" "prod" {
  name = "deviceops.edgeiq.io"

  tags = {
    Environment = "prod"
  }
}

resource "aws_route53_zone" "uat" {
  name = "uat.deviceops.edgeiq.io"

  tags = {
    Environment = "uat"
  }
}

resource "aws_route53_zone" "stage" {
  name = "stage.deviceops.edgeiq.io"

  tags = {
    Environment = "stage"
  }
}

# resource "aws_route53_record" "uat-ns" {
#   zone_id = aws_route53_zone.prod.zone_id
#   name    = "uat.deviceops.edgeiq.io"
#   type    = "NS"
#   ttl     = "30"
#   records = aws_route53_zone.uat.name_servers
# }

# resource "aws_route53_record" "stage-ns" {
#   zone_id = aws_route53_zone.prod.zone_id
#   name    = "stage.deviceops.edgeiq.io"
#   type    = "NS"
#   ttl     = "30"
#   records = aws_route53_zone.stage.name_servers
# }
