Bhai, **NetworkPolicy mhanje Kubernetes madhla network firewall rule set.**

Tyacha main purpose:

> **Konta Pod kontya Pod shi communicate karu shakto ani konta nahi, he control karne.**

---

## Problem Kay Ahe?

Default Kubernetes behavior:

```text id="1"
Pod-A  ---> Pod-B ✅

Pod-C  ---> Pod-B ✅

Pod-D  ---> Pod-B ✅
```

Mhanje same cluster madhlya Pods madhye communication generally allowed asta.

Pan production madhye he secure nahi.

---

## Example

Samja tujhya application madhye:

```text id="2"
frontend-pod

backend-pod

db-pod
```

Requirement:

```text id="3"
frontend -> backend ✅

backend -> db ✅

frontend -> db ❌
```

---

## NetworkPolicy Solution

DB Pod la label deu:

```yaml id="4"
labels:
  app: database
```

Backend Pod:

```yaml id="5"
labels:
  app: backend
```

NetworkPolicy:

```yaml id="6"
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy

spec:
  podSelector:
    matchLabels:
      app: database

  ingress:
  - from:
    - podSelector:
        matchLabels:
          app: backend
```

---

## Meaning

Policy target karte:

```text id="7"
db-pods
```

Ani sangte:

```text id="8"
Fakta backend pods allowed
```

---

Result:

```text id="9"
backend -> db ✅
```

---

```text id="10"
frontend -> db ❌
```

---

## Request Flow

Without NetworkPolicy:

```text id="11"
Any Pod
    |
    v
DB Pod
```

Allowed.

---

With NetworkPolicy:

```text id="12"
Backend Pod
     |
     v
DB Pod
```

Allowed.

---

```text id="13"
Frontend Pod
     |
     v
DB Pod
```

Blocked.

---

# Ingress vs Egress

NetworkPolicy donhi direction control karu shakte.

---

## Ingress

Incoming traffic.

```text id="14"
Who can talk TO me?
```

Example:

```text id="15"
backend ---> db
```

Allowed.

---

## Egress

Outgoing traffic.

```text id="16"
Whom can I talk TO?
```

Example:

```text id="17"
app-pod
   |
Internet
```

Allow kiva block karu shakto.

---

## Real Use Cases

### Database Protection

```text id="18"
Only backend can access DB
```

---

### Namespace Isolation

```text id="19"
Dev namespace
```

cannot access

```text id="20"
Production namespace
```

---

### Internet Access Restriction

```text id="21"
Pods
   |
Internet ❌
```

---

## Important Interview Point

NetworkPolicy create keli mhanunach enforce honar nahi.

Cluster cha CNI plugin support pahije.

Examples:

* Calico
* Cilium

Jar CNI support kart nasel tar policy effect honar nahi.

---

## NetworkPolicy vs Service

Lok confuse hotat.

### Service

```text id="22"
Traffic kuthe pathvaycha?
```

(Service discovery + load balancing)

---

### NetworkPolicy

```text id="23"
Traffic allow karaycha ki block?
```

(Security)

---

## Interview Answer

> "A NetworkPolicy is a Kubernetes resource used to control network communication between Pods. It acts like a firewall by defining which Pods are allowed to send or receive traffic. NetworkPolicies can control both ingress and egress traffic and are commonly used to isolate workloads, protect databases, and enforce security boundaries within a cluster."

---

### One-Line Interview Version

> **"NetworkPolicy is Kubernetes' firewall mechanism that controls which Pods can communicate with each other and with external networks."**

### Memory Trick

```text id="24"
Service
   =
Where traffic goes

NetworkPolicy
   =
Whether traffic is allowed
```

He answer interview madhye dila ki interviewer la security side cha Kubernetes concept pan clear ahe asa watel. ✅
