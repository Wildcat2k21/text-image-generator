# FROM node

FROM ghcr.io/panascais-docker/node/node:22.17.1

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

EXPOSE 3040

CMD ["npx", "vite"]
