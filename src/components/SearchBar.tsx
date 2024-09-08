// components/SearchBar.tsx
import React from 'react';

interface SearchBarProps {
  idsCursos: string[];
  cursoId: string;
  setCursoId: (id: string) => void;
  onSearch: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ idsCursos, cursoId, setCursoId, onSearch }) => {
  return (
    <div style={{ marginBottom: '20px' }}>
      <h2>Buscar disciplinas por ID do curso</h2>
      <select
        value={cursoId}
        onChange={(e) => setCursoId(e.target.value)}
        style={{ fontSize: '16px', padding: '10px' }}
      >
        <option value="">Selecione um ID</option>
        {idsCursos.map((id) => (
          <option key={id} value={id}>{id}</option>
        ))}
      </select>
      <button onClick={onSearch} style={{ marginLeft: '10px' }}>Buscar Disciplinas</button>
    </div>
  );
};

export default SearchBar;