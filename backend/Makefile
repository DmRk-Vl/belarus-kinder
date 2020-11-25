.PHONY: build
build:
	go build -v ./cmd/apiserver

.PHONY: start
start: build
	./apiserver

.PHONY: test
test:
	go test -timeout 30s ./...

.DEFAULT_GOAL := start