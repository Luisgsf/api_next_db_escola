// pages/index.tsx
import Link from 'next/link';

export default function Home() {
  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <h1>Bem-vindo à Escola</h1>
      <p>Selecione uma das opções abaixo para navegar:</p>
      <nav>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          <li style={{ margin: '20px' }}>
            <Link href="/cursos" style={{ fontSize: '20px', textDecoration: 'none' }}>
              Cursos
            </Link>
          </li>
          <li style={{ margin: '20px' }}>
            <Link href="/professores" style={{ fontSize: '20px', textDecoration: 'none' }}>
              Professores
            </Link>
          </li>
          <li style={{ margin: '20px' }}>
            <Link href="/alunos" style={{ fontSize: '20px', textDecoration: 'none' }}>
              Alunos
            </Link>
          </li>
          <li style={{ margin: '20px' }}>
            <Link href="/disciplinas" style={{ fontSize: '20px', textDecoration: 'none' }}>
              Disciplinas
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}