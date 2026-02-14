## 1️⃣ High-Level Architecture

A Kubernetes cluster has two main parts:

Kubernetes Cluster  
│  
├── Control Plane (Master)  
│  
└── Worker Nodes (Minions)  


- **Control Plane** → Manages the cluster  
- **Worker Nodes** → Run your applications (containers)  

---

## 2️⃣ Control Plane Components

The Control Plane is the brain of Kubernetes.

---

### 🧠 1. API Server (kube-apiserver)

- The entry point to the cluster  
- All commands (`kubectl`, UI, automation tools) talk to the API Server  
- Validates and processes REST requests  
- Updates cluster state in etcd  

👉 Think of it as the **front door** of Kubernetes.

---

### 🗄 2. etcd

- A distributed key-value store  
- Stores:
  - Cluster state  
  - Configurations  
  - Secrets  
  - Pod definitions  
- Source of truth for the cluster  

⚠ If etcd is lost → cluster state is lost.

---

### 🎯 3. Scheduler (kube-scheduler)

- Decides which node should run a Pod  
- Looks at:
  - CPU / memory availability  
  - Affinity rules  
  - Taints & tolerations  
  - Resource requirements  

👉 It does **NOT** run Pods — it only chooses where they run.

---

### 🔁 4. Controller Manager

Runs multiple controllers like:

- Node Controller  
- Replication Controller  
- Deployment Controller  
- Endpoint Controller  
- Job Controller  

Controllers constantly:

- Compare **desired state** vs **actual state**  
- Take action to match them  

**Example:**

If you want 3 Pods but only 2 are running → Controller creates 1 more.

This is called the **reconciliation loop**.

## 3️⃣ Worker Node Components

Each worker node runs:



Worker Node  
│  
├── kubelet  
├── kube-proxy  
└── Container Runtime  


### 👷 1. kubelet

- Agent running on each node  
- Talks to API Server  
- Ensures containers are running as expected  
- Reports node & pod status  

👉 It’s like a supervisor on each machine.

---

### 🌐 2. kube-proxy

- Handles networking  
- Maintains iptables rules  
- Enables service discovery  
- Load balances traffic to Pods  

---

### 📦 3. Container Runtime

Responsible for running containers.

**Examples:**

- `containerd`  
- `CRI-O`  
- (Previously Docker)

---

## 4️⃣ How Everything Works Together (Pod Creation Flow)

Let’s say you run:

```bash
kubectl apply -f deployment.yaml

Step-by-step:

kubectl sends request → API Server

API Server validates & stores desired state in etcd

Controller sees new Deployment

Creates ReplicaSet

ReplicaSet creates Pods

Scheduler assigns Pod to a Node

kubelet on that node:

Pulls container image

Starts container via runtime

kube-proxy enables networking

Pod becomes Running

5️⃣ Kubernetes Objects (Core Concepts)

Architecture works around these key objects:

Pod → Smallest deployable unit

Deployment → Manages ReplicaSets

ReplicaSet → Ensures number of Pods

Service → Stable networking endpoint

ConfigMap / Secret → Configuration

Namespace → Logical separation

6️⃣ Control Loop Model (VERY Important Concept)

Kubernetes follows:

Declarative Desired State + Continuous Reconciliation

You don’t say:

“Start container A”

You say:

“I want 3 replicas of app A”

Kubernetes constantly ensures that state.

7️⃣ Networking Model (Simplified)

Kubernetes guarantees:

Every Pod gets a unique IP

Pods can talk to each other directly

Services provide stable access

No NAT between Pods

This is implemented via:

CNI plugins (Calico, Flannel, Cilium)

8️⃣ Visual Architecture Diagram (Text)

                    +----------------------+
                    |     Control Plane     |
                    |----------------------|
                    |  API Server          |
                    |  Scheduler           |
                    |  Controller Manager  |
                    |  etcd                |
                    +----------+-----------+
                               |
                               |
         ---------------------------------------------
         |                    |                     |
+--------+-------+   +--------+-------+    +--------+-------+
|   Worker Node  |   |   Worker Node  |    |   Worker Node  |
|----------------|   |----------------|    |----------------|
| kubelet        |   | kubelet        |    | kubelet        |
| kube-proxy     |   | kube-proxy     |    | kube-proxy     |
| containerd     |   | containerd     |    | containerd     |
| Pods           |   | Pods           |    | Pods           |
+----------------+   +----------------+    +----------------+