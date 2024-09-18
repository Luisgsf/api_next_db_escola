import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Layout from '../../components/Layout';
import DisciplinaList from '../../components/DisciplinaList';
import SearchBar from '../../components/SearchBar'; // Adicionando a barra de pesquisa para selecionar o curso

const Disciplinas = () => {
  const [cursoId, setCursoId] = useState<string>(''); // Estado para armazenar o curso selecionado
  const [disciplinas, setDisciplinas] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false); // Inicialmente, não carregando disciplinas
  const [cursos, setCursos] = useState<{ id_curso: string; tx_descricao: string }[]>([]); // Estado para armazenar os IDs dos cursos disponíveis

  // Função chamada quando o usuário seleciona um curso para buscar as disciplinas
  const handleSearchById = () => {
    if (cursoId) {
      setLoading(true);
      axios.get(`/api/cursos/${cursoId}/disciplinas`)
        .then((response) => {
          setDisciplinas(response.data);
          setError(null);
        })
        .catch(() => setError('Erro ao carregar disciplinas'))
        .finally(() => setLoading(false));
    }
  };

  // Carregar os IDs dos cursos disponíveis para o usuário selecionar
  useEffect(() => {
    axios.get('/api/cursos')
      .then((response) => setCursos(response.data))
      .catch((err) => console.error('Erro ao buscar cursos:', err));
  }, []);

  return (
    <Layout>
      <h1>Buscar Disciplinas por Curso</h1>

      {/* Barra de pesquisa para o usuário selecionar o curso */}
      <SearchBar
        cursos={cursos}
        cursoId={cursoId}
        setCursoId={setCursoId}
        onSearch={handleSearchById}
      />

      {/* Exibição das disciplinas após a seleção de um curso */}
      {loading ? (
        <p>Carregando...</p>
      ) : error ? (
        <p>Erro: {error}</p>
      ) : disciplinas.length > 0 ? (
        <DisciplinaList disciplinas={disciplinas} cursoId={cursoId} />
      ) : (
        <p>Selecione um curso para visualizar as disciplinas</p>
      )}
    </Layout>
  );
};

export default Disciplinas;