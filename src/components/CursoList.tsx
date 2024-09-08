// components/CursoList.tsx
import React from 'react';
import Link from 'next/link';
import styles from './styles/CursoList.module.css';

type Curso = {
  id_curso: number;
  tx_descricao: string;
  tipo_curso: string;
  instituicao: string;
};

interface CursoListProps {
  cursos: Curso[];
}

const CursoList: React.FC<CursoListProps> = ({ cursos }) => {
  return (
    <div className={styles.cursoList}>
      <h2>Lista de Cursos</h2>
      <ul className={styles.list}>
        {cursos.map((curso) => (
          <li key={curso.id_curso} className={styles.cursoItem}>
            <h3>{curso.tx_descricao}</h3>
            <p><strong>Tipo de Curso:</strong> {curso.tipo_curso}</p>
            <p><strong>Instituição:</strong> {curso.instituicao}</p>
            <Link href={`/cursos/${curso.id_curso}`} className={styles.detailsLink}>
              Ver mais detalhes
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CursoList;