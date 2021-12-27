# user-app-express
 This is a simple authentication app with token and CRUD User API service.
 
 It use Node.js with express framework and postgresql for the database.
 
 ## Requirements
 
 - Node.js
 
 Node.js is javascript runtime outside of the web environment. You will need this for running the code locally.
 
 - Postgresql
 
 Postgresql is one of object-relational database. This apps use this database so you will need install it locally.
 
 - Docker (Optional)
 
There is dockerfile if you want to run the app without install node locally. I'm still learning this so you still have to install postgresql locally to connect docker   container to postgresql.

 ## Project Structure
 
 ### API Server Files
 
 Like the usual node.js app, there are package.json and package-lock.json for running script and install dependencies. Migration is for running postgresql script with node-pg-migration library. It can be used for rollback. Scr folder are for application files. There are controller for handle request , service for bussiness logic, dao for query database logic, and route for define request method.
 
 ### Dockerfile
 
 Dockerfile used for running app without node.js locally.
 
 ## Running app locally with node.js
 
 - Create .env in your directory
  
    PORT=[port]

    ACCESS_TOKEN_KEY=[your secretKey for access token]

    REFRESH_TOKEN_KEY=[your secretKey for refresh token]

    PGUSER=postgres

    PGHOST=localhost

    PGPASSWORD=[your local postgresql password]

    PGDATABASE=usersapp_express

    PGPORT=5432
    
 - Create database usersapp_express in your local postgresql
 - npm install
 - npm run migrate up
 
 this command for create tables and their relation in usersapp_express database.
 
 - npm run start

 ## Running app with docker
 
 - open pg_hba.conf in postgresql system directory /PostgresSQL/13/data.
   ````
     host all all 0.0.0.0/0 md5 
   ````
   add it at the end of line.
 - open postgresql.conf in postgresql system directory /PostgresSQL/13/data.
   
   ````
   listen_address = '*'
   ````
   change the value of listen_address into '*'.
 - change env value in dockerfile based on your environment variable.
 - type docker build -t docker_users_app_express in app directory.
 - type docker run -it -p 5000:5000 docker_users_app_express , to run docker image.

## API Endpoints
### Login API
````
POST /authentications

Returns access token and refresh token

request payload :
{
    "username": "admin",
    "password": "P@ssw0rd"
}

response :
{
    "status": "success",
    "message": "Login successfully",
    "data": {
        "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InVzZXItYWRtaW4iLCJjcmVhdGVBY2Nlc3MiOnRydWUsInVwZGF0ZUFjY2VzcyI6dHJ1ZSwicmVhZEFjY2VzcyI6dHJ1ZSwiZGVsZXRlQWNjZXNzIjp0cnVlLCJpYXQiOjE2NDA1OTQ4NzcsImV4cCI6MTY0MDU5NDkzN30.zN7OvRxbClkMuCrNlojEfiP97AxBNi3UxjKmFBezLx4",
        "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InVzZXItYWRtaW4iLCJjcmVhdGVBY2Nlc3MiOnRydWUsInVwZGF0ZUFjY2VzcyI6dHJ1ZSwicmVhZEFjY2VzcyI6dHJ1ZSwiZGVsZXRlQWNjZXNzIjp0cnVlLCJpYXQiOjE2NDA1OTQ4Nzd9.9Pys9jN2bq5cIbeVKJb6_3fX-Wrt1ctgwXPavfWqxJQ"
    }
}
````

### Update Refresh Token API
````
PUT /authentications

Returns access token

request payload :
{
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InVzZXItYWRtaW4iLCJjcmVhdGVBY2Nlc3MiOnRydWUsInVwZGF0ZUFjY2VzcyI6dHJ1ZSwicmVhZEFjY2VzcyI6dHJ1ZSwiZGVsZXRlQWNjZXNzIjp0cnVlLCJpYXQiOjE2NDA1OTQ4Nzd9.9Pys9jN2bq5cIbeVKJb6_3fX-Wrt1ctgwXPavfWqxJQ"
}

response :
{
    "status": "success",
    "message": "Access Token is Updated",
    "data": {
        "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InVzZXItYWRtaW4iLCJjcmVhdGVBY2Nlc3MiOnRydWUsInJlYWRBY2Nlc3MiOnRydWUsInVwZGF0ZUFjY2VzcyI6dHJ1ZSwiZGVsZXRlQWNjZXNzIjp0cnVlLCJpYXQiOjE2NDA1OTQ4OTIsImV4cCI6MTY0MDU5NDk1Mn0.U0P_YOII6aTjDN2UYdD_WjhUSlxhnC2ea_1EpMrxuKM"
    }
}
````

### Delete Refresh Token API
````
DELETE /authentications

Returns message delete successfully

request payload :
{
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InVzZXItYWRtaW4iLCJjcmVhdGVBY2Nlc3MiOnRydWUsInVwZGF0ZUFjY2VzcyI6dHJ1ZSwicmVhZEFjY2VzcyI6dHJ1ZSwiZGVsZXRlQWNjZXNzIjp0cnVlLCJpYXQiOjE2NDA1OTQ4Nzd9.9Pys9jN2bq5cIbeVKJb6_3fX-Wrt1ctgwXPavfWqxJQ"
}

response :
{
    "status": "success",
    "message": "Refresh token is deleted successfully"
}
````
### Create New User API
````
POST /users

Returns inserted userId

request payload :
{
    "username": "irfan",
    "password": "password",
    "fullname": "ahmad irfan"
}

response :
{
    "status": "success",
    "message": "User is created succesfully",
    "data": {
        "userId": "user-DM3xXInhB3q6Sjs8"
    }
}
````
### Update User API
````
PUT /users/:id

Returns update message successfully

request payload :
{
    "fullname": "Irfan"
}

response :
{
    "status": "success",
    "message": "User is updated successfully"
}
````
### Read User Info API
````
GET /users

Return user info based on access token in authorization bearer token.

response :
{
    "status": "success",
    "data": {
        "id": "user-admin",
        "username": "admin",
        "fullname": "Administrator"
    }
}
````
### Delete User API
````
DELETE  /users/:id

Returns delete user message successfully.

response :
{
    "status": "success",
    "message": "User is deleted successfully"
}
````
  
 
 
 
 
 
 
 
