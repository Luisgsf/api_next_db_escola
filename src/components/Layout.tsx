// components/Layout.tsx
import React from 'react';
import styles from './styles/Layout.module.css';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Bem-vindo à Escola</h1>
      </header>
      <main className={styles.main}>{children}</main>
      <footer className={styles.footer}>
        <p>&copy; 2024 Escola</p>
      </footer>
    </div>
  );
};

export default Layout;