# Kubernetes Storage

## Table of Contents

- [Kubernetes Storage](#Kubernetes-Storage)
- [Types of Volumes](#Types-of-volumes)
- [Ephemeral Volumes](#ephemeral-volume)
- [Persistent Volumes](#persistent-volume)
- [Persistent Volume Claims](#persistent-volume-claim)
- [Access Policies](#access-policies)
- [Static and Dynamic Provisioning](#Static-and-Dynamic-Provisioning)
- [Reclaim Policies](#Reclaim-Policies)
- [Storage Classes](#Storage-classes)
- [Demo which I had done](#Demo)

Here are clean, well-structured notes you can directly copy into your Markdown file:

---

# Kubernetes Storage

Storage in Kubernetes allows containers to persist data beyond the lifecycle of a single Pod. By default, containers are ephemeral — when a Pod is deleted, its data is lost. Kubernetes solves this using **Volumes**, **PersistentVolumes (PV)**, and **PersistentVolumeClaims (PVC)**.

Storage in Kubernetes supports:

* Ephemeral storage (lives and dies with the Pod)
* Persistent storage (survives Pod restarts and rescheduling)
* Static and dynamic provisioning
* Multiple storage backends (NFS, cloud disks, CSI drivers, etc.)

---

## Types of Volumes

<p align="center">
  <img src="Images/1.Volumes-in-k8.jpg" width="600"/>
</p>


In Kubernetes, a **Volume** is a directory accessible to containers in a Pod.

There are two broad categories:

1. **Ephemeral Volumes**

   * Exist only for the lifetime of the Pod
   * Deleted when the Pod is deleted

2. **Persistent Volumes**

   * Exist independently of Pods
   * Survive Pod restarts and deletion

---

## Ephemeral Volumes

Ephemeral volumes are created and deleted along with the Pod.

### Common Types:

### 1. `emptyDir`

* Created when Pod starts
* Stored on node disk (or memory if configured)
* Deleted when Pod is removed
* Useful for:

  * Caching
  * Temporary files
  * Sharing data between containers in the same Pod

### 2. `configMap`

* Injects configuration data into Pods
* Stores non-sensitive configuration

### 3. `secret`

* Stores sensitive data like passwords, tokens, certificates
* Base64 encoded

### 4. `downwardAPI`

* Exposes Pod metadata (like labels, annotations) to containers

### 5. CSI Ephemeral Volumes

* Provided by CSI drivers
* Inline ephemeral storage support

---

## Persistent Volumes

<p align="center">
  <img src="Images/4.PV-and-PVC.jpg" width="600"/>
</p>

Storage admin will create a volume of say 80 GB  
Developer will create a persistent volume claim of say 10GB to consume it  

A **PersistentVolume (PV)** is a cluster-wide storage resource.

It is:

* Provisioned by an administrator or dynamically
* Independent of any Pod
* Backed by real storage (EBS, Azure Disk, NFS, etc.)

### Key Characteristics:

* Has a defined capacity (e.g., 10Gi)
* Has access modes
* Has a reclaim policy
* Bound to a PersistentVolumeClaim

---

## Persistent Volume Claims

A **PersistentVolumeClaim (PVC)** is a request for storage by a user.

Think of it like:

* **Pod → PVC → PV → Actual Storage**

The PVC specifies:

* Required storage size
* Access mode
* Storage class (optional)

If a matching PV exists, Kubernetes binds the PVC to it.

**Rule: PVC and volume storage can only be bound if they have same access policies**  

Example flow:

1. User creates PVC
2. Kubernetes finds matching PV
3. PVC binds to PV
4. Pod mounts PVC

---

## Access Policies

<p align="center">
  <img src="Images/5.Access-modes.jpg" width="600"/>
</p>

Read write once - single application can perform read and write operations for that volume created  
Many - for multiple applications  

Access modes define how a volume can be mounted.

### 1. ReadWriteOnce (RWO)

* Mounted as read-write by a single node

### 2. ReadOnlyMany (ROX)

* Mounted as read-only by many nodes

### 3. ReadWriteMany (RWX)

* Mounted as read-write by many nodes

### 4. ReadWriteOncePod (RWOP)

* Mounted by only one Pod at a time

> Note: Actual support depends on the storage backend.

---

## Static and Dynamic Provisioning

<p align="center">
  <img src="Images/6.static-and-dynamic-provisioning.jpg" width="600"/>
</p>


### Static Provisioning

* Admin manually creates PersistentVolumes
* PVC binds to an existing PV

Flow:

1. Admin creates PV
2. User creates PVC
3. Kubernetes binds them like whenever we create kubernetes manifests like pod.yaml or deployment.yaml we provide the persistent volume and persistent volume claim on that

Use case:

* Pre-provisioned storage
* On-prem environments

---

### Dynamic Provisioning

* Kubernetes automatically provisions storage
* Triggered by PVC
* Requires a StorageClass

Suppose we have a new pod requiring 70 Gi of RWX access policy storage then 
System will dynamically create the storage volume of same access policy  

Flow:

1. User creates PVC
2. StorageClass provisions new PV automatically
3. PVC binds to newly created PV

Common in cloud environments.

---

## Reclaim Policies  

<p align="center">
  <img src="Images/7.Reclaim-policy.jpg" width="600"/>
</p>


Reclaim policy defines what happens to the PV after the PVC is deleted.

### 1. Retain

* PV is not deleted
* Data remains
* Manual cleanup required

### 2. Delete

* PV and underlying storage are deleted automatically

### 3. Recycle (Deprecated)

* Basic scrub (`rm -rf`)
* Not recommended

---

## Storage Classes  

<p align="center">
  <img src="Images/8.Storage-classes.jpg" width="600"/>
</p>


A **StorageClass** defines:

* Provisioner (e.g., AWS EBS, GCE PD, CSI driver)
* Parameters (disk type, IOPS, etc.)
* Reclaim policy
* Volume binding mode

It enables dynamic provisioning.

Example capabilities:

* SSD vs HDD
* High IOPS disks
* Encrypted volumes
* Regional or zonal storage

### Volume Binding Modes

1. `Immediate`

   * PV is provisioned immediately after PVC creation

2. `WaitForFirstConsumer`

   * PV created only when Pod is scheduled
   * Helps with topology-aware provisioning

---

## Summary Architecture

```
Pod
  ↓
PersistentVolumeClaim (PVC)
  ↓
PersistentVolume (PV)
  ↓
Storage Backend (EBS / NFS / Azure Disk / CSI)
```

---

### Demo:  

**Ephemeral Storage creation:**  
I have applied pods.yaml file

<p align="center">
  <img src="Images/2.Ephemeral-a.jpg" width="600"/>
</p>


<p align="center">
  <img src="Images/3.Ephermeral-b.jpg" width="600"/>
</p>

<p align="center">
  <img src="Images/3.Ephermeral-c.jpg" width="600"/>
</p>

**Persistent Volume creation**  

Firstly we will do docker exec into our container and will create a file to be later view from POD when we attach the container volumer to our pod to replicate persistent volume scenario

<p align="center">
  <img src="Images/9.docker-exec-to-create-file-to-later-used-in-PV.jpg" width="600"/>
</p>

<p align="center">
  <img src="Images/10.kubectl-apply-pv-and-pvc.jpg" width="600"/>
</p>

<p align="center">
  <img src="Images/10.kubectl-apply-pv-and-pvc.jpg" width="600"/>
</p>

Here we are viewing the file from our POD volume  

<p align="center">
  <img src="Images/12.kubectl-exec-to-check-for-created-file.jpg" width="600"/>
</p>


