# Tech-store
## Installation
* `git clone https://github.com/HOAIAN2/tech-store.git`
* `cd tech-store`
* Run `prepare.bat` to generate .env file and install libs for server and client.
* `npm start`
## Build
* Run `build.bat` to build ReactJS and start server
## API
### Auth routes: /api/auth/
[POST] login
* Request
```json
{
    "username": "username",
    "password": "password"
}
```
* Respone
```json
{
    "accessToken": "string",
    "refreshToken": "string"
}
```
[POST] logout
* Request
```json
{
    "refreshToken": "string"
}
```
* Respone
```json
{
    "message": "message"
}
```
[POST] register
* Request
```json
{
    "username": "username",
    "firstName": "first name",
    "lastName": "last name",
    "email": "username@email.com",
    "phoneNumber": "+84....", // phone number in Vietnam
    "address": "province, city, etc",
    "password": "password"
}
```
* Respone
```json
{
    "message": "message"
}
```
[POST] refresh
* Request
```json
{
    "refreshToken": "string"
}
```
* Respone
```json
{
    "message": "message"
}
```