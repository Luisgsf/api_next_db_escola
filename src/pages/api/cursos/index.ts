// pages/api/cursos.ts
import { NextApiRequest, NextApiResponse } from 'next';
import pool from '../../../../lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      // Query para listar todos os cursos
      const result = await pool.query(
        `SELECT curso.id_curso, curso.tx_descricao AS tx_descricao, 
        tipo_curso.tx_descricao AS tipo_curso, 
        instituicao.tx_descricao AS instituicao 
        FROM curso
        JOIN tipo_curso ON curso.id_tipo_curso = tipo_curso.id_tipo_curso
        JOIN instituicao ON curso.id_instituicao = instituicao.id_instituicao
        ORDER BY tx_descricao ASC;`
      );

      return res.status(200).json(result.rows);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Erro ao buscar cursos.' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    return res.status(405).end(`Método ${req.method} não permitido`);
  }
}