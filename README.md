# customer-service-bls

A service to hold customer information

## Create Customer

- Endpoint: `POST http://localhost:7000/v1/api/customers/register`
- Payload example:

```
{
  "first_name": "John",
  "last_name": "Smith",
  "email": "johnsmith@gmail.com",
  "password": "12345#"
}

```

## Login Customer

- Endpoint: `POST http://localhost:7000/v1/api/customers/login`
- Payload example:

```
{
  "email": "johnsmith@gmail.com",
  "password": "12345#"
}

```

## Fund Account

- Endpoint: `POST http://localhost:7000/v1/api/customers/fund`
- Payload example:

```
{
  "account_id": "Y5M59EUyPG",
  "amount": 4000
}
```

## Get Account
- Endpoint: `GET http://localhost:7000/v1/api/customers/account?account_id=Y5M59EUyPG`

## ENV Keys
* DB_HOST = 
* DB_USER = 
* DB_PASSWORD = 
* DATABASE_NAME = 
* ACCESS_TOKEN_SECRET= 
* BASE_URL_BILLING= 

## Postman API Doc:
[Documentation](https://documenter.getpostman.com/view/15503893/UzQrSnDJ) 

## Run Project
1. `npm i`
2. `npm run build`
2. `npm start`