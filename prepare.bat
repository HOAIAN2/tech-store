@ECHO OFF
ECHO SERVER_PORT=4000 >> .\server\.env
ECHO CONNECTION_STRING="Your connection string" >> .\server\.env
ECHO ACCESS_TOKEN_SECRET="Your SECRET ACCESS TOKEN" >> .\server\.env
ECHO REFRESH_TOKEN_SERCET="Your REFRESH TOKEN SERCET" >> .\server\.env
CD server
CALL npm i
CD ..
CD client
CALL npm i