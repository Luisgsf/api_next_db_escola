// pages/api/cursos/[id].ts
import { NextApiRequest, NextApiResponse } from 'next';
import pool from '../../../../lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (req.method === 'GET') {
    try {
      // Query para buscar todas as informações de um curso específico
      const result = await pool.query(
        `SELECT curso.id_curso, curso.tx_descricao AS tx_descricao,
	     tipo_curso.tx_descricao AS tipo_curso,
       instituicao.tx_descricao AS instituicao
       FROM curso
       JOIN tipo_curso ON curso.fk_id_tipo_curso = tipo_curso.id_tipo_curso
       JOIN instituicao ON curso.fk_id_instituicao = instituicao.id_instituicao
       WHERE curso.id_curso = $1;`,
        [id]
      );

      if (result.rows.length === 0) {
        return res.status(404).json({ message: 'Curso não encontrado.' });
      }

      return res.status(200).json(result.rows[0]);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Erro ao buscar informações do curso.' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    return res.status(405).end(`Método ${req.method} não permitido`);
  }
}
