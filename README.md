### How to deploy

To run this. You must have `terraform`, `aws` CLI, and `kubectl` in your computer.

- Init Terraform

```bash
terraform init
```

- Apply Infrastructure

```bash
terraform apply
```

- Connect to AWS EKS

```bash
aws eks update-kubeconfig --region ap-southeast-2 --name gdscfptu
```

- Deploy Kubernetes config

```bash
kubectl apply -f ./kubernetes/deployment.yaml
```
