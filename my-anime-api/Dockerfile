FROM node:18.17.1

WORKDIR /app

COPY package*.json ./

RUN npm install
RUN npm install bcrypt

COPY . .

EXPOSE 3000

CMD [ "npm", "start" ]
