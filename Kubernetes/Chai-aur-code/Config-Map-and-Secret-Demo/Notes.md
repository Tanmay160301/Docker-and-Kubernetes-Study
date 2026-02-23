# Kubernetes ConfigMaps and Secrets

## Table of Contents
- [Overview](#overview)
- [Environment Variables](#environment-variables)
- [Config Maps](#configmaps)
- [Secrets](#secrets)

## Environment Variables:
Syntax:  

```yaml
    spec:
      containers:
      - name: express-app
        image: tanmaybhurke01/express-app:v3.0.0
        env:
          - name: app_name
            value: "kubernetes env variable,config map and secret demo"
          - name: next_var
```


---

## Overview
Both **ConfigMaps** and **Secrets** are Kubernetes objects used to inject configuration data into containers. They decouple configuration artifacts from image content to keep containerized applications portable.

- **ConfigMaps** – Store non‑confidential data in key‑value pairs.
- **Secrets** – Store sensitive data (e.g., passwords, tokens, SSH keys). Secrets are similar to ConfigMaps but are encoded (base64) and offer additional security features.

Both are namespace‑scoped resources.

---

## ConfigMaps

### What is a ConfigMap?
A ConfigMap is an API object that lets you store configuration data as key‑value pairs. Pods can consume ConfigMaps as:
- Environment variables
- Command‑line arguments
- Configuration files in a volume

### Creating a ConfigMap

#### 1. Imperative – using `kubectl create configmap`
```bash
# From literal values
kubectl create configmap app-config --from-literal=key1=value1 --from-literal=key2=value2

# From a file (the file content becomes the value)
kubectl create configmap app-config --from-file=app.properties

# From a directory (each file in the directory becomes a key with file content as value)
kubectl create configmap app-config --from-file=config-dir/

# From an environment file (key=value per line)
kubectl create configmap app-config --from-env-file=app.env
```

#### 2. Declarative – YAML manifest
```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: app-config
  namespace: default
data:
  key1: value1
  key2: value2
  app.properties: |
    property1=value1
    property2=value2
```
Apply with `kubectl apply -f configmap.yaml`.

### Using a ConfigMap in a Pod

#### As environment variables
```yaml
apiVersion: v1
kind: Pod
metadata:
  name: my-pod
spec:
  containers:
  - name: my-container
    image: busybox
    env:
    - name: KEY1          # name of the env var inside container
      valueFrom:
        configMapKeyRef:
          name: app-config   # name of the ConfigMap
          key: key1          # key in the ConfigMap
    - name: KEY2
      valueFrom:
        configMapKeyRef:
          name: app-config
          key: key2
```

#### As environment variables from all keys (using `envFrom`)
```yaml
envFrom:
- configMapRef:
    name: app-config   # all key‑value pairs become environment variables
```

#### As a volume mounted file
```yaml
volumes:
- name: config-volume
  configMap:
    name: app-config
containers:
- volumeMounts:
  - name: config-volume
    mountPath: /etc/config   # each key becomes a file in this directory
```

#### In command‑line arguments (using the env var technique)
```yaml
env:
- name: MESSAGE
  valueFrom:
    configMapKeyRef:
      name: app-config
      key: message
args: ["echo", "$(MESSAGE)"]
```

---

## Secrets

### What is a Secret?
A Secret is similar to a ConfigMap but designed for confidential data. Data is stored as **base64‑encoded** strings. Kubernetes can also encrypt Secrets at rest (if configured). Pods reference Secrets just like ConfigMaps.

### Secret Types
Common types:
- **`Opaque`** – generic secret (default).
- **`kubernetes.io/service-account-token`** – stores a service account token.
- **`kubernetes.io/dockercfg`** / **`kubernetes.io/dockerconfigjson`** – for private image registry credentials.
- **`kubernetes.io/basic-auth`** – for basic authentication.
- **`kubernetes.io/ssh-auth`** – for SSH credentials.
- **`kubernetes.io/tls`** – for TLS certificates and private keys.

### Creating a Secret

#### 1. Imperative – using `kubectl create secret`
```bash
# From literal values (values are automatically base64‑encoded)
kubectl create secret generic app-secret --from-literal=username=admin --from-literal=password='s3cure!'

# From files (file content becomes the value)
kubectl create secret generic app-secret --from-file=id_rsa

# From environment file
kubectl create secret generic app-secret --from-env-file=secret.env

# For Docker registry credentials
kubectl create secret docker-registry regcred --docker-server=myregistry.com --docker-username=user --docker-password=pass --docker-email=email

# For TLS secrets
kubectl create secret tls tls-secret --cert=path/to/tls.crt --key=path/to/tls.key
```

#### 2. Declarative – YAML manifest (with base64‑encoded values)
```yaml
apiVersion: v1
kind: Secret
metadata:
  name: app-secret
type: Opaque
data:
  username: YWRtaW4=           # base64 of "admin"
  password: czNjdXJlIQ==       # base64 of "s3cure!"
```
To encode a value:
```bash
echo -n "admin" | base64
```

You can also use `stringData` for unencoded values (Kubernetes will encode them when creating the Secret):
```yaml
stringData:
  username: admin
  password: s3cure!
```

Apply with `kubectl apply -f secret.yaml`.

### Using a Secret in a Pod

#### As environment variables
```yaml
env:
- name: USERNAME
  valueFrom:
    secretKeyRef:
      name: app-secret
      key: username
- name: PASSWORD
  valueFrom:
    secretKeyRef:
      name: app-secret
      key: password
```

#### As environment variables from all keys (using `envFrom`)
```yaml
envFrom:
- secretRef:
    name: app-secret
```

#### As a volume mounted file
```yaml
volumes:
- name: secret-volume
  secret:
    secretName: app-secret
containers:
- volumeMounts:
  - name: secret-volume
    mountPath: /etc/secrets
    readOnly: true
```
Each key becomes a file with the decoded content.

#### As an image pull secret (for private registries)
```yaml
spec:
  imagePullSecrets:
  - name: regcred
```

---

## Best Practices and Security

- **Never check raw Secrets into version control** – use tools like Helm, Sealed Secrets, or external KMS.
- **Use `stringData` in YAML** for readability when writing manifests (Kubernetes encodes automatically).
- **Restrict access** with RBAC – only allow necessary service accounts to read Secrets.
- **Enable encryption at rest** for Secrets in etcd.
- **Limit Secret size** – etcd has a ~1MB limit per object.
- **Consider using external secret stores** (e.g., HashiCorp Vault, AWS Secrets Manager) with CSI drivers for advanced needs.
- **Rotate Secrets regularly** and use separate Secrets for different environments.

---

## Useful Commands Summary

```bash
# ConfigMaps
kubectl get configmaps
kubectl describe configmap <name>
kubectl delete configmap <name>

# Secrets
kubectl get secrets
kubectl describe secret <name>
kubectl delete secret <name>

# View decoded secret value
kubectl get secret <name> -o jsonpath='{.data.password}' | base64 --decode
```

---

## Key Differences: ConfigMap vs Secret

| Feature                | ConfigMap                       | Secret                          |
|------------------------|----------------------------------|---------------------------------|
| Data encoding          | Plain text                      | base64 (and optional encryption)|
| Primary use            | Non‑confidential config          | Sensitive data (credentials, keys)|
| Size limit             | 1MB (etcd limit)                 | 1MB                             |
| Default visibility     | Readable by anyone with API access| RBAC recommended; base64 is not encryption|
| Special types          | No                               | Yes (e.g., docker-registry, TLS)|
| `envFrom`/volume       | Supported                        | Supported                       |

---

These notes should give you a solid foundation for working with ConfigMaps and Secrets in Kubernetes. For production use, always follow security best practices.
These notes should give you a solid foundation for working with ConfigMaps and Secrets in Kubernetes. For production use, always follow security best practices.
