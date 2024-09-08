// pages/api/cursos/[id]/disciplinas.ts
import { NextApiRequest, NextApiResponse } from 'next';
import pool from '../../../../../lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (req.method === 'GET') {
    try {
      // Query para listar disciplinas de um curso específico
      const result = await pool.query(
        `SELECT disciplina.id_disciplina, disciplina.tx_sigla AS "Sigla",
        disciplina.tx_descricao AS "Nome da Disciplina",
		    disciplina.in_periodo AS "Período", disciplina.in_carga_horaria AS "Carga Horária"
        FROM disciplina
        WHERE disciplina.id_curso = $1;`,
        [id]
      );

      if (result.rows.length === 0) {
        return res.status(404).json({ message: 'Nenhuma disciplina encontrada para esse curso.' });
      }

      return res.status(200).json(result.rows);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Erro ao buscar disciplinas.' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    return res.status(405).end(`Método ${req.method} não permitido`);
  }
}
