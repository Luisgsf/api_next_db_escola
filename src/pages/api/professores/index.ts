// pages/api/professores.ts
import { NextApiRequest, NextApiResponse } from 'next';
import pool from '../../../../lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const result = await pool.query(
        `SELECT id_professor, fk_id_titulo AS id_titulo, tx_nome, tx_sexo,
        tx_estado_civil, dt_nascimento, tx_telefone FROM professor 
        ORDER BY tx_nome ASC;`);
      return res.status(200).json(result.rows);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Erro ao buscar professores.' });
    }
  } else if (req.method === 'POST') {
    const { fk_id_titulo, tx_nome, tx_sexo, tx_estado_civil, dt_nascimento, tx_telefone } = req.body;
    try {
      const result = await pool.query(
        `INSERT INTO professor (fk_id_titulo, tx_nome, tx_sexo, tx_estado_civil, dt_nascimento, tx_telefone)
        VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
        [fk_id_titulo, tx_nome, tx_sexo, tx_estado_civil, dt_nascimento, tx_telefone]
      );
      return res.status(201).json(result.rows[0]);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Erro ao criar professor.' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    return res.status(405).end(`Método ${req.method} não permitido`);
  }
}