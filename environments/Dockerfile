ARG BASE_IMAGE=node:23.5.0-bullseye-slim
FROM ${BASE_IMAGE}

ARG APPLICATION_DIRECTORY=/home/node/limit-lab-homepage

ENV DEBIAN_FRONTEND="noninteractive" \
    LC_ALL="C.UTF-8" \
    LANG="C.UTF-8"

RUN apt update \
    && apt install --no-install-recommends -y git curl make

# In the official Node Docker image, UID 1000 is assigned to the node user by default.
USER node
WORKDIR ${APPLICATION_DIRECTORY}

CMD ["bash"]