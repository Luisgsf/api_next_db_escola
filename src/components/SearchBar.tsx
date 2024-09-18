// components/SearchBar.tsx
import React from 'react';

interface SearchBarProps {
  cursos: { id_curso: string; tx_descricao: string }[]; // Cursos com ID e nome
  cursoId: string;
  setCursoId: (id: string) => void;
  onSearch: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ cursos, cursoId, setCursoId, onSearch }) => {
  return (
    <div>
      <select value={cursoId} onChange={(e) => setCursoId(e.target.value)}>
        <option value="">Selecione um curso</option>
        {cursos.map((curso) => (
          <option key={curso.id_curso} value={curso.id_curso}>
            {curso.tx_descricao}
          </option>
        ))}
      </select>
      <button onClick={onSearch} disabled={!cursoId}>
        Buscar Disciplinas
      </button>
    </div>
  );
};

export default SearchBar;