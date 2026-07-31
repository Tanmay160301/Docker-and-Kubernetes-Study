Ho. Chala ek **khup common microservices example** gheu.

Samja aplyakade:

```text
Frontend Pod
    |
    v
user-service (ClusterIP Service)
    |
    +--> user-pod-1
    +--> user-pod-2
    +--> user-pod-3
```

Service details:

```text
Service Name: user-service
ClusterIP: 10.96.0.10
```

Pods:

```text
user-pod-1 = 10.1.0.2
user-pod-2 = 10.1.0.3
user-pod-3 = 10.1.0.4
```

---

# Step 1: Frontend Request Pathavto

Frontend code:

```javascript
fetch("http://user-service/api/users")
```

Frontend la Pod IPs mahit nahit.

Tyala fakta:

```text
user-service
```

mahit ahe.

---

# Step 2: DNS Resolution

Frontend Pod DNS la vicharto:

```text
user-service kuthe ahe?
```

DNS response:

```text
user-service
      |
      v
10.96.0.10
```

(He Service cha ClusterIP ahe.)

---

# Step 3: Packet Create Hoto

Frontend packet tayar karto:

```text
Source:
10.1.0.20

Destination:
10.96.0.10
```

Ithe paryant frontend la vatat ahe ki to 10.96.0.10 shi boltoy.

---

# Step 4: kube-proxy Rule Match Hoto

Node var kube-proxy ne already rule create keleli ahe:

```text
IF destination = 10.96.0.10

THEN choose one backend:

10.1.0.2
10.1.0.3
10.1.0.4
```

Samja ya veles:

```text
10.1.0.3
```

select zala.

---

# Step 5: Packet Rewrite Hoto

Original:

```text
Destination:
10.96.0.10
```

Rewrite:

```text
Destination:
10.1.0.3
```

Ata packet directly:

```text
user-pod-2
```

kade jato.

---

# Step 6: Pod Response Deto

```text
user-pod-2
     |
JSON Response
     |
Frontend Pod
```

---

# Logical View (Interview Level)

Lok sahasa asa draw kartat:

```text
Frontend
    |
user-service
    |
user-pod-2
```

He conceptual view ahe.

---

# Actual Networking View

Kubernetes internally:

```text
Frontend
    |
10.96.0.10
    |
kube-proxy rules
    |
10.1.0.3
    |
user-pod-2
```

---

# Important Insight

Jevha tu mhanatos:

> "Request Service madhun geli"

Te **logical/conceptual view** ahe.

Pan packet level var:

> Request ClusterIP la address keli jate, ani kube-proxy ti backend Pod IP kade rewrite karto.

Mhanun technically:

```text
Service = Stable Virtual Endpoint

kube-proxy = Actual Routing & Load Balancing
```

---

### Interview Answer

> "In a ClusterIP Service, a client Pod sends traffic to the Service's ClusterIP. kube-proxy on the node intercepts traffic destined for that ClusterIP and selects one of the backend Pod endpoints. The packet is then rewritten and forwarded to the selected Pod. From the client's perspective it communicates with the Service, while internally kube-proxy routes the traffic to a backend Pod."

He answer dila ki interviewer la kalel ki tula Service abstraction ani actual packet flow donhi samajle ahet. ✅
