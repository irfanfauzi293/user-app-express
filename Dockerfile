FROM node:12

# env port
ENV PORT=5000

# env JWT Token
ENV ACCESS_TOKEN_KEY=ec2076f8f9f3f838dadebbee482fd24ab53fd763773b9960f82c4f3e7820c2880ac18b0e6a58ba1dc9912cfe0313141b4afc5f7f79a1383f50113d742716c281
ENV REFRESH_TOKEN_KEY=f5dce420da3478d47d4fc9317177aaf0202e77bb4f284fa0e87b0279ecfde1f475b3d25f18847a7bbc7ac4d9e21ca037694cb1d742bb33cf41605f72864f260b

# env postgres
ENV PGUSER=postgres
ENV PGHOST=192.168.1.14
ENV PGPASSWORD=Rawabadak25
ENV PGDATABASE=usersapp_express
ENV PGPORT=5432

WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app

# for run script postgres create required table
RUN npm run migrate up

CMD npm run start
EXPOSE 5000
EXPOSE 5432
