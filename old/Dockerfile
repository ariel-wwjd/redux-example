FROM node:14-alpine AS node-builder

WORKDIR /app

COPY package.json .
COPY yarn.lock .

RUN yarn install --frozen-lockfile

COPY . .

ENV NODE_ENV production
RUN yarn build


FROM golang:1.17-alpine AS go-builder

RUN apk update && apk upgrade && apk add --no-cache make

WORKDIR /app

COPY go.mod .
COPY go.sum .
COPY Makefile .
COPY main.go .

RUN make go-build


FROM scratch AS app-runner

COPY --from=node-builder /app/build ./build
COPY --from=go-builder /app/eiq30 ./eiq30

EXPOSE 3333
ENTRYPOINT ["./eiq30"]
