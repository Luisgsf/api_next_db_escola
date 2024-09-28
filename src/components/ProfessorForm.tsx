import React, { useEffect, useState } from 'react';
import styles from '../components/styles/ProfessorList.module.css';

interface Professor {
  tx_nome: string;
  tx_sexo: string;
  tx_estado_civil: string;
  dt_nascimento: string;
  tx_telefone: string;
}

interface ProfessorFormProps {
  professor: Professor | null;
  onSubmit: (data: Professor) => void;
}

const ProfessorForm: React.FC<ProfessorFormProps> = ({ professor, onSubmit }) => {
  const [data, setData] = useState<Professor>({
    tx_nome: '',
    tx_sexo: 'm',
    tx_estado_civil: 's',
    dt_nascimento: '',
    tx_telefone: '',
  });

  useEffect(() => {
    if (professor) {
      setData(professor);
    }
  }, [professor]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.formContainer}>
      {/* Grupo Nome e Sexo */}
      <div className={styles.formGroup}>
        <div className={styles.fieldGroup}>
          <label htmlFor="tx_nome">Nome:</label>
          <input name="tx_nome" value={data.tx_nome} onChange={handleChange} placeholder="Nome" required />
        </div>

        <div className={styles.fieldGroup}>
          <label htmlFor="tx_sexo">Sexo:</label>
          <select name="tx_sexo" value={data.tx_sexo} onChange={handleChange}>
            <option value="m">Masculino</option>
            <option value="f">Feminino</option>
          </select>
        </div>
      </div>

      {/* Grupo Estado Civil e Telefone */}
      <div className={styles.formGroup}>
        <div className={styles.fieldGroup}>
          <label htmlFor="tx_estado_civil">Estado Civil:</label>
          <select name="tx_estado_civil" value={data.tx_estado_civil} onChange={handleChange}>
            <option value="s">Solteiro(a)</option>
            <option value="c">Casado(a)</option>
            <option value="d">Divorciado(a)</option>
          </select>
        </div>

        <div className={styles.fieldGroup}>
          <label htmlFor="tx_telefone">Telefone:</label>
          <input name="tx_telefone" value={data.tx_telefone} onChange={handleChange} placeholder="Telefone" required />
          <span className={styles.telefoneHint}>(apenas números)</span>
        </div>
      </div>

      {/* Grupo Data de Nascimento e Botões */}
      <div className={styles.formGroup}>
        {professor && (
          <div className={styles.fieldGroup}>
            <label>Data de Nascimento (atual):</label>
            <input
              type="text"
              value={new Date(data.dt_nascimento).toLocaleDateString('pt-BR')}
              readOnly
              className={styles.readOnlyField}
            />
          </div>
        )}

        <div className={styles.fieldGroup}>
          <label htmlFor="dt_nascimento">Alterar Data de Nascimento:</label>
          <input
            type="date"
            name="dt_nascimento"
            value={data.dt_nascimento}
            onChange={handleChange}
            required
            style={{ width: '180px' }}
          />
        </div>
      </div>

      <div className={styles.buttonGroup}>
        <button type="submit" className={styles.saveButton}>
          <span className={styles.buttonIcon}>✔</span> Salvar
        </button>
        <button type="button" className={styles.cancelButton} onClick={() => window.close()}>
          <span className={styles.buttonIcon}>❌</span> Cancelar
        </button>
      </div>
    </form>
  );
};

export default ProfessorForm;