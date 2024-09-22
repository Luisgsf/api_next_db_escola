import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Layout from '../../components/Layout';
import ProfessorList from '../../components/ProfessorList';
import { useRouter } from 'next/router';

const Professores: React.FC = () => {
  const [professores, setProfessores] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchProfessores = async () => {
      try {
        const response = await axios.get('/api/professores');
        setProfessores(response.data);
      } catch (error) {
        console.error('Erro ao buscar professores:', error);
      }
    };

    fetchProfessores();
  }, []);

  const handleDelete = async (id: number) => {
    await axios.delete(`/api/professores/${id}`);
    setProfessores(prev => prev.filter(prof => prof.id_professor !== id));
  };

  const handleEdit = (professor: any) => {
    router.push(`/professores/form?id=${professor.id_professor}`);
  };

  return (
    <Layout>
      <h1>Professores</h1>
      <Link href="/professores/form">
        <button>Adicionar Professor</button>
      </Link>
      <ProfessorList professores={professores} onEdit={handleEdit} onDelete={handleDelete} />
    </Layout>
  );
};

export default Professores;