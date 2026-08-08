Bhai, **Liveness Probe ani Readiness Probe** he Kubernetes madhye application health check karayla vapartat, pan donhi cha purpose vegla ahe.

---

# Ek Simple Scenario

Samja Pod madhye application run hot ahe.

```text id="1"
Pod
 |
 Application
```

Application:

* Start hou shakto
* Hang hou shakto
* Requests serve karu shakto kiva nahi

Kubernetes la he kasa kalnar?

👉 Probes

---

# 1. Liveness Probe

Question:

> **"Application ajun jivant (alive) ahe ka?"**

---

## Example

Application deadlock madhye geli.

```text id="2"
Process chalu ahe

Pan application respond kart nahi
```

Container:

```text id="3"
Running
```

disel.

Pan actual application hang zali ahe.

---

Liveness probe fail zala ki:

```text id="4"
Kubelet
   |
Restart Container
```

---

### Example

```yaml id="5"
livenessProbe:
  httpGet:
    path: /health
    port: 8080
```

Kubelet periodically call karto:

```text id="6"
http://pod-ip:8080/health
```

Response:

```text id="7"
200 OK
```

→ Healthy

Response nahi:

```text id="8"
Timeout
```

→ Restart

---

## Interview Definition

> **Liveness Probe determines whether the application is still running correctly. If the probe repeatedly fails, Kubernetes restarts the container.**

---

# 2. Readiness Probe

Question:

> **"Application requests handle karayla ready ahe ka?"**

---

## Example

Application startup la:

```text id="9"
30 seconds
```

ghete.

Container start zala:

```text id="10"
Running
```

Pan app ajun database connection establish kart ahe.

---

Jar traffic lagech pathavla tar:

```text id="11"
500 Error
```

yeil.

---

Readiness probe sangte:

```text id="12"
Ajun ready nahi
```

Mhanun Service traffic pathvat nahi.

---

Application ready zali:

```text id="13"
Ready
```

Mag Service madhye add keli jate.

---

## Example

```yaml id="14"
readinessProbe:
  httpGet:
    path: /ready
    port: 8080
```

---

### Flow

Application startup:

```text id="15"
Readiness = Fail
```

Result:

```text id="16"
Service
   |
Pod ❌
```

Traffic nahi.

---

Application ready:

```text id="17"
Readiness = Success
```

Result:

```text id="18"
Service
   |
Pod ✅
```

Traffic suru.

---

## Most Important Difference

### Liveness Fail

```text id="19"
Container Restart
```

---

### Readiness Fail

```text id="20"
Container Restart Nahi
```

Fakta:

```text id="21"
Service traffic stop
```

---

## Real Example

```text id="22"
Backend App
     |
Database
```

Database temporarily down.

Application:

```text id="23"
Alive ✅

Ready ❌
```

---

Readiness fail:

```text id="24"
Traffic stop
```

---

Liveness fail:

```text id="25"
Restart container
```

---

# Interview Table

| Feature           | Liveness Probe    | Readiness Probe                      |
| ----------------- | ----------------- | ------------------------------------ |
| Purpose           | Alive ahe ka?     | Traffic handle karayla ready ahe ka? |
| Failure Action    | Restart Container | Remove from Service endpoints        |
| Affects Traffic   | Indirectly        | Directly                             |
| Container Restart | Yes               | No                                   |

---

# Request Flow

### Readiness

```text id="26"
Client
   |
Service
   |
Ready Pods Only
```

---

### Liveness

```text id="27"
Kubelet
   |
Health Check
   |
Restart if failed
```

---

## Interview Answer

> "A Liveness Probe checks whether an application is still running correctly. If it fails repeatedly, Kubernetes restarts the container. A Readiness Probe checks whether the application is ready to serve requests. If it fails, Kubernetes removes the Pod from the Service endpoints so it stops receiving traffic, but the container is not restarted."

---

### One-Line Interview Version

> **"Liveness determines whether a container should be restarted, while Readiness determines whether a Pod should receive traffic."**

### Memory Trick

```text id="28"
Liveness
   =
Should I restart?

Readiness
   =
Should I send traffic?
```

He answer dila ki interviewer la lagech kalta ki tula kubelet, service endpoints, traffic flow, ani health checks sagla samajla ahe. ✅
