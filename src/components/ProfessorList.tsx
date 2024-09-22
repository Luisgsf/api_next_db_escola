import React from 'react';
import styles from './styles/ProfessorList.module.css';

type Professor = {
  id_professor: number;
  id_titulo: number;
  tx_nome: string;
  tx_sexo: string;
  tx_estado_civil: string;
  dt_nascimento: string;
  tx_telefone: string;
};

interface ProfessorListProps {
  professores: Professor[];
  onEdit: (professor: Professor) => void;
  onDelete: (id: number) => void;
}

const ProfessorList: React.FC<ProfessorListProps> = ({ professores, onEdit, onDelete }) => {
  const estadoCivilTraduzido = (estado: string) => {
    switch (estado) {
      case 's': return 'Solteiro(a)';
      case 'c': return 'Casado(a)';
      case 'd': return 'Divorciado(a)';
      default: return 'Desconhecido';
    }
  };

  return (
    <div className={styles.professorContainer}>
      <h2>Lista de Professores</h2>
      <table className={styles.dataGrid}>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Estado Civil</th>
            <th>Data de Nascimento</th>
            <th>Telefone</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {professores.map((professor) => (
            <tr key={professor.id_professor}>
              <td>{professor.tx_nome}</td>
              <td>{estadoCivilTraduzido(professor.tx_estado_civil)}</td>
              <td>{new Date(professor.dt_nascimento).toLocaleDateString('pt-BR')}</td>
              <td>{professor.tx_telefone}</td>
              <td>
                <button onClick={() => onEdit(professor)}>Editar</button>
                <button onClick={() => onDelete(professor.id_professor)}>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProfessorList;