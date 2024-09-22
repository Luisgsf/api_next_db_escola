// pages/api/professores/[id].ts
import { NextApiRequest, NextApiResponse } from 'next';
import pool from '../../../../lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.query;

    if (req.method === 'GET') {
        try {
            const result = await pool.query(
                `SELECT id_professor, fk_id_titulo AS id_titulo, tx_nome, tx_sexo,
                tx_estado_civil, dt_nascimento, tx_telefone FROM professor
                WHERE id_professor = $1
                ORDER BY tx_nome ASC`,
                [id]);
            if (result.rows.length === 0) {
                return res.status(404).json({ message: 'Professor não encontrado.' });
            }
            return res.status(200).json(result.rows[0]);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Erro ao buscar professor.' });
        }
    } else if (req.method === 'PUT') {
        const { fk_id_titulo, tx_nome, tx_sexo, tx_estado_civil, dt_nascimento, tx_telefone } = req.body;
        try {
            const result = await pool.query(
                `UPDATE professor SET fk_id_titulo = $1, tx_nome = $2, tx_sexo = $3, 
        tx_estado_civil = $4, dt_nascimento = $5, tx_telefone = $6
        WHERE id_professor = $7 RETURNING *`,
                [fk_id_titulo, tx_nome, tx_sexo, tx_estado_civil, dt_nascimento, tx_telefone, id]
            );
            if (result.rows.length === 0) {
                return res.status(404).json({ message: 'Professor não encontrado.' });
            }
            return res.status(200).json(result.rows[0]);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Erro ao atualizar professor.' });
        }
    } else if (req.method === 'DELETE') {
        try {
            const result = await pool.query('DELETE FROM professor WHERE id_professor = $1 RETURNING *', [id]);
            if (result.rows.length === 0) {
                return res.status(404).json({ message: 'Professor não encontrado.' });
            }
            return res.status(204).end();
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Erro ao deletar professor.' });
        }
    } else {
        res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
        return res.status(405).end(`Método ${req.method} não permitido`);
    }
}