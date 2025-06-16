# .gitpod.Dockerfile
FROM gitpod/workspace-full:latest

# Install Docker Compose
RUN sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" \
  -o /usr/local/bin/docker-compose \
  && sudo chmod +x /usr/local/bin/docker-compose
