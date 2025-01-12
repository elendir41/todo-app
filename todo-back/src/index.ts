import express, { Request, Response } from 'express';
import { initDatabase } from './db';

import pool from './db';
import cors from 'cors';
// import dotenv from 'dotenv';

// dotenv.config();

initDatabase().then(() => {
  console.log('Database initialized.');
}).catch((error) => {
  console.error('Failed to initialize the database:', error);
});

const app = express();
const port = 3000;

app.use(express.json());

app.use(cors());

app.get('/todos', async (req: Request, res: Response) => {
  try {
    console.log("GET /todos")
    const result = await pool.query('SELECT * FROM todos');
    res.json(result.rows);
  } catch (err: any) {
    console.error(err.message);
    res.status(500).send('Erreur serveur');
  }
});

app.post('/todos', async (req: Request, res: Response) => {
  const { value } = req.body;
  try {
    console.log("POST /todos")
    const result = await pool.query(
      'INSERT INTO todos (value, checked) VALUES ($1, $2) RETURNING *',
      [value, false]
    );
    res.json(result.rows[0]);
  } catch (err: any) {
    console.error(err.message);
    res.status(500).send('Erreur serveur');
  }
});

app.put('/todos/:id', async (req: Request, res: Response) => {
  const id = req.params.id;
  const { checked } = req.body;
  try {
    const result = await pool.query(
      'UPDATE todos SET checked = $1 WHERE id = $2 RETURNING *',
      [checked, id]
    );
    res.json(result.rows[0]);
  } catch (err: any) {
    console.error(err.message);
    res.status(500).send('Erreur serveur');
  }
});

app.get('/', async (req: Request, res: Response) => {
  console.log("GET /")
  res.status(200).send('Serveur en cours d\'exécution');
});

app.listen(3000,'0.0.0.0', () => {
  console.log(`Serveur en cours d'exécution sur le port ${port}`);
});
