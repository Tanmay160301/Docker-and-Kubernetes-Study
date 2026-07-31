**Service ha program nahi.**

He sentence lakshat thev:

> **A Kubernetes Service is an API object (configuration) that represents a stable virtual endpoint and a set of backend Pods.**

---

### Service kay nahi?

Service:

❌ Process nahi

❌ Daemon nahi

❌ Container nahi

❌ Program nahi

❌ Packet forwarding software nahi

---

### Service kay ahe?

Service mhanje Kubernetes madhla ek object.

Udaharan:

```yaml id="wzhsh7"
apiVersion: v1
kind: Service
metadata:
  name: user-service

spec:
  selector:
    app: user-app

  ports:
  - port: 80
```

He basically Kubernetes la sangta:

```text id="2knjvn"
Mala user-service navacha endpoint pahije.

Backend Pods:
app=user-app
```

---

### Mag actual routing kon karto?

Service object create zalyavar:

```text id="hkjlwm"
API Server
    |
kube-proxy
```

kube-proxy Service object vachto ani rules banvto.

```text id="j6a6m6"
Service IP
10.96.0.10

      |
      +--> Pod-1
      +--> Pod-2
      +--> Pod-3
```

---

### Tula Service la physically baghaycha asel tar?

Service object madhye logical information aste:

```text id="bvx0fr"
Service Name:
user-service

ClusterIP:
10.96.0.10

Backend Pods:
10.1.0.2
10.1.0.3
10.1.0.4
```

Bas.

Service swatah traffic handle kart nahi.

---

### Interview Madhe Sangaycha

Jar interviewer vicharla:

> "Is a Service a process running somewhere in the cluster?"

Answer:

> "No. A Service is not a running process. It is a Kubernetes API object that defines a stable virtual IP/DNS name and a set of backend Pods. Components such as kube-proxy use this Service definition to program networking rules that route traffic to the Pods."

---

Mhanun tujha statement:

> **"Service is just a stable virtual IP with its associated backend Pods."**

He **almost correct** ahe.

Mi thoda refine karen:

> **"A Service is a Kubernetes API object that provides a stable virtual IP/DNS name and defines a set of backend Pods. The actual routing is implemented by kube-proxy or another networking component."**

He 100% interview-grade answer ahe. ✅
