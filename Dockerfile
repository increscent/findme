from node:8

WORKDIR /home/robert/findme

COPY pakage*.json ./

RUN npm install

COPY . .

EXPOSE 5678

CMD node index.js
