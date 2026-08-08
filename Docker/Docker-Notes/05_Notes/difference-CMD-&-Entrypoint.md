Bhai, **CMD ani ENTRYPOINT** ha Docker interview madhla classic question ahe.

Lokanna confusion hote karan donhi container start zalyavar command run karayla vapartat.

Pan difference khup simple ahe.

---

# Short Definition

### CMD

> **Default command provide karto, ji user override karu shakto.**

---

### ENTRYPOINT

> **Main command define karto, ji container cha fixed executable aste.**

---

# CMD Example

Dockerfile:

```dockerfile
FROM ubuntu

CMD ["echo", "Hello World"]
```

Run:

```bash
docker run my-image
```

Output:

```text
Hello World
```

---

Pan user override karu shakto:

```bash
docker run my-image ls
```

Output:

```text
bin
etc
usr
...
```

Ithe:

```text
CMD replace zala
```

---

# ENTRYPOINT Example

Dockerfile:

```dockerfile
FROM ubuntu

ENTRYPOINT ["echo"]
```

Run:

```bash
docker run my-image Hello
```

Output:

```text
Hello
```

Run:

```bash
docker run my-image Kubernetes
```

Output:

```text
Kubernetes
```

Ithe:

```text
ENTRYPOINT = echo

Hello / Kubernetes
=
arguments
```

---

# Most Important Difference

CMD:

```text
Can be replaced
```

ENTRYPOINT:

```text
Acts as fixed executable
```

---

# Together Use Karne

Production madhye khup vela donhi ekatra vapartat.

Dockerfile:

```dockerfile
ENTRYPOINT ["java"]

CMD ["-jar", "app.jar"]
```

Run:

```bash
docker run my-app
```

Actually execute hoil:

```bash
java -jar app.jar
```

---

User override karto:

```bash
docker run my-app -version
```

Execute:

```bash
java -version
```

---

Notice:

```text
ENTRYPOINT same rahila

CMD change zala
```

---

# Real World Example

Spring Boot App:

```dockerfile
ENTRYPOINT ["java"]

CMD ["-jar", "application.jar"]
```

Default:

```bash
java -jar application.jar
```

---

Need:

```bash
docker run my-app -XshowSettings
```

Result:

```bash
java -XshowSettings
```

---

# How To Override ENTRYPOINT?

Possible ahe:

```bash
docker run \
--entrypoint /bin/bash \
my-image
```

Pan explicitly karava lagto.

Normal arguments ne ENTRYPOINT replace hot nahi.

---

# Interview Table

| Feature           | CMD                       | ENTRYPOINT           |
| ----------------- | ------------------------- | -------------------- |
| Purpose           | Default command/arguments | Main executable      |
| Easily overridden | Yes                       | No                   |
| Runtime arguments | Replace CMD               | Append to ENTRYPOINT |
| Common Use        | Defaults                  | Fixed application    |

---

# Memory Trick

Samja container ek car ahe.

### ENTRYPOINT

```text
Car Engine
```

Fixed.

---

### CMD

```text
Destination
```

Change hou shakta.

---

Example:

```text
ENTRYPOINT = car

CMD = Pune
```

Run:

```text
car Pune
```

Override:

```text
car Mumbai
```

Engine same.

Destination badalla.

---

# Interview Answer

> "ENTRYPOINT defines the main executable that will always run when the container starts, whereas CMD provides default arguments or a default command that can be overridden at runtime. When both are used together, ENTRYPOINT specifies the executable and CMD supplies the default parameters."

---

## One-Line Interview Version

> **"ENTRYPOINT defines what to run, while CMD defines the default arguments for what to run."** ✅

### Common Follow-up

Interviewer:

> "Which one would you use for a production application?"

Good answer:

> **"I typically use ENTRYPOINT for the application executable and CMD for default runtime arguments, because it provides flexibility while keeping the main process fixed."** ✅
