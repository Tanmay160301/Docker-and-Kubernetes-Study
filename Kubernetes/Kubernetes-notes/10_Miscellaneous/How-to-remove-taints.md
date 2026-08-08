Bhai, taint remove karaycha syntax khup simple ahe.

Samja node var taint ahe:

```text
node-role.kubernetes.io/control-plane:NoSchedule
```

Remove karayla:

```bash
kubectl taint nodes <node-name> node-role.kubernetes.io/control-plane:NoSchedule-
```

Lakshat ghe:

```text
Shevti "-" ahe
```

Ha `-` mhanje **remove this taint**.

---

## Example

Node:

```text
master-node
```

Taint:

```text
node-role.kubernetes.io/control-plane:NoSchedule
```

Remove:

```bash
kubectl taint nodes master-node \
node-role.kubernetes.io/control-plane:NoSchedule-
```

---

## Verify Taint

Adhi bagh:

```bash
kubectl describe node master-node
```

Output:

```text
Taints:
node-role.kubernetes.io/control-plane:NoSchedule
```

---

Remove kelyanantar:

```bash
kubectl describe node master-node
```

Output:

```text
Taints: <none>
```

---

## Specific Taint Remove Karaycha Asel

Samja:

```text
dedicated=database:NoSchedule
```

Remove:

```bash
kubectl taint nodes node-1 dedicated=database:NoSchedule-
```

---

## Sagle Taints Baghayche

```bash
kubectl describe node node-1
```

kiva

```bash
kubectl get nodes -o wide
```

(taints detail sathi `describe` jast useful ahe)

---

## Interview Answer

> "A taint can be removed using the `kubectl taint nodes` command with a trailing minus sign (`-`). For example, `kubectl taint nodes node1 dedicated=database:NoSchedule-` removes that taint from the node."

### One-Line Interview Version

> **"To remove a taint, use the same taint specification followed by a trailing `-` in the `kubectl taint nodes` command."** ✅

