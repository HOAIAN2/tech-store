@ECHO OFF
RMDIR /s /q .\server\public
CD client
CALL npm run build.
XCOPY ".\build" "..\server\public" /h /i /c /k /e /r /y
CD ..
CD server
CALL node .