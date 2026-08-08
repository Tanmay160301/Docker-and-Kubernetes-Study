Bhai, he donhi cleanup commands ahet, pan tyanchi scope vegli ahe.

---

# 1. `docker system prune -a`

Ha **Docker madhle almost sagle unused resources** clean karto.

Command:

```bash
docker system prune -a
```

---

## Kay Remove Karto?

### 1. Stopped Containers

```text
Container-1 (Stopped) ❌
Container-2 (Stopped) ❌
```

Delete hotil.

---

### 2. Unused Networks

```text
Custom Network
```

Use madhye nasel tar delete.

---

### 3. Build Cache

```text
Old Docker Build Layers
```

Delete hotat.

---

### 4. Unused Images

He important ahe.

Samja:

```text
nginx:v1
ubuntu:22.04
myapp:v3
```

Ahet.

Pan kontyahi running container ne use kele nahi.

Tar:

```text
Delete ❌
```

hotil.

---

## Example

Before:

```text
Images      10 GB
Containers   1 GB
Cache        5 GB
```

Command:

```bash
docker system prune -a
```

After:

```text
Images      2 GB
Containers  100 MB
Cache       0 MB
```

---

## Interview Point

`-a` mhanje:

```text
all unused images
```

---

Without `-a`

```bash
docker system prune
```

Fakta dangling images remove karto.

---

With `-a`

```bash
docker system prune -a
```

Unused images pan remove karto.

---

# 2. `docker volume prune`

Ha command **unused volumes** delete karto.

---

## Volume Mhanje?

Samja:

```bash
docker run -v mydata:/var/lib/mysql mysql
```

Docker volume create zala:

```text
mydata
```

---

Container delete jhala tari:

```text
Volume still exists
```

karan data preserve karaycha asto.

---

Kahi velane:

```text
mydata
testdata
olddata
```

ase barech unused volumes jama hotat.

---

Command:

```bash
docker volume prune
```

---

Result:

```text
Unused volumes deleted
```

---

## Important

Fakta:

```text
Unused Volumes
```

delete hotat.

Running container use kart asel tar delete hot nahi.

---

# Real Example

Suppose:

```text
Container deleted

Volume:
mysql-data

Size:
20 GB
```

Disk full zali.

Check:

```bash
docker system df
```

Output:

```text
Volumes = 40GB
```

Cleanup:

```bash
docker volume prune
```

---

# Difference

| Command                  | Removes                                                  |
| ------------------------ | -------------------------------------------------------- |
| `docker system prune -a` | Stopped containers, unused images, networks, build cache |
| `docker volume prune`    | Unused volumes only                                      |

---

# Interview Answer

> "`docker system prune -a` removes all unused Docker resources including stopped containers, unused networks, build cache, and unused images. `docker volume prune` specifically removes unused Docker volumes that are no longer attached to any container."

---

## One-Line Interview Version

> **"`docker system prune -a` performs broad Docker cleanup, while `docker volume prune` cleans only unused persistent volumes."** ✅

### Interview Follow-up

Jar interviewer vicharla:

> "Would you run `docker system prune -a` directly in production?"

Answer:

> **"No. I would first inspect disk usage using `docker system df` and verify which resources are safe to remove, because `docker system prune -a` can delete images that may be needed later and would have to be pulled again."** ✅
