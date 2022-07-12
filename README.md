# customer-service-bls
A service to hold customer information

## Create Customer
* Endpoint: `POST http://localhost:7000/v1/api/customers/register`
* Payload example: 
```
{
  "first_name": "John",
  "last_name": "Smith",
  "email": "johnsmith@gmail.com",
  "password": "12345#"
}

```

## Login Customer
* Endpoint: `POST http://localhost:7000/v1/api/customers/login`
* Payload example: 
```
{
  "email": "johnsmith@gmail.com",
  "password": "12345#"
}

```
