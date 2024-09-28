import React from 'react';
import { FaEdit, FaTimes } from 'react-icons/fa';
import styles from './styles/ProfessorList.module.css';

type Professor = {
  id_professor: number;
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
                <div className={styles.buttonContainer}>
                  <button className={styles.saveButton} onClick={() => onEdit(professor)}>
                    <FaEdit /> Editar
                  </button>
                  <button className={styles.cancelButton} onClick={() => onDelete(professor.id_professor)}>
                    <FaTimes /> Excluir
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProfessorList;