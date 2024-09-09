// pages/cursos/index.tsx
import { useEffect, useState } from 'react';
import CursoList from '../../components/CursoList';
import DisciplinaList from '../../components/DisciplinaList';
import SearchBar from '../../components/SearchBar';
import Layout from '../../components/Layout';

const Cursos = () => {
  const [cursos, setCursos] = useState([]);
  const [cursoId, setCursoId] = useState('');
  const [disciplinas, setDisciplinas] = useState([]);
  const [idsCursos, setIdsCursos] = useState<string[]>([]);

  useEffect(() => {
    fetch('/api/cursos')
      .then((res) => res.json())
      .then((data) => {
        setCursos(data);
        setIdsCursos(data.map((curso: any) => curso.id_curso));
      })
      .catch((err) => console.error('Erro ao buscar cursos:', err));
  }, []);

  const handleSearchById = () => {
    if (cursoId) {
      fetch(`/api/cursos/${cursoId}/disciplinas`)
        .then((res) => res.json())
        .then((data) => setDisciplinas(data))
        .catch((err) => console.error('Erro ao buscar disciplinas:', err));
    }
  };

  return (
    <Layout>
      <CursoList cursos={cursos} />
      <SearchBar
        idsCursos={idsCursos}
        cursoId={cursoId}
        setCursoId={setCursoId}
        onSearch={handleSearchById}
      />
      <DisciplinaList disciplinas={disciplinas} cursoId={cursoId} />
    </Layout>
  );
};

export default Cursos;