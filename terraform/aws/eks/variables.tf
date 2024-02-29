variable "cluster_name" {
  description = "The name of the EKS cluster"
  type        = string
}

variable "access_key_pair" {
  description = "The access key pair"
  type        = string
}

variable "instance_types" {
  description = "The instance types"
  type        = list(string)
  default     = ["t2.micro"]
}

variable "vpc_id" {
  description = "The VPC ID"
}

variable "subnet_ids" {
  description = "The Subnet IDs"
  type        = list(string)
}

variable "public_access_cidr" {
  description = "The CIDR block for the public subnet"
  type        = list(string)
  default     = ["0.0.0.0/0"]
}

variable "size" {
  description = "The size of the node group"
  type        = number
  default     = 1
}

variable "max_size" {
  description = "The maximum size of the node group"
  type        = number
  default     = 1
}
