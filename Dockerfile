from node:8

WORKDIR /home/robert/findme

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 80

CMD node index.js
