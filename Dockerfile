FROM node:18

WORKDIR /usr/src

COPY . .

RUN npm install && npm run build

CMD [ "npm", "start" ]