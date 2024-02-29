# AWS Cloud Provisioning --------------------------------

module "aws_vpc" {
  source = "./aws/vpc"
  name   = "gdscfptu"
}

module "aws_eks" {
  source          = "./aws/eks"
  cluster_name    = "gdscfptu"
  vpc_id          = module.aws_vpc.vpc_id
  subnet_ids      = module.aws_vpc.aws_subnet_ids
  access_key_pair = "gdscfptu-key-pair"
  instance_types  = ["t2.small"]
}
