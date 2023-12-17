Node RESTful API

A Node.js RESTful API Tutorial Project (Build a simple shop API)

### Commands

- mkdir node-rest-shop
- cd node-rest-shop
- npm init
    - package name: (rest-shop)
    - version: (1.0.0)
    - description: A Node.js RESTful API Tutorial Project (Build a simple shop API)
    - entry point: (index.js)
    - test command:
    - git repository:
    - keywords: node restful api
    - author: Md. Sabik Alam Rahat
    - license: (ISC)
    - About to write to /home/rahat/Projects/node-rest-shop/package.json:
    - Is this OK? (yes)
- code .
- npm install --save express
- npm install --save-dev nodemon (For automatically restart the server when changes are made)
    - package.json
        - "start": "nodemon server.js" (add this line in scripts) 
- npm install --save morgan (HTTP request logger middleware for node.js)
- npm install --save body-parser (Parse incoming request bodies in a middleware before your handlers, available under the req.body property.)
- npm install --save mongoose (Mongoose is a MongoDB object modeling tool designed to work in an asynchronous environment. Mongoose supports both promises and callbacks.)
- npm install --save multer (handle multipart/form-data, which is primarily used for uploading files)
- npm install --save bcrypt (A library to help you hash passwords.)
- npm install --save jsonwebtoken (An implementation of JSON Web Tokens.)
- 
- npm install --save pg (PostgreSQL client - Pure JavaScript and optional native libpq bindings)



### Unistall package

- npm uninstall --save <package-name>