#!/bin/sh

docker build -t amerej/devops-test-client:latest -t amerej/devops-test-client:$SHA -f ./client/Dockerfile ./client
docker build -t amerej/devops-test-server:latest -t amerej/devops-test-server:$SHA -f ./server/Dockerfile ./server

docker push amerej/devops-test-client:latest
docker push amerej/devops-test-server:latest

docker push amerej/devops-test-client:$SHA
docker push amerej/devops-test-server:$SHA

kubectl apply -f k8s
kubectl set image deployments/server-deployment server=amerej/devops-test-server:$SHA
kubectl set image deployments/client-deployment client=amerej/devops-test-client:$SHA
