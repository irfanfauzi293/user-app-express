﻿# user-app-express
 This is a simple authentication app with token and CRUD User API service.
 
 It use Node.js with express framework and postgresql for the database.
 
 ## Requirements
 
 - Node.js
 
 Node.js is javascript runtime outside of the web environment. You will need this for running the code locally.
 
 - Postgresql
 
 Postgresql is one of object-relational database. This apps use this database so you will need install it locally.
 
 - Docker (Optional)
 
 There is dockerfile if you want run the app without install node locally. I'm still learning this so you still have to install postgresql locally to connect docker container
 to postgresql.
 
 ## Usage running in localhost
 
 - Create .env in your directory
  
    PORT=[port]

    ACCESS_TOKEN_KEY=[your secretKey for access token]

    REFRESH_TOKEN_KEY=[your secretKey for refresh token]

    PGUSER=postgres

    PGHOST=localhost

    PGPASSWORD=[your local postgresql password]

    PGDATABASE=usersapp_express

    PGPORT=5432
    
 - npm install
  
  
 
 
 
 
 
 
 
