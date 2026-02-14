## 1️⃣ High-Level Architecture  

A Kubernetes cluster has two main parts:  

Kubernetes Cluster  
│  
├── Control Plane (Master)  
│  
└── Worker Nodes (Minions) 


Control Plane → Manages the cluster  
Worker Nodes → Run your applications (containers)  

## 2️⃣ Control Plane Components  
The Control Plane is the brain of Kubernetes.  
🧠 1. API Server (kube-apiserver)  
The entry point to the cluster  
All commands (kubectl, UI, automation tools) talk to the API server  
Validates and processes REST requests  

Updates cluster state in etcd  
👉 Think of it as the front door of Kubernetes.  

🗄 2. etcd  
A distributed key-value store  
Stores:  
Cluster state  
Configurations  
Secrets  
Pod definitions  
Source of truth for the cluster  
If etcd is lost → cluster state is lost.  

🎯 3. Scheduler (kube-scheduler)  
Decides which node should run a Pod  

Looks at:  
CPU/memory availability  
Affinity rules  
Taints & tolerations  
Resource requirements  
👉 It does NOT run pods — it just chooses where they run.  

🔁 4. Controller Manager  
Runs multiple controllers like:  
Node Controller  
Replication Controller  
Deployment Controller  
Endpoint Controller  
Job Controller  
Controllers constantly:  
Compare desired state vs actual state  
Take action to match them  
Example:  
If you want 3 pods but only 2 are running → controller creates 1 more.  
This is called the reconciliation loop.  