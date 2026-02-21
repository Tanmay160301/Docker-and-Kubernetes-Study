Deploying NGINX Ingress Controller in a Kind Cluster

Since you're using a Kind (Kubernetes in Docker) cluster, deploying an Ingress controller requires a slightly different setup compared to cloud environments.

Below is a clear step-by-step guide to deploy an NGINX Ingress Controller in a Kind cluster and make your ingress.yaml work properly.

We’ll use the official NGINX Ingress Controller for Kubernetes.

✅ Step 1: Create Kind Cluster with Extra Port Mapping

Kind runs inside Docker, so you must expose ports 80 and 443.

Create a file called:

kind-config.yaml
kind: Cluster
apiVersion: kind.x-k8s.io/v1alpha4
nodes:
- role: control-plane
  extraPortMappings:
  - containerPort: 80
    hostPort: 80
    protocol: TCP
  - containerPort: 443
    hostPort: 443
    protocol: TCP

Create the cluster:

kind create cluster --config kind-config.yaml

If you already created a cluster without port mapping, delete and recreate it:

kind delete cluster
kind create cluster --config kind-config.yaml
✅ Step 2: Install NGINX Ingress Controller

For Kind, use the official manifest for Kind environments:

kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/main/deploy/static/provider/kind/deploy.yaml
✅ Step 3: Wait for Ingress Controller to Be Ready

Check pods:

kubectl get pods -n ingress-nginx

Wait until you see:

ingress-nginx-controller-xxxxx   Running

Check the service:

kubectl get svc -n ingress-nginx

You should see something like:

ingress-nginx-controller   NodePort
✅ Step 4: Verify IngressClass

Run:

kubectl get ingressclass

You should see:

nginx

If not, your ingress.yaml must specify:

ingressClassName: nginx
✅ Step 5: Deploy Your Application and Service

Apply your deployment and service:

kubectl apply -f deployment.yaml
kubectl apply -f service.yaml

Verify service:

kubectl get svc
✅ Step 6: Apply Your Ingress Resource
kubectl apply -f ingress.yaml

Check:

kubectl get ingress

Example output:

NAME        CLASS   HOSTS         ADDRESS   PORTS
my-ingress  nginx   myapp.local            80
✅ Step 7: Update /etc/hosts (Important for Local Testing)

If your ingress uses a host like:

host: myapp.local

Add the following entry to your system:

Linux / Mac
sudo nano /etc/hosts

Add:

127.0.0.1 myapp.local
Windows

Edit:

C:\Windows\System32\drivers\etc\hosts

Add:

127.0.0.1 myapp.local
✅ Step 8: Test the Setup

Test using curl:

curl http://myapp.local

Or open in your browser:

http://myapp.local

It should route to your service successfully 🎉

🔍 If It Doesn’t Work — Debug Checklist

Check ingress details:

kubectl describe ingress <name>

Check controller logs:

kubectl logs -n ingress-nginx deploy/ingress-nginx-controller

Check endpoints:

kubectl get endpoints
📌 Example Minimal ingress.yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: my-ingress
spec:
  ingressClassName: nginx
  rules:
  - host: myapp.local
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: my-service
            port:
              number: 80
🚀 Summary Flow

Create Kind cluster with port mapping

Install NGINX Ingress Controller

Deploy app and service

Apply ingress.yaml

Update /etc/hosts

Access via browser