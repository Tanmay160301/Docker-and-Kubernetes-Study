Bhai, **QoS (Quality of Service)** Kubernetes madhye Pod la resource pressure (especially memory pressure) alyavar konta Pod adhi evict karaycha he tharvayla use hoto.

Simple language madhe:

> **QoS class Kubernetes la sangte ki konta Pod kiti important ahe resource management chya drushtine.**

---

# Why QoS Exists?

Samja eka node var:

```text id="1"
Pod-A

Pod-B

Pod-C
```

Chalat ahet.

Achanak RAM kami padli:

```text id="2"
Node Memory Full
```

Ata Kubernetes la tharvava lagel:

```text id="3"
Konta Pod terminate/evict karaycha?
```

QoS tyat madat karte.

---

# QoS Classes

3 QoS classes ahet:

```text id="4"
Guaranteed

Burstable

BestEffort
```

---

# 1. Guaranteed (Highest Priority)

Pod madhlya saglya containers sathi:

```text id="5"
request = limit
```

asla pahije.

Example:

```yaml id="6"
resources:
  requests:
    memory: "512Mi"
    cpu: "1"

  limits:
    memory: "512Mi"
    cpu: "1"
```

---

Meaning:

```text id="7"
Need exactly:
1 CPU
512 MB RAM
```

---

Kubernetes mhanato:

```text id="8"
Ha predictable workload ahe.
```

---

Examples:

* Production databases
* Critical services

---

# 2. Burstable

Most common.

At least ek request kiva limit define keli ahe.

Pan:

```text id="9"
request != limit
```

---

Example:

```yaml id="10"
resources:
  requests:
    memory: 512Mi

  limits:
    memory: 1Gi
```

---

Meaning:

```text id="11"
Normally 512Mi pahije

Need asel tar 1Gi paryant jau shakto
```

---

Examples:

* Web applications
* APIs

---

# 3. BestEffort (Lowest Priority)

No requests.

No limits.

Example:

```yaml id="12"
containers:
- name: app
```

Bas.

Resource config nahi.

---

Meaning:

```text id="13"
Je milel te vaparto
```

---

Node pressure alyavar:

```text id="14"
BestEffort Pods
```

adhi baher kadle jatat.

---

# Eviction Order

Samja:

```text id="15"
Node Memory Full
```

Ahe.

QoS:

```text id="16"
Guaranteed Pod

Burstable Pod

BestEffort Pod
```

---

Kubernetes eviction order:

```text id="17"
BestEffort
      ↓
Burstable
      ↓
Guaranteed
```

---

Mhanje:

```text id="18"
Guaranteed
```

saglyat shevati affect hoto.

---

# Real Example

Node:

```text id="19"
Memory Pressure
```

Pods:

```text id="20"
DB Pod          Guaranteed

Backend Pod     Burstable

Test Pod        BestEffort
```

Kubernetes:

```text id="21"
Test Pod
```

adhi evict karel.

---

# How QoS Determine Hoto?

### Guaranteed

```text id="22"
All containers:

requests = limits
```

---

### Burstable

```text id="23"
At least one request/limit set
```

Pan equal nahi.

---

### BestEffort

```text id="24"
No requests

No limits
```

---

# Check QoS

Command:

```bash id="25"
kubectl describe pod my-pod
```

Output:

```text id="26"
QoS Class: Burstable
```

---

# Relation with OOMKilled

Samja Pod limit cross karto.

Example:

```yaml id="27"
limits:
  memory: 512Mi
```

Application:

```text id="28"
Consumes 700Mi
```

Result:

```text id="29"
OOMKilled
```

QoS ha mainly eviction decisions sathi use hoto, tar memory limit crossing mule OOMKilled hou shakto.

---

# Interview Answer

> "Quality of Service (QoS) in Kubernetes is a classification mechanism based on CPU and memory requests and limits. It helps Kubernetes decide which Pods should be evicted first when a node experiences resource pressure. The three QoS classes are Guaranteed, Burstable, and BestEffort, where Guaranteed Pods receive the highest protection and BestEffort Pods are the first candidates for eviction."

---

## One-Line Interview Version

> **"QoS determines how Kubernetes prioritizes Pods during resource contention based on their resource requests and limits."**

### Memory Trick

```text id="30"
Guaranteed
    =
Most Protected

Burstable
    =
Medium Protection

BestEffort
    =
Least Protected
```

Interview madhye jar follow-up ala:

> "How does Kubernetes decide a Pod's QoS class?"

Tar lagech answer:

> "Based on the CPU and memory requests and limits defined for the Pod's containers." ✅
