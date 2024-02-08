FROM node:21-bullseye as runner

WORKDIR /app

COPY . .

RUN npm install

EXPOSE 5174

CMD [ "npm", "run", "dev" ]