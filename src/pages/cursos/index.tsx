import { useEffect, useState } from 'react';
import axios from 'axios';
import CursoList from '../../components/CursoList'; // Exibe apenas a lista de cursos
import Layout from '../../components/Layout';

const Cursos = () => {
  const [cursos, setCursos] = useState<any[]>([]);

  useEffect(() => {
    axios.get('/api/cursos')
      .then((response) => setCursos(response.data))
      .catch((error) => console.error('Erro ao buscar cursos:', error));
  }, []);

  return (
    <Layout>
      <CursoList cursos={cursos} /> {/* Exibe a lista de cursos */}
    </Layout>
  );
};

export default Cursos;