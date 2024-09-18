// components/DisciplinaList.tsx
import React from 'react';
import styles from './styles/DisciplinaList.module.css';

type Disciplina = {
  id_disciplina: number;
  tx_sigla: string;
  tx_descricao: string;
  in_periodo: number;
  in_carga_horaria: number;
};

interface DisciplinaListProps {
  disciplinas: Disciplina[];
  cursoId: string;
}

const DisciplinaList: React.FC<DisciplinaListProps> = ({ disciplinas, cursoId }) => {
  return (
    <div className={styles.disciplinaContainer}>
      <h2>Disciplinas do Curso {cursoId}</h2>
      <table className={styles.dataGrid}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Sigla</th>
            <th>Nome da Disciplina</th>
            <th>Período</th>
            <th>Carga Horária</th>
          </tr>
        </thead>
        <tbody>
          {disciplinas.map((disciplina) => (
            <tr key={disciplina.id_disciplina}>
              <td>{disciplina.id_disciplina}</td>
              <td>{disciplina.tx_sigla}</td>
              <td>{disciplina.tx_descricao}</td>
              <td>{disciplina.in_periodo}</td>
              <td>{disciplina.in_carga_horaria} horas</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DisciplinaList;