import { useContext, useEffect, useRef, useState } from 'react';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { Link } from 'react-router-dom';

import { NaverData, NaverContext } from '../../contexts/naverContext';
import { useAuth } from '../../contexts/authContext';

import arrowLeft from '../../assets/icons/arrow-left.svg';

import Header from '../../components/Header';
import Input from '../../components/Input';
import Button from '../../components/Button';

import api from '../../services/api';

import './styles.css';

const UpdateNaver: React.FC = () => {
  const [naverData, setNaverData] = useState<NaverData>({} as NaverData)
  
  const [nameNaver, setName] = useState(naverData.name);
  const [projectNaver, setProjectNaver] = useState('');
  const [jobRole, setJobRole] = useState('');
  const [urlPhotoNaver, setUrlPhotoNaver] = useState('');
  const [admissionDate, setAdmissionDate] = useState('');
  const [birthdateNaver, setBirthdateNaver] = useState('');

  const [error, setError] = useState(false);

  const formRef = useRef<FormHandles>(null);
  
  const { naverId, openUpdatedNaverModal } = useContext(NaverContext);
  const { token } = useAuth();

  useEffect(() => {
    api.get(`navers/${naverId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(response => setNaverData(response.data));
  }, [naverId, token]);
  
  async function handleUpdateNaver() {
    const naver = {
      name: nameNaver,
      birthdate: birthdateNaver,
      admission_date: admissionDate,
      project: projectNaver,
      job_role: jobRole,
      url: urlPhotoNaver
    }

    try {
      await api.put(`navers/${naverId}`, naver, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      }).then(() => {
        openUpdatedNaverModal();
      }).catch(() => {
        setError(true);
      });
    } catch (err) {
      setError(true);

      throw new Error(err);
    }
  }

  return (
    <>
      <Header />
      
      <div className="update-container" >
        <nav>
          <Link to="/home">
            <img src={arrowLeft} alt="Voltar para home"/> 
          </Link>  
          <h2>Editar Naver</h2>
        </nav>

        <Form ref={formRef} onSubmit={handleUpdateNaver} className="update-fields">
          <div className="update-left-fields">
            <Input 
              label="Nome"
              name="name"
              placeholder={naverData.name}
              value={nameNaver}
              onChange={event => setName(event.target.value)}
            />
            <Input 
              label="Data de aniversário"
              name="birthdate"
              placeholder="dd/mm/yyyy"
              value={birthdateNaver}
              onChange={event => setBirthdateNaver(event.target.value)}
            />
            <Input 
              label="Projetos que participou"
              name="project"
              placeholder={naverData.project}
              value={projectNaver}
              onChange={event => setProjectNaver(event.target.value)}
            />

            {error && 
              <p 
                className="field-error update-field-error-desktop"
              >
                Informar todos os dados. <br/><br/>
                Informe o formato de data aceitável. <br/> 
                Ex: DD/MM/YYYY
              </p>
            }
          </div>
          
          <div className="update-right-fields">
            <Input 
              label="Cargo"
              name="job_role"
              placeholder={naverData.job_role}
              value={jobRole}
              onChange={event => setJobRole(event.target.value)}
            />
            <Input 
              label="Data de admissão"
              name="admission_date"
              placeholder="dd/mm/yyyy"
              value={admissionDate}
              onChange={event => setAdmissionDate(event.target.value)}
            />
            <Input 
              label="URL da foto do Naver"
              name="url"
              placeholder={naverData.url}
              value={urlPhotoNaver}
              onChange={event => setUrlPhotoNaver(event.target.value)}
            />

            {error && 
              <p 
                className="field-error update-field-error-mobile"
              >
                Informar todos os dados. <br/><br/>
                Informe o formato de data aceitável. <br/> 
                Ex: DD/MM/YYYY
              </p>
            }
            
            <Button type="submit">
              Salvar
            </Button>
          </div>
        </Form>
      </div>
    </>
  );
}

export default UpdateNaver;