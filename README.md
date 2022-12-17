# NodeJS RESTful Web Service Example
Simple NodeJS REST WS example using Docker.
Currently supports registering, login, refreshing JWT and displaying a list of users (token from login required).

## Installation
1. Create ECDSA prime256v1 keypair in src/config folder
    1. `openssl ecparam -genkey -name prime256v1 -noout -out ecdsa-p256-private.pem`
    2. `openssl ec -in ecdsa-p256-private.pem -pubout -out ecdsa-p256-public.pem`
2. Switch to root project folder
3. Edit preferences in .env file
4. Run `docker-compose up` to start MongoDB container
5. Run `npm run start` to start project

## Endpoints
- GET /users
- POST /users/login (generates JWT)
- POST /users/register
- POST /users/refresh (to refresh JWT)