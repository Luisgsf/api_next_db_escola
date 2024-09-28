import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import Layout from '../../components/Layout';
import ProfessorList from '../../components/ProfessorList';
import styles from '../../components/styles/ProfessorList.module.css'
import { FaPlus } from 'react-icons/fa'; // Importando ícones

const Professores: React.FC = () => {
  const [professores, setProfessores] = useState<any[]>([]);

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
    window.open(`/professores/formPage?id=${professor.id_professor}`, '_blank');
  };

  return (
    <Layout>
      <h1>Professores</h1>
      <Link href="/professores/formPage" target="_blank" rel="noopener noreferrer">
        <button className={styles.saveButton}>
          <FaPlus /> Adicionar Professor
        </button>
      </Link>
      <ProfessorList
        professores={professores}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </Layout>
  );
};

export default Professores;