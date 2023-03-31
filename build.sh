#!/bin/sh
rm -rf ./server/public
cd client
(yarn build ) || (npm run build )
cp -r ./build ../server/public
cd ..
cd server
node .