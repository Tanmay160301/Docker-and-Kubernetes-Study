Creating cluster in kubernetes
```
kind create cluster --name <cluster-name>
kind get clusters
kind delete cluster --name <cluster-name>
kind create cluster --name <multi-node-cluster-name> --config <config-file-path>
```

Getting cluster information
```
kubectl cluster-info --context kind-my-first-cluster
```

Setting kubectl configuration for the cluster:
```
kubectl config use-context kind-<cluster-name>
kubectl config get-contexts
kubectl config current-context
```


Getting nodes of cluster
```
kubectl get nodes
```


pods commands
```
kubectl get pods
kubectl get pods -A        # all namespaces
kubectl get pods -o wide   # more details
kubectl get pods nginx-pod -o yaml
kubectl get pods -n <specific-namespaces>
kubectl get pods --show-labels
kubectl get pods -o wide
```

Namespaces
```
kubectl get namespaces
```


Deployments
```
kubectl get deployments
```


Replicasets
```
kubectl get rs
```

Services
```
kubectl get svc
```

Creating a deployment.yaml file and deploy the pods
```
kubectl run --image=nginx nginx-pod 
kubectl apply -f deployment.yaml
kubectl run --image=nginx nginx-pod --dry-run=client -o yaml
```

Deleting pods/deployments
```
kubectl delete pod my-pod
kubectl delete deployment my-app
kubectl delete -f app.yaml
kubectl delete pods --all
```

Commands for Debugging
```
kubectl describe pod my-pod
kubectl describe deployment my-app
kubectl logs my-pod
kubectl logs my-pod -c my-container #If a pod contains multiple container
kubectl exec -it my-pod -- /bin/bash # get inside a running pod
kubectl exec -it my-pod -- sh # for alpine images
```

Theoretical notes  
Kubernetes Architecture:
![Kubernetes Architecture](Kubernetes\Chai-aur-code\Images\K8-Architecture.jpg)

<img src="Kubernetes\Chai-aur-code\Images\K8-Architecture.jpg" width="600" height="350" alt="K8 Architecture Diagram"/>

Replicasets and Deployments: