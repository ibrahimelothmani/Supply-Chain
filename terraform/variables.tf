variable "resource_group_name" {
  type        = string
  description = "The name of the resource group"
  default     = "rg-supplychain-dev"
}

variable "location" {
  type        = string
  description = "The Azure region where resources will be created"
  default     = "East US"
}

variable "cluster_name" {
  type        = string
  description = "The name of the AKS cluster"
  default     = "aks-supplychain-dev"
}

variable "node_count" {
  type        = number
  description = "The number of worker nodes"
  default     = 2
}
