import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { useAuth } from '../../contexts/authContext';

import Header from '../../components/Header';
import Button from '../../components/Button';
import NaverCard from '../../components/NaverCard';

import api from '../../services/api';

import './styles.css';

interface NaversData {
  id: string;
  name: string;
  admission_date: string;
  job_role: string;
  project: string;
  birthdate: string;
  url: string;
}

const Home:React.FC = () => {
  const [naversData, setNaversData] = useState<NaversData[]>([]);
  const { token } = useAuth();

  const history = useHistory();

  function handleRegisterNaver() {
    history.push('/register');
  }

  useEffect(() => {
    api.get('navers', {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    }).then(response => setNaversData(response.data));
  }, [token]);

  return (
    <>
      <Header />

      <main className="home-container">
        <div className="home-header">
          <h2>Navers</h2>

          <Button onClick={handleRegisterNaver}>
            Adicionar Naver
          </Button>
        </div>

        <section>
          {naversData.map(item => (
            <NaverCard
              key={item.id}
              id={item.id}
              image={item.url}
              name={item.name}
              office={item.job_role}
            />
          ))}
        </section>
      </main>
    </>
  );
}

export default Home;