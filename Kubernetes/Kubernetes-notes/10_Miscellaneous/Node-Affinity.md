Bhai, **Node Affinity** mhanje scheduler la sangne:

> **"Mala he Pod specific characteristics aslelya nodes varach (kiva preferably tithach) run karaycha ahe."**

He **node labels** var based asta.

---

# Problem Kay Solve Karto?

Samja cluster madhye 3 nodes ahet:

```text id="1"
Node-1
disk=ssd

Node-2
disk=hdd

Node-3
disk=ssd
```

Pod:

```text id="2"
database-pod
```

Tula SSD nodes varach run karaycha ahe.

Tyasathi Node Affinity.

---

# Step 1: Node Label

Node la label lavto:

```bash id="3"
kubectl label node node-1 disk=ssd
kubectl label node node-2 disk=hdd
kubectl label node node-3 disk=ssd
```

---

# Step 2: Pod Affinity Rule

```yaml id="4"
affinity:
  nodeAffinity:
    requiredDuringSchedulingIgnoredDuringExecution:
      nodeSelectorTerms:
      - matchExpressions:
        - key: disk
          operator: In
          values:
          - ssd
```

Meaning:

```text id="5"
Schedule only on nodes
where disk=ssd
```

---

# Scheduler Flow

Scheduler baghto:

```text id="6"
Node-1 -> disk=ssd ✅

Node-2 -> disk=hdd ❌

Node-3 -> disk=ssd ✅
```

Mag Node-1 kiva Node-3 select karel.

---

# Types of Node Affinity

## 1. Required

Hard rule.

```text id="7"
Must match
```

Example:

```yaml id="8"
requiredDuringSchedulingIgnoredDuringExecution
```

---

Jar matching node nasel:

```text id="9"
Pod = Pending
```

---

Example:

```text id="10"
Need disk=ssd

Available:
disk=hdd only
```

Result:

```text id="11"
Pod Pending
```

---

## 2. Preferred

Soft rule.

```yaml id="12"
preferredDuringSchedulingIgnoredDuringExecution
```

Meaning:

```text id="13"
Try SSD first

Otherwise anywhere
```

---

Example:

```text id="14"
Node-1 disk=ssd

Node-2 disk=hdd
```

Scheduler SSD prefer karel.

Pan SSD unavailable asel tar HDD var pan schedule hou shakto.

---

# Node Selector vs Node Affinity

Node Selector:

```yaml id="15"
nodeSelector:
  disk: ssd
```

Simple.

---

Node Affinity:

```yaml id="16"
nodeAffinity:
```

More expressive.

Supports:

```text id="17"
In
NotIn
Exists
DoesNotExist
Gt
Lt
```

---

# Node Affinity vs Taints/Tolerations

He interview madhye khup vichartat.

### Node Affinity

Pod mhanato:

```text id="18"
Mala SSD node pahije.
```

---

### Taints

Node mhanato:

```text id="19"
Mala random Pods nako.
```

---

### Direction

```text id="20"
Node Affinity
Pod -> Node
(Attraction)

Taints
Node -> Pod
(Repulsion)
```

---

# Real Example

GPU nodes:

```text id="21"
Node-1
gpu=true

Node-2
gpu=false
```

ML workload:

```yaml id="22"
affinity:
  nodeAffinity:
```

Rule:

```text id="23"
gpu=true
```

Result:

```text id="24"
ML Pods only on GPU nodes
```

---

# Interview Answer

> "Node Affinity is a scheduling mechanism that allows Pods to be placed on nodes based on node labels. It enables administrators to define rules or preferences about which nodes a Pod can run on. Required affinity acts as a hard constraint, while preferred affinity acts as a soft preference."

---

## One-Line Interview Version

> **"Node Affinity allows Pods to be scheduled on specific nodes based on node labels."**

---

## Interview Cheat Sheet

```text id="25"
Node Selector
   =
Simple node matching

Node Affinity
   =
Advanced node matching

Taints
   =
Keep Pods away

Tolerations
   =
Exception to taints
```

### Ek mast interview line

> **"Node Affinity attracts Pods toward suitable nodes, whereas Taints repel Pods from unsuitable nodes."** ✅

Hi line interviewers na khup avadte karan ti conceptually correct ahe.
