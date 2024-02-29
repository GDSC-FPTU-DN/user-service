terraform {
  required_providers {
    aws = {
      source = "hashicorp/aws"
    }
    kubernetes = {
      source = "hashicorp/kubernetes"
    }
  }
  cloud {
    organization = "GDSC-FPTU-DN"
    workspaces {
      name = "gdscfptu-user-service"
    }
  }
}

# Providers

provider "aws" {
  region = "ap-southeast-2"
}

data "aws_eks_cluster" "cluster" {
  name = module.aws_eks.cluster_id
}
data "aws_eks_cluster_auth" "cluster" {
  name = module.aws_eks.cluster_id
}
provider "kubernetes" {
  cluster_ca_certificate = base64decode(module.aws_eks.kubeconfig-certificate-authority-data)
  host                   = data.aws_eks_cluster.cluster.endpoint
  token                  = data.aws_eks_cluster_auth.cluster.token
}
