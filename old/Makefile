.PHONY: docker-eiq30-build docker-eiq30-run \
	docker-registry-push docker-registry-run \
	docker-registry-tag k8-local-apply \
	minikube-eiq30-delete \
	use-minikube-docker-daemon

docker-build:	docker-eiq30-build
docker-run: docker-eiq30-run
k8-apply: k8-local-apply
mk-apply: k8-apply
mk-delete: minikube-eiq30-delete
mk-build: minikube-build
mk-deploy: mk-build mk-apply
use-mk: use-minikube-docker-daemon

docker-eiq30-build:
	docker build -t eiq30 .
docker-eiq30-run:
	docker run -p 3333:3333 --name eiq30 eiq30

docker-registry-push:
	docker push localhost:5000/eiq30
docker-registry-run:
	-docker run -d -p 5000:5000 --restart=always \
		--name registry registry:2
docker-registry-tag:
	docker tag eiq30 localhost:5000/eiq30

go-build:
	CGO_ENABLED=0 GOOS=linux go build \
		-a -installsuffix nocgo -o eiq30 main.go

k8-local-apply:
	kubectl apply -f k8/local.namespace.yml
	envsubst < k8/local.config.yml > k8/tmp.local.config.yml
	kubectl apply --kubeconfig=k8/tmp.local.config.yml \
		-f k8/local.deployment.yml
	kubectl apply --kubeconfig=k8/tmp.local.config.yml \
		-f k8/local.service.yml
	rm k8/tmp.local.config.yml

minikube-build: minikube-eiq30-build \
	minikube-registry-tag \
	minikube-registry-run \
	minikube-registry-push
minikube-eiq30-build: use-mk docker-build
minikube-eiq30-delete:
	kubectl delete namespace eiq30-minikube
minikube-registry-push: use-mk docker-registry-push
minikube-registry-run: use-mk docker-registry-run
minikube-registry-tag: use-mk docker-registry-tag

use-minikube-docker-daemon:
	eval $$(minikube docker-env)

