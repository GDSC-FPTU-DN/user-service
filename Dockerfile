FROM node:20-alpine

WORKDIR /app

COPY package*.json /app

RUN npm install

COPY . /app

VOLUME [ "/sessions" ]

EXPOSE 3000

# CMD [ "npm", "run", "deploy" ]
CMD [ "npm", "run", "dev" ]