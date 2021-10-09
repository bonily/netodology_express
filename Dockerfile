FROM node:14.15.4

WORKDIR /app

COPY ./package*.json /app/
RUN npm i
COPY ./index.js /app/
COPY ./src/ ./src

CMD ["npm", "start"]