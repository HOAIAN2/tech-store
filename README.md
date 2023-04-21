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
![](/database/Store%20Database%20Diagram.png)
## API
### User routes: /api/user/
>[GET] /: JWT require
- Response
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
- Response
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
- Response
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
- Response
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
- Response
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
- Response
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
- Response
>[POST] upload
- Request: formData(file: yourImage) (accept: png, jpeg, jpg)
- Response: HTTP status code
### Product routes: /api/products/
>[GET]
- Response
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
- Response
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
- Response
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
- Response
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
>[GET] search-more
  - _more_
  - _sortBy_: price, hot, top-sell
  - _star_: 1->5
  - _brand_
  - _address_
  - _sortMode_: asc, desc
  - _indexToStart_:
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
  - images "files": accept: jpeg, jpg, png, =< 500kbs
- Response
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
### Order routes: /api/order/
>[POST] create-order: JWT require
- Request
- Response
```json
{
    "orderID": 1,
    "userID": 1,
    "orderDate": null,
    "paidMethod": null,
    "paid": 0,
    "products": [],
    "total": 0,
    "voucher": null
}
```
>[POST] add-product, update-product, remove-product (Same input output) JWT require
- Request
```json
{
    "productID": 1,
    "quantity": 2
}
```
- Response
```json
{
    "orderID": 1,
    "userID": 1,
    "orderDate": null,
    "paidMethod": null,
    "paid": 0,
    "products": [
        {
            "productID": 3,
            "productName": "Laptop Lenovo IdeaPad Gaming 3 15IHU6 82K100FBVN (Core i7-11370H/8GB RAM/512GB SSD/15.6-in - Hàng chính hãng",
            "quantity": 6
        },
        {
            "productID": 4,
            "productName": "Laptop Acer Nitro 5 AN515-45-R6EV R5-5600H |8GB|512GB|GTX 1650 4GB|156 FHD 144Hz|Win 11 Hàng chính hãng",
            "quantity": 3
        },
        {
            "productID": 7,
            "productName": "Laptop Lenovo Legion 5 15IAH7 82RC003WVN |i5-12500H|8GB|512GB|RTX 3050 Ti|Win11- Hàng chính hãng",
            "quantity": 3
        }
    ],
    "total": 0,
    "voucher": null
}
```
>[POST] make-payment: JWT require
- Request
```json
{
    "paymentMethod": 1
}
```
- Response
```json
{
    "orderID": 1,
    "userID": 1,
    "orderDate": "2023-04-21T11:28:22.000Z",
    "paidMethod": "Electronic bank transfers",
    "paid": true,
    "products": [
        {
            "productID": 4,
            "productName": "Laptop Acer Nitro 5 AN515-45-R6EV R5-5600H |8GB|512GB|GTX 1650 4GB|156 FHD 144Hz|Win 11 Hàng chính hãng",
            "quantity": 3,
            "price": 18790000,
            "discount": null
        },
        {
            "productID": 7,
            "productName": "Laptop Lenovo Legion 5 15IAH7 82RC003WVN |i5-12500H|8GB|512GB|RTX 3050 Ti|Win11- Hàng chính hãng",
            "quantity": 3,
            "price": 32150400,
            "discount": null
        }
    ],
    "total": 152821200,
    "voucher": null
}
```
>[POST] set-voucher JWT require
- Request
```json
{
    "voucherID": "string"
}
```
- Response
```json
{
    "orderID": 1,
    "userID": 1,
    "orderDate": null,
    "paidMethod": null,
    "paid": 0,
    "products": [
        {
            "productID": 3,
            "productName": "Laptop Lenovo IdeaPad Gaming 3 15IHU6 82K100FBVN (Core i7-11370H/8GB RAM/512GB SSD/15.6-in - Hàng chính hãng",
            "quantity": 6
        },
        {
            "productID": 4,
            "productName": "Laptop Acer Nitro 5 AN515-45-R6EV R5-5600H |8GB|512GB|GTX 1650 4GB|156 FHD 144Hz|Win 11 Hàng chính hãng",
            "quantity": 3
        },
        {
            "productID": 7,
            "productName": "Laptop Lenovo Legion 5 15IAH7 82RC003WVN |i5-12500H|8GB|512GB|RTX 3050 Ti|Win11- Hàng chính hãng",
            "quantity": 3
        }
    ],
    "total": 0,
    "voucher": {
        "voucherID": "string",
        "voucherName": "string",
        "voucherDiscount": 0.2,
        "expiryDate": "date time",
        "description": "date"
    }
}
```