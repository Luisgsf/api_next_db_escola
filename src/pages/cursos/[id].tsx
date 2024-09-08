import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

type Curso = {
  id_curso: number;
  tx_descricao: string;
  tipo_curso: string;
  instituicao: string;
};

type Disciplina = {
  id_disciplina: number;
  tx_sigla: string;
  tx_descricao: string;
  in_periodo: number;
  in_carga_horaria: number;
};

export default function Curso() {
  const router = useRouter();
  const { id } = router.query;
  const [curso, setCurso] = useState<Curso | null>(null);
  const [disciplinas, setDisciplinas] = useState<Disciplina[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      setLoading(true);
      setError(null);

      // Buscar informações do curso
      fetch(`/api/cursos/${id}`)
        .then((response) => {
          console.log('Response for curso:', response); // Log da resposta
          return response.json();
        })
        .then((data) => {
          console.log('Data for curso:', data); // Log dos dados recebidos
          if (data.message) {
            setError(data.message);
          } else {
            setCurso(data);
          }
        })
        .catch((err) => {
          console.error('Error fetching curso:', err); // Log de erro
          setError('Erro ao carregar o curso');
        })
        .finally(() => setLoading(false));

      // Buscar disciplinas relacionadas ao curso
      fetch(`/api/cursos/${id}/disciplinas`)
        .then((response) => {
          console.log('Response for disciplinas:', response); // Log da resposta
          return response.json();
        })
        .then((data) => {
          console.log('Data for disciplinas:', data); // Log dos dados recebidos
          if (data.message) {
            setError(data.message);
          } else {
            setDisciplinas(data);
          }
        })
        .catch((err) => {
          console.error('Error fetching disciplinas:', err); // Log de erro
          setError('Erro ao carregar disciplinas');
        });
    }
  }, [id]);

  if (loading) {
    return <p>Carregando...</p>;
  }

  if (error) {
    return <p>Erro: {error}</p>;
  }

  return (
    <div>
      {curso ? (
        <div>
          <h1>Curso: {curso.tx_descricao}</h1>
          <p><strong>Tipo de Curso:</strong> {curso.tipo_curso}</p>
          <p><strong>Instituição:</strong> {curso.instituicao}</p>
        </div>
      ) : (
        <p>Curso não encontrado.</p>
      )}

      <h2>Disciplinas</h2>
      {disciplinas.length > 0 ? (
        <ul>
          {disciplinas.map((disciplina) => (
            <li key={disciplina.id_disciplina}>
              {disciplina.tx_sigla} - {disciplina.tx_descricao} (Período: {disciplina.in_periodo}, Carga Horária: {disciplina.in_carga_horaria} horas)
            </li>
          ))}
        </ul>
      ) : (
        <p>Nenhuma disciplina encontrada.</p>
      )}
    </div>
  );
}