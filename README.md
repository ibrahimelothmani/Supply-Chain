# Supply-Chain (GitOps & Vault Secured)

## Project Overview

This project implements a complete supply chain management system with a modern three-tier architecture. It features a Spring Boot backend, a React frontend, and a PostgreSQL database.

The entire infrastructure has been modernized and is now managed entirely through **GitOps** principles using an enterprise-grade cloud-native DevOps stack, with **HashiCorp Vault** actively injecting secrets into the environment.

## Architecture

![Supply Chain DevOps Architecture](./docs/architecture.png)

## Core Technologies

### Local Development
- **Docker Compose**: For seamless local execution of the full stack.
- **Spring Boot 3 & React (Vite)**: The core application frameworks.
- **PostgreSQL 16**: Relational data persistence.

### Production Infrastructure, GitOps & Security
- **Azure Kubernetes Service (AKS)**: Container orchestration layer.
- **Terraform (IaC)**: Automated provisioning of Azure infrastructure (Resource Groups, VNets, AKS Clusters).
- **Ansible**: Configuration management for installing cluster interaction tools (`kubectl`, `helm`, `argo`).
- **Helm**: Parameterized and version-controlled Kubernetes manifests (`charts/supplychain/`).
- **GitHub Actions**: Continuous Integration (CI) pipeline to run tests, build images, push to GHCR. Using `yq` to update Helm `values.yaml` in the repo dynamically.
- **ArgoCD**: Continuous Deployment (CD). Watches Git repositories and syncs Helm Charts directly into the live cluster.
- **HashiCorp Vault**: Stores sensitive credentials (DB passwords, JWT secrets) and dynamically injects them into application Pod memory using the Vault Agent Sidecar Injector. No secrets are ever stored in Git or Kubernetes config maps.
- **Prometheus & Grafana**: Complete cluster and application-level observability stack deployed via Helm.
- **NGINX Ingress Controller**: For advanced request routing and load balancing within Kubernetes.

## Getting Started

### Prerequisites
- Docker & Docker Compose (for local development)
- Azure CLI (`az`), `kubectl`, and `terraform`
- Ansible (optional, to install the above CLI tools automatically)

### Local Development Loop
```bash
# Start the full stack locally
docker compose up -d

# Frontend will be available at http://localhost:80
# Backend API will be available at http://localhost:8080
```

## Infrastructure Setup

### 1. Provision Infrastructure
We use Terraform to physically create the cloud resources.
```bash
cd terraform/
terraform init
terraform plan
terraform apply
```

### 2. Connect to the Cluster
Once Terraform finishes, configure your local `kubectl` to talk to Azure:
```bash
az aks get-credentials --resource-group rg-supplychain-dev --name aks-supplychain-dev
```

## GitOps Workflow (How Deployments Work)

Deployments to production require exactly zero manual commands. Everything is triggered by a `git push` to the `master` branch.

1. **Continuous Integration (CI)**: GitHub Actions builds the `frontend` and `backend` Docker containers.
2. **Artifact Storage**: Images are pushed to GitHub Container Registry (`ghcr.io`).
3. **Helm Update**: GitHub Actions uses `yq` to automatically update `charts/supplychain/values.yaml` with the new Docker image hash and commits the file back to the repository.
4. **Continuous Deployment (CD)**: ArgoCD, running inside the AKS cluster, detects the new commit. It immediately pulls the new configuration and gracefully updates the live pods with zero downtime. 

## Kubernetes Directory Structure
- **`charts/supplychain/`**: The entire application (Postgres, Backend, Frontend, Ingress, Namespace) codified as a fully parameterized Helm Chart.
- **`k8s/argocd-apps/`**: The GitOps glue. `Application` manifests telling ArgoCD what folders and Helm charts to monitor. Contains apps for our supply chain software, Prometheus via Helm, and Vault via Helm.

## Security & Observability Architecture
- **Zero-Secret Git Repository**: Hardcoded secrets have been completely removed from all YAML definitions.
- **Vault Agent Injector**: Vault runs as a sidecar inside the backend pods, securely pulling the DB and JWT keys and writing them to `/vault/secrets/secrets.env` safely inside container RAM.
- **Rootless Containers**: All custom Docker builds use unprivileged, lightweight Alpine bases.
- **Full Observability**: The `kube-prometheus-stack` operates out-of-the-box, providing dashboard-driven insights into CPU, Memory, API latency, and database connection metrics.
