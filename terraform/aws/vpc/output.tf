output "vpc_id" {
  value = aws_vpc.vpc.id
}

output "aws_subnet_ids" {
  value = aws_subnet.subnet[*].id
}
