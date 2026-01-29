# ---------- Stage 1: Build ----------
FROM eclipse-temurin:21-jdk AS builder
WORKDIR /usr/src/app

COPY ./gradle/ ./gradle
COPY gradlew* build.gradle settings.gradle ./

RUN chmod +x gradlew

RUN ./gradlew dependencies

COPY . .
COPY ./pb/ ./pb/

RUN chmod +x gradlew

RUN ./gradlew installDist --no-daemon

# ---------- Stage 2: Release ----------

FROM ubuntu/jre:21-24.04_edge as release

WORKDIR /usr/src/app

COPY --from=builder /usr/src/app/ ./

ENV PORT=3000

ENTRYPOINT ["./build/install/opentelemetry-demo-ad/bin/Ad"]