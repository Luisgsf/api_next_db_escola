import { useEffect, useState } from 'react';
import axios from 'axios';

type Curso = {
  id_curso: number;
  tx_descricao: string;
};

export default function Cursos() {
  const [cursos, setCursos] = useState<Curso[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCursos = async () => {
      try {
        const response = await axios.get('/api/cursos');
        setCursos(response.data);
      } catch (error) {
        console.error('Erro ao buscar os cursos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCursos();
  }, []);

  if (loading) {
    return <p>Carregando cursos...</p>;
  }

  return (
    <div>
      <h1>Lista de Cursos</h1>
      <ul>
        {cursos.map(curso => (
          <li key={curso.id_curso}>{curso.tx_descricao}</li>
        ))}
      </ul>
    </div>
  );
}