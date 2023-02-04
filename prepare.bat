@ECHO OFF
DEL .\server\.env
ECHO SERVER_PORT=4000>>.\server\.env
ECHO DB_HOST="localhost">> .\server\.env
ECHO DB_PORT=3306>> .\server\.env
ECHO DB_USER="admin">> .\server\.env
ECHO DB_PASSWORD="password">> .\server\.env
ECHO DB_NAME="store">> .\server\.env
ECHO ACCESS_TOKEN_SECRET="Your SECRET ACCESS TOKEN">> .\server\.env
ECHO REFRESH_TOKEN_SERCET="Your REFRESH TOKEN SERCET">> .\server\.env
CD server
( CALL yarn install ) || ( CALL npm i )
CD ../client
( CALL yarn install)  || ( CALL npm i )