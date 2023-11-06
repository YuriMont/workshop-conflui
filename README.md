npm init -y

npm install -D typescript tsx

npm install @types/node typescript

"dev": "tsx watch src/server.ts"

"rootDir": "./src", 
"outDir": "./dist",   

npm install express cors

npm install -D @types/express @types/node @types/cors

npm install -D prisma

npm install @prisma/client

npx prisma init --datasource-provider sqlite

npx prisma migrate dev
