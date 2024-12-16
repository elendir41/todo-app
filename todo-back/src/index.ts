import express, { Request, Response } from 'express';
import pool from './db';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(express.json());

app.use(cors());

app.get('/todos', async (req: Request, res: Response) => {
  try {
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

app.listen(3000,'0.0.0.0', () => {
  console.log(`Serveur en cours d'exécution sur le port ${port}`);
});
