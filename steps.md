aws ecr --profile liquity get-login-password --region ap-southeast-1 | docker login --username AWS --password-stdin 506153001771.dkr.ecr.ap-southeast-1.amazonaws.com
docker-compose -f packages/dev-frontend/docker-compose.yml  build
docker tag sushmitsarmah/liquity:latest 506153001771.dkr.ecr.ap-southeast-1.amazonaws.com/liquity:latest
docker push 506153001771.dkr.ecr.ap-southeast-1.amazonaws.com/liquity