Bhai, **Secret** mhanje Kubernetes madhye sensitive information store karaycha object.

Examples:

```text
Passwords
Database Credentials
API Keys
OAuth Tokens
TLS Certificates
SSH Keys
```

Secret cha purpose:

> **Sensitive data Pod YAML madhye hardcode na karta securely manage karne.**

---

# Different Types of Secrets

Kubernetes madhye common secret types:

```text
1. Opaque
2. kubernetes.io/service-account-token
3. kubernetes.io/dockerconfigjson
4. kubernetes.io/basic-auth
5. kubernetes.io/ssh-auth
6. kubernetes.io/tls
```

---

# 1. Opaque Secret (Most Common)

Default secret type.

Example:

```yaml
apiVersion: v1
kind: Secret
type: Opaque
```

Store:

```text
DB Username
DB Password
API Keys
```

Example:

```text
username=admin
password=secret123
```

---

## Interview Point

> Opaque is the default and most commonly used secret type.

---

# 2. Service Account Token Secret

Type:

```text
kubernetes.io/service-account-token
```

Purpose:

```text
Pod -> API Server Authentication
```

Example:

```text
Pod
 |
Uses Service Account Token
 |
Calls Kubernetes API
```

Historically Kubernetes automatically create karaycha.

Aata mostly projected tokens use kele jatat.

---

# 3. Docker Registry Secret

Type:

```text
kubernetes.io/dockerconfigjson
```

Purpose:

Private container registry madhun image pull karne.

Example:

```text
Docker Hub Private Repo
GitHub Container Registry
Harbor
```

Pod:

```yaml
imagePullSecrets:
- name: my-registry-secret
```

---

# 4. Basic Auth Secret

Type:

```text
kubernetes.io/basic-auth
```

Contains:

```text
username
password
```

Example:

```text
username=admin
password=pass123
```

---

# 5. SSH Auth Secret

Type:

```text
kubernetes.io/ssh-auth
```

Contains:

```text
SSH Private Key
```

Use cases:

```text
Git Clone
SSH Access
Automation
```

---

# 6. TLS Secret

Type:

```text
kubernetes.io/tls
```

Contains:

```text
tls.crt
tls.key
```

Used by:

```text
Ingress
HTTPS Applications
Certificates
```

Example:

```text
example.com certificate
```

---

# Real Example

Ingress:

```yaml
tls:
- hosts:
  - example.com
  secretName: tls-secret
```

Ingress Controller TLS Secret vaprun HTTPS enable karto.

---

# How Pods Use Secrets?

### Environment Variables

```yaml
env:
- name: DB_PASSWORD
  valueFrom:
    secretKeyRef:
      name: db-secret
      key: password
```

---

### Mounted as Files

```yaml
volumes:
- name: secret-volume
  secret:
    secretName: db-secret
```

Container madhye:

```text
/etc/secrets/password
```

file disel.

---

# Important Interview Point

Secret encryption baddal.

Default:

```text
Base64 Encoded
```

Only.

Base64 encryption nahi.

He khup common interview trap ahe.

---

## Interview Trap

Interviewer:

> Are Kubernetes Secrets encrypted?

Best answer:

> "By default, Secrets are only Base64 encoded, not encrypted. For stronger protection, etcd encryption at rest should be enabled."

---

# Interview Answer

> "A Secret is a Kubernetes object used to store sensitive information such as passwords, API keys, certificates, and tokens. Common secret types include Opaque for generic data, dockerconfigjson for container registry credentials, tls for certificates, basic-auth for username/password pairs, ssh-auth for SSH keys, and service-account-token for Kubernetes API authentication."

---

## One-Line Interview Version

> **"The most common Kubernetes Secret type is Opaque, while specialized types exist for TLS certificates, Docker registry credentials, SSH keys, service account tokens, and basic authentication."**

### Quick Revision Table

| Secret Type           | Use Case                      |
| --------------------- | ----------------------------- |
| Opaque                | Generic passwords, API keys   |
| service-account-token | API Server authentication     |
| dockerconfigjson      | Private registry login        |
| basic-auth            | Username/password             |
| ssh-auth              | SSH private keys              |
| tls                   | TLS certificate + private key |

Interview madhye jar vicharla:

> **"How do you consume a Secret inside a Pod?"**

Tar answer:

> **"Secrets can be exposed either as environment variables or mounted as files through volumes."** ✅
