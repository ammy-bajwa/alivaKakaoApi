FROM node:14

# Create app directory
WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

RUN mkdir -p ./uploads

# Bundle app source
COPY . .

EXPOSE 4030

CMD [ "node", "index.js" ]