# Metrics Server and Autoscaling in Kubernetes

## Table of Contents
- [Overview](#overview)
- [Requests and Limits](#requests-and-limits)
- [Metrics Server](#metrics-server)
- [Autoscaling](#autoscaling)

---
## Overview


---
## Requests and Limits


---
## Metrics Server


---
## Autoscaling
Perfect 😄 now you’re entering the fun part — **autoscaling**.

Since you’ve installed Metrics Server on **kind**, you can now test **Horizontal Pod Autoscaling (HPA)** in **Kubernetes**.

Below is a clean, practical POC you can run step-by-step.

---

### 🎯 Goal of This POC

We will:

1. Deploy an app
2. Set CPU requests (important!)
3. Create an HPA
4. Generate load
5. Watch Pods scale automatically

---

### 🧠 Important Concept Before We Start

HPA works based on:

```
Current CPU usage / Requested CPU
```

So:

⚠️ If you don’t define CPU requests → autoscaling won’t work properly.

---

### 🚀 Step 1 — Deploy a Test Application

We’ll use a simple nginx deployment.

Create `nginx-deployment.yaml`:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx-deployment
spec:
  replicas: 1
  selector:
    matchLabels:
      app: nginx
  template:
    metadata:
      labels:
        app: nginx
    spec:
      containers:
      - name: nginx
        image: nginx
        resources:
          requests:
            cpu: "100m"
          limits:
            cpu: "200m"
        ports:
        - containerPort: 80
```

Apply it:

```bash
kubectl apply -f nginx-deployment.yaml
```

Check:

```bash
kubectl get pods
```

---

### 🚀 Step 2 — Expose It

```bash
kubectl expose deployment nginx-deployment --type=NodePort --port=80
```

---

### 🚀 Step 3 — Create HPA

Create HPA targeting 50% CPU utilization:

```bash
kubectl autoscale deployment nginx-deployment \
  --cpu-percent=50 \
  --min=1 \
  --max=5
```

Check HPA:

```bash
kubectl get hpa
```

You should see something like:

```
NAME                REFERENCE                   TARGETS   MINPODS   MAXPODS   REPLICAS
nginx-deployment   Deployment/nginx-deployment   0%/50%     1         5         1
```

---

### 🚀 Step 4 — Generate Load

Now we need CPU load.

Run a temporary busybox pod:

```bash
kubectl run -it --rm load-generator --image=busybox -- /bin/sh
```

Inside the shell:

```bash
while true; do wget -q -O- http://nginx-deployment; done
```

This continuously hits nginx.

---

### 🚀 Step 5 — Watch Autoscaling

In another terminal:

```bash
kubectl get hpa -w
```

Also:

```bash
kubectl get pods -w
```

After 30–60 seconds, you should see:

* CPU usage increase
* Replicas increase (e.g., from 1 → 2 → 3)

🎉 That’s autoscaling in action.

---

### 🔍 What’s Happening Internally?

1. Metrics Server collects CPU usage

2. HPA controller compares:

   ```
   current CPU usage vs requested CPU
   ```

3. If > 50% → increase replicas

4. If < 50% → decrease replicas

---

### 🧠 Formula Kubernetes Uses

Roughly:

```
desiredReplicas = currentReplicas × ( currentCPU / targetCPU )
```

Example:

```
1 pod
CPU usage = 80%
Target = 50%

1 × (80 / 50) = 1.6 → 2 replicas
```

---

### 🧪 How to Verify Metrics

```bash
kubectl top pods
```

If CPU shows non-zero values → Metrics Server is working correctly.

---

### 🛑 Stop Load

Exit busybox shell:

```
Ctrl + C
exit
```

After a few minutes, pods should scale back down to 1.

---

### 📦 Optional: Use stress Instead of wget

If you want more aggressive scaling:

```bash
kubectl run stress --image=polinux/stress -- \
  stress --cpu 1 --timeout 120s
```

---

### 🎓 What You Just Learned

You tested:

* Deployment with resource requests
* Metrics Server integration
* Horizontal Pod Autoscaler
* Dynamic scaling behavior

---

If you'd like next, we can:

* Try memory-based autoscaling
* Simulate scale down behavior deeply
* Do autoscaling with custom metrics
* Understand how HPA differs from VPA

Just tell me what direction you want to explore 🚀

