import { useState, useEffect } from 'react';
import { BikeProvider } from './context/BikeContext';
import HomePage from './pages/HomePage';
import AdminLogin from './pages/AdminLogin';
import AdminPanel from './pages/AdminPanel';

type Page = 'home' | 'admin-login' | 'admin-panel';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash === '#/admin') {
        const auth = sessionStorage.getItem('admin_auth');
        if (auth === 'true') {
          setIsAuthenticated(true);
          setCurrentPage('admin-panel');
        } else {
          setCurrentPage('admin-login');
        }
      } else {
        setCurrentPage('home');
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
    setCurrentPage('admin-panel');
    window.location.hash = '#/admin';
  };

  const handleLogout = () => {
    sessionStorage.removeItem('admin_auth');
    setIsAuthenticated(false);
    setCurrentPage('home');
    window.location.hash = '';
  };

  return (
    <BikeProvider>
      {currentPage === 'home' && <HomePage />}
      {currentPage === 'admin-login' && <AdminLogin onLogin={handleLogin} />}
      {currentPage === 'admin-panel' && isAuthenticated && <AdminPanel onLogout={handleLogout} />}
    </BikeProvider>
  );
}

export default App;
