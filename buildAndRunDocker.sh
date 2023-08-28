#!/bin/bash
IMAGE_NAME=rapidfort
IMAGE_TAG=latest

docker build . -t $IMAGE_NAME:$IMAGE_TAG

docker run -it $IMAGE_NAME:$IMAGE_TAG
