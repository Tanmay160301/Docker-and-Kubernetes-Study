Bhai, `docker system df` ha command Docker ne kiti disk space vaparla ahe te dakhavto.

Linux madhlya:

```bash
df -h
```

sarkha ahe, pan specifically Docker resources sathi.

---

## Command

```bash
docker system df
```

Example Output:

```text
TYPE            TOTAL     ACTIVE    SIZE      RECLAIMABLE
Images          15        5         3.2GB     1.8GB (56%)
Containers      8         2         150MB     120MB (80%)
Local Volumes   10        4         5.5GB     2.0GB (36%)
Build Cache     20        0         1.2GB     1.2GB (100%)
```

---

## Column Meaning

### TYPE

Docker resource type:

```text
Images
Containers
Volumes
Build Cache
```

---

### TOTAL

Ekun kiti resources ahet.

Example:

```text
Images = 15
```

Mhanje machine var 15 Docker images ahet.

---

### ACTIVE

Currently use madhye kiti ahet.

Example:

```text
Containers = 8
Active = 2
```

Mhanje 8 containers exist kartat pan fakta 2 use madhye ahet.

---

### SIZE

Disk space usage.

Example:

```text
Images = 3.2GB
```

---

### RECLAIMABLE

Cleanup kelyavar kiti space parat milu shakto.

Example:

```text
1.8GB reclaimable
```

Mhanje unused images delete kelyavar 1.8GB free hoil.

---

## Why Useful?

Samja server var Docker build repeatedly chalat ahe.

Kahi divsanantar:

```text
No space left on device
```

error yeto.

Tyaveli first command:

```bash
docker system df
```

Bagh.

Output madhye disel:

```text
Images      25GB
BuildCache  15GB
```

Mag cleanup karu shakto.

---

## Detailed Version

```bash
docker system df -v
```

Ha command exact konti image, volume kiti space ghete te dakhavto.

---

## Related Cleanup Commands

Unused resources remove:

```bash
docker system prune
```

Unused images, containers, networks delete karto.

---

All unused images suddha:

```bash
docker system prune -a
```

---

## Interview Answer

> "`docker system df` displays Docker disk usage statistics. It shows how much storage is being used by images, containers, volumes, and build cache, and also indicates how much space can be reclaimed by removing unused resources."

### One-Line Interview Version

> **"`docker system df` is used to analyze Docker disk usage and identify reclaimable storage from unused images, containers, volumes, and build cache."** ✅

### Follow-up Interview Question

Interviewer: *"Docker host disk full zala tar kay karshil?"*

Good answer:

> "First I would run `docker system df` to identify what is consuming disk space. Then I would clean up unused images, stopped containers, volumes, or build cache using commands such as `docker system prune` after verifying that those resources are no longer needed."
    