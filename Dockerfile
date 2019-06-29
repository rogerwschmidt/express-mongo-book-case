FROM node:latest

WORKDIR /app

COPY ./package.json ./packacge.json

RUN npm install

COPY . .

CMD ["npm", "start"]