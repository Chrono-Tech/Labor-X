FROM node:8.4-slim
ENV NPM_CONFIG_LOGLEVEL error
ARG TYPE
RUN mkdir /app
WORKDIR /app
RUN apt update && \
    apt install -y python make g++ git build-essential && \
    npm install -g pm2@2.7.1 && \
    git clone https://github.com/ChronoBank/Labor-X && \
    cd Labor-X && \
    git checkout develop && \
    npm install eslint@^4.9.0 && \
    yarn install && \
    yarn run build
EXPOSE 3000 3001 3010 3011
RUN echo "test"
CMD pm2 start npm --name "next" -- start