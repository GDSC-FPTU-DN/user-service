variable "name" {
  description = "The names of the VPC items"
  type        = string
}

variable "vpc_cidr" {
  description = "The CIDR block for the VPC"
  type        = string
  default     = "10.0.0.0/16"
}

variable "instance_tenancy" {
  description = "The tenancy of the instance"
  type        = string
  default     = "default"
}

variable "subnet_cidrs" {
  description = "The CIDR block for the subnet"
  type        = list(string)
  default     = ["10.0.1.0/24", "10.0.2.0/24"]
}

variable "rt_cidr_block" {
  description = "The CIDR block for the route table"
  type        = string
  default     = "0.0.0.0/0"
}
