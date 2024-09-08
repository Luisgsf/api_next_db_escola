// components/DisciplinaList.tsx
import React from 'react';
import styles from './styles/DisciplinaList.module.css';

type Disciplina = {
  id_disciplina: number;
  tx_descricao: string;
};

interface DisciplinaListProps {
  disciplinas: Disciplina[];
  cursoId: string;
}

const DisciplinaList: React.FC<DisciplinaListProps> = ({ disciplinas, cursoId }) => {
  return (
    <div className={styles.disciplinaList}>
      <h3>Disciplinas do curso {cursoId}:</h3>
      {disciplinas.length > 0 ? (
        <ul>
          {disciplinas.map((disciplina) => (
            <li key={disciplina.id_disciplina}>{disciplina.tx_descricao}</li>
          ))}
        </ul>
      ) : (
        <p>Não há disciplinas para este curso.</p>
      )}
    </div>
  );
};

export default DisciplinaList;