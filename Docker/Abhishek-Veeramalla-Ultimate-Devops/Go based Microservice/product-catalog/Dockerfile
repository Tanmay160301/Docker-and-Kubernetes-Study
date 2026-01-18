# creating binaries so that we can copy them in later stages
FROM golang:1.24-alpine AS builder

WORKDIR /usr/src/app

COPY go.mod go.sum /usr/src/app/

RUN go version
RUN go mod download

COPY . .

RUN go mod tidy
RUN go build -o product-catalog ./

# Release stage
FROM alpine:3.14 AS release

WORKDIR /usr/src/app

# copy binaries from first stage to second stage
COPY --from=builder /usr/src/app/product-catalog ./

ENV PORT=3000

EXPOSE ${PORT}

CMD ["./product-catalog"]