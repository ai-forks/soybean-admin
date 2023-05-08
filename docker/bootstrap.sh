#!/bin/bash

source /etc/profile
cd /app

#npm install

pm2 stop server && pm2 delete server
pm2 flush
pm2 start /app/server.js --name server \
  --max-memory-restart 300M \
  --cron-restart="0 3 * * *"\ --  
  VITE_SERVICE_ENV=prod VITE_SSR=Y NODE_ENV=production 
  API_SERVER "https://www.demo.com"
  --port 80

pm2 log
