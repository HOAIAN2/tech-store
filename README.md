# Tech-store
## Prerequisites
- Nodejs v 18.11.0 or later (yarn or npm)
- MySQL
## Installation
- `git clone https://github.com/HOAIAN2/tech-store.git`
- `cd tech-store`
- Run `prepare.bat` to generate .env file and install libs for server and client.
- `yarn start` or `npm start`
## Build
- Run `build.bat` to build ReactJS and start server
## Database Diagram
![](/database/store_db_diagram.png)
## API
### User routes: /api/user/
>[GET] /: JWT require
- Respone
``` json
{
    "username": "username",
    "firstName": "first name",
    "lastName": "last name",
    "birthDate": "2023-02-09T01:18:02.135Z",
    "sex": "M",
    "address": "province, city, etc",
    "email": "username@email.com", // NULLABLE
    "phoneNumber": "+84....", // phone number in Vietnam, CHAR(12) NULLABLE
}
```
### Auth routes: /api/auth/
>[POST] login
- Request
```json
{
    "username": "username",
    "password": "password"
}
```
- Respone
```json
{
    "accessToken": "string",
    "refreshToken": "string"
}
```
>[POST] logout: JWT require
- Request
```json
{
    "refreshToken": "string"
}
```
- Respone
```json
{
    "message": "message"
}
```
>[POST] change-password: JWT require
- Request
```json
{
    "oldPassword": "string",
    "newPassword": "string",
    "refreshToken": "string"
}
```
- Respone
>[POST] register
- Request
```json
{
    "username": "username",
    "firstName": "first name",
    "lastName": "last name",
    "birthDate": "2023-02-09T01:18:02.135Z",
    "sex": "M",
    "address": "province, city, etc",
    "email": "username@email.com", // NULLABLE
    "phoneNumber": "+84....", // phone number in Vietnam, CHAR(12) NULLABLE
    "password": "password"
}
```
- Respone
```json
{
    "accessToken": "string",
    "refreshToken": "string"
}
```
>[POST] refresh
- Request
```json
{
    "refreshToken": "string"
}
```
- Respone
```json
{
    "message": "message"
}
```
>[POST] edit: JWT require
- Request
```json
{
    "username": "username",
    "firstName": "first name",
    "lastName": "last name",
    "birthDate": "2023-02-09T01:18:02.135Z",
    "sex": "M",
    "address": "province, city, etc",
    "email": "username@email.com", // NULLABLE
    "phoneNumber": "+84....", // phone number in Vietnam, CHAR(12) NULLABLE
}
```
- Respone
>[POST] upload
- Request: formData(file: yourImage) (accept: png, jpeg, jpg)
- Respone: HTTP status code
### Product routes: /api/products/
>[GET]
- Respone
```json
{
    "category": [
        {
            "productID": 1,
            "productName": "string",
            "supplier": "string",
            "category": "string",
            "price": 100000,
            "discount": null,
            "images": ["string"],
            "description": null
        }
    ]
}
```
>[GET] product?id=number
- Respone
```json
{
    "productID": 1,
    "productName": "string",
    "supplier": "string",
    "category": "string",
    "price": 100000,
    "discount": null,
    "images": ["string"],
    "description": null
}
```
>[GET] suppliers-categories
- Respone
```json
{
    "categories": [
        "category"
    ],
    "suppliers": [
        "supplier"
    ]
}
```
>[GET] search
- Request: query params
  - _name_ : product name
  - _option_ : less, more
  - _sortBy_: price, hot, top-sell
  - _sortMode_: asc, desc
  - _indexToStart_:

- Respone
  - _less_
  ```json
  [
    {
        "productID": 1,
        "productName": "string",
        "price": 100000,
        "discount": null,
        "images": ["string"],
    }
  ]
  ```
  - _more_
  ```json
  {
    "index": 5,
    "data": [
        {
            "productID": 1,
            "productName": "string",
            "supplier": "string",
            "category": "string",
            "price": 100000,
            "discount": null,
            "images": ["string"],
            "description": null
        }
    ]
  }
  ```
>[POST] add-product: JWT require (token admin)
- Request
  - form data: only send String so server gonna parse data type
  ```json
  {
    "productName": "string",
    "supplier": "string",
    "category": "string",
    "price": "100000",
    "quantity": "100",
    "description": ""
  }
  ```
  - images: accept: jpeg, jpg, png, =< 500kbs
- Respone
```json
{
    "productID": 1,
    "productName": "string",
    "supplier": "string",
    "category": "string",
    "price": 100000,
    "discount": null,
    "images": ["string"],
    "description": null
}
```