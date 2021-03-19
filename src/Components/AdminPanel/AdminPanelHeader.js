import React from 'react';
import AdminPanelHeaderNav from '../AdminPanel/AdminPanelHeaderNav';
import styles from './AdminPanelHeader.module.css';
import { useLocation } from 'react-router-dom';

const AdminPanelHeader = () => {
  const [title, setTitle] = React.useState('');
  const location = useLocation();

  React.useEffect(() => {
    const { pathname } = location;
    switch (pathname) {
      case '/conta/users':
        setTitle('Usuários');
        break;
        case '/conta/activities':
          setTitle('Atividades');
          break;
      default:
        setTitle('Painel');
    }
  }, [location]);

  return (
    <header className={styles.header}>
      <h1 className="title">{title}</h1>
      <AdminPanelHeaderNav />
    </header>
  );
};

export default AdminPanelHeader;
