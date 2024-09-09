import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styles from '../../components/styles/CursoList.module.css';  // Estilos customizados

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
  console.log("Testando Descrição: ", curso?.tx_descricao);

  useEffect(() => {
    if (id) {
      setLoading(true);
      setError(null);

      // Buscar informações do curso
      fetch(`/api/cursos/${id}`)
        .then((response) => response.json())
        .then((data) => {
          console.log("Curso data:", data); // Verifique o conteúdo
          if (data.message) {
            setError(data.message);
          } else {
            setCurso(data);
          }
        })
        .catch(() => setError('Erro ao carregar o curso'))
        .finally(() => setLoading(false));

      // Buscar disciplinas relacionadas ao curso
      fetch(`/api/cursos/${id}/disciplinas`)
        .then((response) => response.json())
        .then((data) => {
          console.log("Disciplinas data:", data); // Verifique o conteúdo
          if (data.message) {
            setError(data.message);
          } else {
            setDisciplinas(data);
          }
        })
        .catch(() => setError('Erro ao carregar disciplinas'));
    }
  }, [id]);

  if (loading) {
    return <p>Carregando...</p>;
  }

  if (error) {
    return <p>Erro: {error}</p>;
  }

  return (
    <div className={styles.container}>
      {curso ? (
        <div className={styles.cursoInfo}>
          <h1>Curso: {curso.tx_descricao}</h1>
          <div className={styles.courseDetails}>
            <label><strong>Tipo de Curso:</strong></label>
            <p>{curso.tipo_curso}</p>
          </div>
          <div className={styles.courseDetails}>
            <label><strong>Instituição:</strong></label>
            <p>{curso.instituicao}</p>
          </div>
        </div>
      ) : (
        <p>Curso não encontrado.</p>
      )}

      <h2>Disciplinas</h2>
      {disciplinas.length > 0 ? (
        <div className={styles.disciplinasGrid}>
          {disciplinas.map((disciplina) => (
            <div key={disciplina.id_disciplina} className={styles.disciplinaCard}>
              <h3>{disciplina.tx_sigla}</h3>
              <p>{disciplina.tx_descricao}</p>
              <p><strong>Período:</strong> {disciplina.in_periodo}</p>
              <p><strong>Carga Horária:</strong> {disciplina.in_carga_horaria} horas</p>
            </div>
          ))}
        </div>
      ) : (
        <p>Nenhuma disciplina encontrada.</p>
      )}
    </div>
  );
}