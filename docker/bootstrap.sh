#!/bin/bash

source /etc/profile
cd /app

#npm install

pm2 stop server && pm2 delete server
pm2 flush
pm2 start /app/server.js --name server --max-memory-restart 500M --cron-restart="0 3 * * *"  

pm2 log
