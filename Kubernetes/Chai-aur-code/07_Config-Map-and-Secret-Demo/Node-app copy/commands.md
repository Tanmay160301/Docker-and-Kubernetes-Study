# Some useful commands for the project  
## Creating Configmaps  
```bash 

1. app-config  
kubectl create configmap app-config --from-literal=my_name=Tanmay --from-literal=my_age=24  

2. another-app-config  
kubectl create configmap another-app-config --from-file=app.env  

```

-----


## Create a Secrets  
```bash 
1. my-secret  
kubectl create secret generic my-secret --from-literal=MY_USERNAME=Tanmay --from-literal=MY_PASS=Tanmay123!  

2. bro_secret  
kubectl create secret generic bro-secret --from-env-file=secret.env
```

-----

## Creating a Docker Secret
```bash 
regcred  
kubectl create secret docker-registry regcred \
  --docker-username=tanmaybhurke01 \
  --docker-password=Hanuman@160301 \
  --docker-email=tanmaybhurke01@gmail.com

```
