Ha Kubernetes interview madhla khup common question ahe.

## Short Answer

**LoadBalancer Service** ani **Ingress** donhi external traffic cluster madhye aananyasathi use hotat, pan tyanchi scope vegli ahe.

* **LoadBalancer Service** → Eka Service la externally expose karto.
* **Ingress** → Multiple Services sathi central entry point provide karto ani routing rules apply karto.

---

## LoadBalancer Service

Example:

```text id="1"
Internet
   |
Cloud Load Balancer
   |
web-service
   |
Pods
```

YAML:

```yaml id="2"
kind: Service
spec:
  type: LoadBalancer
```

Cloud provider (AWS/GCP/Azure) external load balancer create karto.

User access karto:

```text id="3"
http://35.x.x.x
```

---

### Problem

Samja tujhya kade 3 applications ahet:

```text id="4"
web-service
api-service
admin-service
```

Jar pratyek service sathi:

```yaml id="5"
type: LoadBalancer
```

vaparalas tar:

```text id="6"
Load Balancer #1
Load Balancer #2
Load Balancer #3
```

Create hotil.

He costly hou shakto.

---

## Ingress

Ingress ek smart router sarkha ahe.

Architecture:

```text id="7"
Internet
    |
Ingress Controller
    |
+-----------+-----------+
|           |           |
web      api       admin
```

Rules:

```text id="8"
example.com        -> web-service

example.com/api    -> api-service

example.com/admin  -> admin-service
```

---

## Real Example

User requests:

```text id="9"
example.com
```

Route:

```text id="10"
Ingress
   |
web-service
```

---

User requests:

```text id="11"
example.com/api
```

Route:

```text id="12"
Ingress
   |
api-service
```

---

User requests:

```text id="13"
example.com/admin
```

Route:

```text id="14"
Ingress
   |
admin-service
```

---

## Request Flow Comparison

### LoadBalancer

```text id="15"
Internet
   |
External Load Balancer
   |
Service
   |
Pods
```

---

### Ingress

```text id="16"
Internet
   |
Ingress Controller
   |
Routing Rules
   |
Services
   |
Pods
```

---

## Important Point

Ingress swatah kahi program nahi.

Ingress ha Kubernetes object ahe.

Actual routing kon karto?

👉 Ingress Controller

Popular examples:

* NGINX Ingress Controller
* Traefik
* HAProxy Ingress

---

## Feature Comparison

| Feature                                  | LoadBalancer | Ingress |
| ---------------------------------------- | ------------ | ------- |
| External Access                          | ✅            | ✅       |
| Path Routing                             | ❌            | ✅       |
| Host Routing                             | ❌            | ✅       |
| TLS Termination                          | Limited      | ✅       |
| One IP for Many Apps                     | ❌            | ✅       |
| Multiple Services Behind One Entry Point | ❌            | ✅       |

---

## Interview Answer

> "A LoadBalancer Service exposes a single Kubernetes Service externally by provisioning a cloud load balancer. An Ingress provides HTTP/HTTPS routing for multiple Services through a single entry point. Ingress supports host-based and path-based routing, TLS termination, and allows multiple applications to share one external IP, whereas a LoadBalancer Service typically exposes only one Service."

### Memory Trick

```text id="17"
LoadBalancer
    =
One external entry
for one Service

Ingress
    =
One external entry
for many Services
with routing rules
```

He answer dila ki interviewer la immediately kalta ki tula Ingress vs LoadBalancer cha practical farak samajla ahe. ✅
