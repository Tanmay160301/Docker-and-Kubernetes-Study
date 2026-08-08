Bhai, **Requests ani Limits** he Kubernetes madhle saglyat important resource management concepts ahet.

Interview madhye khup vela vichartat.

---

# Simple Definition

### Request

> **Pod la minimum kiti CPU/Memory guarantee pahije?**

---

### Limit

> **Pod jastit jast kiti CPU/Memory vapru shakto?**

---

## Real Life Analogy

Samja hotel booking.

### Request

```text
Mala kamit kami
1 room pahije
```

Guaranteed.

---

### Limit

```text
Mi maximum
2 rooms vaparu shakto
```

Tyapeksha jast nahi.

---

# Kubernetes Example

```yaml
resources:
  requests:
    cpu: "500m"
    memory: "512Mi"

  limits:
    cpu: "1"
    memory: "1Gi"
```

Meaning:

```text
Minimum:
0.5 CPU
512 MB RAM

Maximum:
1 CPU
1 GB RAM
```

---

# Scheduler Request Kasa Vaparto?

Samja node:

```text
Node-1

CPU = 4

Memory = 8GB
```

---

Pod:

```yaml
requests:
  cpu: 2
  memory: 4Gi
```

Scheduler baghto:

```text
Node kade
2 CPU
4GB RAM
available ahe ka?
```

---

Asel tar:

```text
Schedule kara ✅
```

Nasel tar:

```text
Pod Pending ❌
```

---

## Important Point

Scheduler **requests** baghto.

Scheduler **limits** baghat nahi.

Ha interview madhla favorite point ahe.

---

# CPU Limit

Example:

```yaml
limits:
  cpu: "1"
```

Meaning:

```text
Maximum 1 CPU core
```

Container 2 CPU vapraycha prayatna karto.

Result:

```text
CPU throttling
```

CPU usage slow keli jate.

---

# Memory Limit

Example:

```yaml
limits:
  memory: "512Mi"
```

Container:

```text
700Mi RAM
```

vaparto.

Result:

```text
OOMKilled
```

Container terminate hoto.

---

## CPU vs Memory Difference

CPU limit cross:

```text
Throttle
```

---

Memory limit cross:

```text
Kill Container
```

---

# Real Example

Node:

```text
CPU = 8

RAM = 16GB
```

---

Pod-A

```yaml
requests:
  cpu: 2
  memory: 4Gi
```

---

Pod-B

```yaml
requests:
  cpu: 2
  memory: 4Gi
```

---

Scheduler calculation:

```text
Reserved CPU = 4

Reserved Memory = 8GB
```

---

Remaining:

```text
CPU = 4

RAM = 8GB
```

---

# Relation with QoS

### Guaranteed

```yaml
requests = limits
```

Example:

```yaml
requests:
  memory: 512Mi

limits:
  memory: 512Mi
```

---

### Burstable

```yaml
requests < limits
```

Example:

```yaml
requests:
  memory: 512Mi

limits:
  memory: 1Gi
```

---

### BestEffort

```yaml
No requests
No limits
```

---

# Common Interview Scenario

Interviewer:

> What happens if a Pod requests 4GB memory but actually uses only 1GB?

Answer:

> Scheduler still reserves 4GB worth of capacity for placement decisions because requests represent the guaranteed amount of resources the Pod may need.

---

# Another Favorite Question

Interviewer:

> Which component uses requests?

Answer:

> Scheduler.

---

Interviewer:

> Which component enforces limits?

Answer:

> The container runtime and Linux cgroups on the node.

---

# Architecture Flow

```text
Pod Spec
   |
Requests
   |
Scheduler
   |
Node Selected
```

---

```text
Pod Running
   |
Limits
   |
Linux cgroups
   |
Resource Enforcement
```

---

# Interview Answer

> "Requests define the minimum CPU and memory resources that a Pod requires and are used by the scheduler to place Pods on nodes. Limits define the maximum CPU and memory a container can consume. If CPU usage exceeds the limit, it is throttled, while exceeding a memory limit typically results in the container being OOMKilled."

---

## One-Line Interview Version

> **"Requests are used for scheduling and resource guarantees, while limits are used to cap resource consumption."**

### Memory Trick

```text
Request
   =
Reserve resources

Limit
   =
Maximum allowed usage
```

He sentence interview madhye sangitlas tar requests vs limits cha core concept cover hoto. ✅
