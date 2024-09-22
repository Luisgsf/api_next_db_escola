import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Layout from '../../components/Layout';
import ProfessorForm from '../../components/ProfessorForm';

const ProfessorFormPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [professor, setProfessor] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (id) {
      setIsEditing(true);
      axios.get(`/api/professores/${id}`)
        .then(response => setProfessor(response.data))
        .catch(err => console.error('Erro ao buscar professor:', err));
    }
  }, [id]);

  const handleSubmit = async (data: any) => {
    if (isEditing) {
      await axios.put(`/api/professores/${id}`, data);
    } else {
      await axios.post('/api/professores', data);
    }
    // Redirecionar ou mostrar mensagem de sucesso
    router.push('/professores'); // Redireciona após a ação
  };

  return (
    <Layout>
      <h1>{isEditing ? 'Editar Professor' : 'Adicionar Professor'}</h1>
      <ProfessorForm professor={isEditing ? professor : null} onSubmit={handleSubmit} />
    </Layout>
  );
};

export default ProfessorFormPage;