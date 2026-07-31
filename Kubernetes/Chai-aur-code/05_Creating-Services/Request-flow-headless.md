Headless Service samajnyasathi saglyat common use-case mhanje **StatefulSet with MySQL** gheu.

## Setup

Samja aplyakade StatefulSet ahe:

```text
mysql-0
mysql-1
mysql-2
```

Headless Service:

```yaml
apiVersion: v1
kind: Service
metadata:
  name: mysql
spec:
  clusterIP: None
```

Lakshat ghe:

```text
Normal Service:
   ClusterIP = 10.96.0.10

Headless Service:
   ClusterIP = None
```

---

## Normal Service Madhe

Client:

```text
mysql-service
```

lookup karto.

DNS response:

```text
10.96.0.10
```

mag kube-proxy load balancing karto:

```text
10.96.0.10
    |
    +--> mysql-0
    +--> mysql-1
    +--> mysql-2
```

Client la kontya Pod shi boltoy te mahit nast.

---

## Headless Service Madhe

Client:

```text
mysql
```

lookup karto.

DNS response:

```text
mysql-0.mysql.default.svc.cluster.local
mysql-1.mysql.default.svc.cluster.local
mysql-2.mysql.default.svc.cluster.local
```

kiva directly tyanche IPs.

Example:

```text
10.1.0.2
10.1.0.3
10.1.0.4
```

---

## Request Flow

Samja application la specifically Primary database shi bolaycha ahe.

Application la mahit ahe:

```text
Primary = mysql-0
```

Ti direct connect karte:

```text
mysql-0.mysql.default.svc.cluster.local
```

Flow:

```text
Application
      |
DNS Lookup
      |
Headless Service DNS records
      |
mysql-0 -> 10.1.0.2
      |
Request
      |
mysql-0 Pod
```

---

## Important Observation

Ya flow madhye:

```text
Application
   |
Pod IP
```

direct connection ahe.

He nahi hot:

```text
Application
   |
ClusterIP
   |
kube-proxy
   |
Pod
```

Karana:

```text
No ClusterIP
No Service Virtual IP
No Service-side load balancing
```

---

## Headless Service Cha Main Purpose

Client la he kalu dene:

```text
Kon-kon Pods ahet?
Tyanchi individual identity kay ahe?
```

Normal Service he information hide karte.

Headless Service he expose karte.

---

## Interview Madhe Sangaycha

> "In a Headless Service, Kubernetes does not allocate a ClusterIP. Instead, DNS returns the individual Pod IPs (or Pod hostnames). The client then connects directly to a specific Pod. This is commonly used with StatefulSets where each Pod has a unique identity and clients need direct access rather than load-balanced access."

### One-line Memory Trick

```text
Normal Service:
Client -> Service IP -> Pod

Headless Service:
Client -> Pod IP
```

Mhanun Headless Service cha khara role routing nahi, tar **DNS discovery of individual Pods** ahe. ✅
