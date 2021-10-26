FROM golang:1.17-alpine AS builder

WORKDIR /go/src/app
COPY . .

RUN go build Desafio.go && mkdir target && cp Desafio target/

FROM scratch
COPY --from=builder /go/src/app/target .
ENTRYPOINT ["./Desafio"]