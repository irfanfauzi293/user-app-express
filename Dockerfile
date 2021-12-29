FROM node:12

WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app

CMD ["./entrypoint.cmd"]
EXPOSE 5000
EXPOSE 5432
