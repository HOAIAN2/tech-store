# Tech-store
## Installation
* `git clone https://github.com/HOAIAN2/tech-store.git`
* `cd tech-store`
* Run `prepare.bat` to generate .env file and install libs for server and client.
## Build
* Run `build-product.bat` to build ReactJS and start server
## API
### Auth routes
* /api//auth/

| ROUTE          |      Input               | Output                         |
|----------------|--------------------------|--------------------------------|
| POST: /login   |```{username,password}``` |```{accessToken,refreshToken}```|
| POST: /logout  |```{refreshToken}```      |```{message}```                 |
| POST: /refresh |```{refreshToken}```      |```{accessToken,refreshToken}```|