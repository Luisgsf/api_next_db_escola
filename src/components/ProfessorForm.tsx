import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Professor {
  fk_id_titulo: string;
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
    fk_id_titulo: '',
    tx_nome: '',
    tx_sexo: 'm',
    tx_estado_civil: 's',
    dt_nascimento: '',
    tx_telefone: '',
  });
  const [titulos, setTitulos] = useState<{ id_titulo: string; tx_descricao: string }[]>([]);

  useEffect(() => {
    const fetchTitulos = async () => {
      const response = await axios.get('/api/titulos');
      setTitulos(response.data);
    };
    fetchTitulos();

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
    <form onSubmit={handleSubmit}>
      <select name="fk_id_titulo" value={data.fk_id_titulo} onChange={handleChange} required>
        <option value="">Selecione um Título</option>
        {titulos.map(titulo => (
          <option key={titulo.id_titulo} value={titulo.id_titulo}>{titulo.tx_descricao}</option>
        ))}
      </select>
      <input name="tx_nome" value={data.tx_nome} onChange={handleChange} placeholder="Nome" required />
      <select name="tx_sexo" value={data.tx_sexo} onChange={handleChange}>
        <option value="m">Masculino</option>
        <option value="f">Feminino</option>
      </select>
      <select name="tx_estado_civil" value={data.tx_estado_civil} onChange={handleChange}>
        <option value="s">Solteiro(a)</option>
        <option value="c">Casado(a)</option>
        <option value="d">Divorciado(a)</option>
      </select>
      <input type="date" name="dt_nascimento" value={data.dt_nascimento} onChange={handleChange} required />
      <input name="tx_telefone" value={data.tx_telefone} onChange={handleChange} placeholder="Telefone" required />
      <button type="submit">Salvar</button>
    </form>
  );
};

export default ProfessorForm;