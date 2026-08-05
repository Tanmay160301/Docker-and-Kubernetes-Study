Bhai, **Taints ani Tolerations** he Kubernetes madhye **Pod scheduling control karayla** vapartat.

Simple language madhe:

> **Taint = Node chi restriction**
>
> **Toleration = Pod chi permission to ignore that restriction**

---

## Problem Kay Solve Kartat?

Samja cluster madhye 3 nodes ahet:

```text id="1"
Node-1
Node-2
Node-3
```

Default behavior:

```text id="2"
Scheduler
   |
Pod
   |
Any Available Node
```

Pod kontyahi node var schedule hou shakto.

---

## Scenario

Samja Node-3 khup powerful ahe ani fakta database workloads sathi reserve karaycha ahe.

```text id="3"
Node-3
Purpose=Database
```

Tula nako ahe ki random application Pods tithe yeun basavet.

---

# Taint

Node var taint lavto:

```bash id="4"
kubectl taint nodes node-3 \
dedicated=database:NoSchedule
```

Ata Node-3 mhanato:

```text id="5"
Mi database workloads sathi reserve ahe.

Random Pods allowed nahi.
```

---

## Scheduler Behavior

Pod:

```text id="6"
app-pod
```

Schedule karaycha.

Scheduler baghto:

```text id="7"
Node-3
dedicated=database:NoSchedule
```

Pod kade toleration nahi.

Result:

```text id="8"
Node-3 ❌
```

Pod tithe schedule honar nahi.

---

# Toleration

Ata DB Pod create karto.

```yaml id="9"
tolerations:
- key: dedicated
  value: database
  effect: NoSchedule
```

Ata DB Pod mhanato:

```text id="10"
Mi ha taint tolerate karto.
```

---

Scheduler:

```text id="11"
Node-3
   |
Taint Match
   |
Toleration Match
   |
Allowed
```

DB Pod Node-3 var schedule hou shakto.

---

# Important Point

Khup lok he miss kartat.

Toleration mhanje:

```text id="12"
Permission
```

Ahe.

Toleration mhanje:

```text id="13"
Force Scheduling
```

Nahi.

---

Example:

Pod:

```yaml id="14"
tolerations:
...
```

Scheduler mhanato:

```text id="15"
Node-1
Node-2
Node-3
```

Toleration mule Node-3 available zala.

Pan scheduler Node-1 kiva Node-2 suddha choose karu shakto.

---

## Effects

### NoSchedule

```text id="16"
New Pods schedule hou deu naka.
```

Most common.

---

### PreferNoSchedule

```text id="17"
Possible asel tar avoid kara.
```

Soft restriction.

---

### NoExecute

```text id="18"
New Pods schedule hou deu naka

+
Existing Pods evict kara
```

---

# Real Example

Control Plane Node bagh.

Command:

```bash id="19"
kubectl describe node
```

Taint:

```text id="20"
node-role.kubernetes.io/control-plane:NoSchedule
```

Mhanje:

```text id="21"
Normal application pods
```

control plane node var schedule hou naye.

---

# Analogy

Node:

```text id="22"
VIP Room
```

Taint:

```text id="23"
Only Managers Allowed
```

Pod:

```text id="24"
Employee
```

Toleration nasel:

```text id="25"
Entry Denied
```

---

Pod:

```text id="26"
Manager
```

Toleration asel:

```text id="27"
Entry Allowed
```

---

# Interview Answer

> "Taints and Tolerations are used to control Pod scheduling on nodes. A taint is applied to a node to repel Pods, while a toleration is added to a Pod to allow it to be scheduled onto a tainted node. Taints are commonly used to dedicate nodes for specific workloads, isolate special hardware nodes such as GPU nodes, or prevent application Pods from running on control-plane nodes."

---

## One-Line Interview Version

> **"Taints are applied to nodes to restrict Pod scheduling, and tolerations are applied to Pods to allow them to run on tainted nodes."**

### Memory Trick

```text id="28"
Taint
  =
Keep Pods Away

Toleration
  =
Exception Permission
```

He concept clear zala ki pudhcha common interview question yeto:

> **"What is the difference between Node Selector, Node Affinity, and Taints/Tolerations?"**

Ani ha follow-up khup vela vichartat. ✅
