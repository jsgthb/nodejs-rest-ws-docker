# NodeJS RESTful Web Service Example
Simple NodeJS REST WS example using Docker.
Currently supports registering, login and displaying a list of users.

## Installation
1. Create ECDSA prime256v1 keypair in src/config folder
`openssl ecparam -genkey -name prime256v1 -noout -out ecdsa-p256-private.pem`
`openssl ec -in ecdsa-p256-private.pem -pubout -out ecdsa-p256-public.pem`
2. Switch to root project folder
3. Edit preferences in .env file
4. Run `docker-compose up` to start MongoDB container
5. Run `npm run start` to start project

## Endpoints
GET /users
POST /users/login
POST /users/register