# Base image
FROM node:18-alpine

# Install Git
RUN apk update && \
    apk add --no-cache git

# Set the working directory
WORKDIR /app

COPY package.json yarn.lock lerna.json ./

COPY /packages/user/package*.json ./packages/user/

COPY /packages/user/ ./packages/user/

COPY /packages/shared/package*.json ./packages/shared/

COPY /packages/shared/ ./packages/shared/

# Use the personal access token to clone the private repository over HTTPS
ARG GIT_TOKEN
ARG VITE_PUBLIC_ENV
ARG CURRENT_BRANCH
RUN git clone -b $(if [ "$CURRENT_BRANCH" = "main" ]; then echo "main"; else echo "develop"; fi) https://${GIT_TOKEN}@github.com/OlufyGroup/translations.git ./translations 

RUN mkdir -p /app/packages/user/src/locales && \
    cp -r /app/translations/user/* /app/packages/user/src/locales/

ARG VITE_API_ENDPOINT
ARG VITE_FIREBASE_API_KEY
ARG VITE_FIREBASE_APP_ID
ARG VITE_FIREBASE_AUTH_DOMAIN
ARG VITE_FIREBASE_PROJECT_ID

ENV VITE_API_ENDPOINT ${VITE_API_ENDPOINT}
ENV VITE_FIREBASE_API_KEY ${VITE_FIREBASE_API_KEY}
ENV VITE_FIREBASE_APP_ID ${VITE_FIREBASE_APP_ID}
ENV VITE_FIREBASE_AUTH_DOMAIN ${VITE_FIREBASE_AUTH_DOMAIN}
ENV VITE_FIREBASE_PROJECT_ID ${VITE_FIREBASE_PROJECT_ID}
ENV VITE_PUBLIC_ENV ${VITE_PUBLIC_ENV}

RUN yarn install

#RUN npx lerna bootstrap

RUN yarn build

RUN cp -r /app/packages/user/src/locales/*.po /app/translations/user/

WORKDIR /app/translations

# Configure Git user
ARG GIT_EMAIL
ARG GIT_USERNAME
RUN git config --global user.email ${GIT_EMAIL} && \
    git config --global user.name ${GIT_USERNAME}

RUN git add * && \
    git diff --quiet --cached --exit-code || \
    (git commit -m "update translations" && \
    git remote set-url origin https://${GIT_TOKEN}@github.com/OlufyGroup/translations.git && \
    git pull --rebase origin $(if [ "$CURRENT_BRANCH" = "main" ]; then echo "main"; else echo "develop"; fi) && \
    git push origin $(if [ "$CURRENT_BRANCH" = "main" ]; then echo "main"; else echo "develop"; fi))

WORKDIR /app

EXPOSE 3000

# Start the server in production mode
ENV PORT 3000

CMD cd packages/user && yarn run server:prod
