FROM node:13-slim 

WORKDIR /app 

COPY package*.json ./

RUN npm install 

COPY . . 

CMD ['node' , 'server.js']


