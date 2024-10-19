# Database

Postgresql database. See database/init.sql for schema

## Init

`psql -U postgres -f init.sql`

# Backend
Express backend in typescript
```
GET /todos => get all todos
POST /todos => create a todo
PUT /todos/:id => check or uncheck a todo
```

## Config
Create a `.env` file at the root of `todo-back/` with those variables
```
PORT=3000
POSTGRES_USER=postgres
POSTGRES_PASSWORD="postgres"
POSTGRES_DB=todo_db
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
```

## Init
`cd todo-back`

`npm install`

## Start
`npx ts-node src/index.ts`

# Frontend
React app built with vite

## Config
Create a `.env` file at the root of `todo-front/` with those variables
```
VITE_BACKEND_URL=http://localhost:3000
```

## Init
```
cd todo-front
npm install
```

## Start
For developement:

`npm run dev`


For production:

`npm run build`

`npm run preview` to test or publish `dist/` folder
