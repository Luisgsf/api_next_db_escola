// src/pages/api/titulos.ts

import { NextApiRequest, NextApiResponse } from 'next';
import db from '../../../../lib/db'; // ajuste conforme sua estrutura

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const result = await db.query('SELECT * FROM titulo');
      res.status(200).json(result.rows);
    } catch (error) {
      console.error('Erro ao buscar títulos:', error);
      res.status(500).json({ message: 'Erro ao buscar títulos' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}