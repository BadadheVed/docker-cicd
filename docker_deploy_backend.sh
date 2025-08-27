#!/bin/bash
set -e  

CONTAINER_NAME="backend_app"
IMAGE_NAME="ved104/cicd-docker"
IMAGE_TAG=$1    # commit SHA from GitHub Actions
DATABASE_URL=$2 # DB URL passed as second argument
PORT=5000
APP_PORT=8080

echo "🚀 Starting deployment of $IMAGE_NAME:$IMAGE_TAG"

# Stop and remove existing container if it exists
if [ "$(docker ps -aq -f name=$CONTAINER_NAME)" ]; then
  echo "🛑 Stopping and removing old container $CONTAINER_NAME..."
  docker stop $CONTAINER_NAME || true
  docker rm $CONTAINER_NAME || true
fi

# Run new container (docker run will pull automatically if missing)
echo "▶️ Running new container..."
docker run -d \
  --name $CONTAINER_NAME \
  -p $PORT:$APP_PORT \
  -e DATABASE_URL="$DATABASE_URL" \
  $IMAGE_NAME:$IMAGE_TAG

echo "✅ Deployment complete! Started Backend Service on the port 5000 check at the EC2 Ip:5000"
