@ECHO OFF
CD client
CALL npm run build
XCOPY ".\build" "..\server\public" /h /i /c /k /e /r /y
CD ..
CD server
CALL node .