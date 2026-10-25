ARG BASE_IMAGE=node:24.22.1-bookworm-slim@sha256:55fb5f5a527ea2c5c4a95f963e48ef90aa38c7b346054fdc8ee9957a2b55d205
FROM ${BASE_IMAGE}

ARG USER_NAME
ARG GROUP_NAME
ARG UID=1000
ARG GID=1000
ARG PROJECT_NAME
ARG SERVICE_NAME
ARG APPLICATION_PATH=.
ARG INNER_APPLICATION_PATH=/home/${USER_NAME}/${PROJECT_NAME}-${SERVICE_NAME}
ARG RUN_NPM_INSTALL_AT_BUILD_TIME="false"

ENV DEBIAN_FRONTEND="noninteractive" \
    LC_ALL="C.UTF-8" \
    LANG="C.UTF-8"

RUN apt-get update \
    && apt-get install --no-install-recommends -y git curl make libbrotli1 ca-certificates \
    && dpkg --compare-versions "$(dpkg-query -W -f='${Version}' libbrotli1)" ge 1.0.9-2+deb12u1 \
    && rm -rf /var/lib/apt/lists/*

# In the official Node Docker image, UID 1000 is assigned to the node user by default.
# So, delete the node user first and create a new user with the specified UID and GID.
RUN userdel node && rm -rf /home/node && groupdel node || true \
    && groupadd -g ${GID} ${GROUP_NAME} \
    && useradd -ms /bin/bash -u ${UID} -g ${GID} ${USER_NAME}

USER ${USER_NAME}
WORKDIR ${INNER_APPLICATION_PATH}

# When this Dockerfile is used in GitHub Actions, the ${RUN_NPM_INSTALL_AT_BUILD_TIME} is set to "true" in the workflow file.
# This leads to the installation of Node.js packages in the Docker image.
COPY --chown=${UID}:${GID} ${APPLICATION_PATH}/package.json ${APPLICATION_PATH}/package-lock.json ./
RUN if [ "${RUN_NPM_INSTALL_AT_BUILD_TIME}" = "true" ]; then npm ci; fi

CMD ["bash"]
