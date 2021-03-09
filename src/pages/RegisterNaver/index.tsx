import { useContext, useRef, useState } from 'react';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { Link } from 'react-router-dom';

import { NaverContext } from '../../contexts/naverContext';
import { useAuth } from '../../contexts/authContext';

import arrowLeft from '../../assets/icons/arrow-left.svg';

import Header from '../../components/Header';
import Input from '../../components/Input';
import Button from '../../components/Button';

import api from '../../services/api';

import './styles.css';

const UpdateNaver: React.FC = () => {
  const [name, setName] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [project, setProject] = useState('');
  const [jobRole, setJobRole] = useState('');
  const [admissionDate, setadmissionDate] = useState('');
  const [url, setUrl] = useState('');

  const [error, setError] = useState(false);

  const { token } = useAuth();
  const { naverCreated } = useContext(NaverContext)

  const formRef = useRef<FormHandles>(null);

  async function handleRegisterNaver() {
    const naver = {
      name,
      birthdate,
      project,
      job_role: jobRole,
      admission_date: admissionDate,
      url
    }

    try {
      await api.post(`navers`, naver, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then(naverCreated).catch(() => setError(true));   
    } catch (err) {
      setError(true);
      throw new Error(err);
    }
  }

  return (
    <>
      <Header />
      
      <div className="register-container" >
        <nav>
          <Link to="/home">
            <img src={arrowLeft} alt="Voltar para home"/> 
          </Link>  
          <h2>Adicionar Naver</h2>
        </nav>

        <Form ref={formRef} onSubmit={handleRegisterNaver} className="register-fields">
          <div className="register-left-fields">
            <Input 
              label="Nome"
              name="name"
              placeholder="Nome"
              value={name}
              onChange={event => setName(event.target.value)}
            />
            <Input 
              label="Data de aniversário"
              name="birthdate"
              placeholder="dd/mm/yyyy"
              value={birthdate}
              onChange={event => setBirthdate(event.target.value)}
            />
            <Input 
              label="Projetos que participou"
              name="project"
              placeholder="Projetos que participou"
              value={project}
              onChange={event => setProject(event.target.value)}
            />

            {error && 
              <p 
                className="field-error register-field-error-desktop"
              >
                Informar todos os dados. <br/><br/>
                Informe o formato de data aceitável. <br/> 
                Ex: DD/MM/YYYY
              </p>
            }
          </div>
          
          <div className="register-right-fields">
            <Input 
              label="Cargo"
              name="job_role"
              placeholder="Cargo"
              value={jobRole}
              onChange={event => setJobRole(event.target.value)}
            />
            <Input 
              label="Data de admissão"
              name="admission_date"
              placeholder="dd/mm/yyyy"
              value={admissionDate}
              onChange={event => setadmissionDate(event.target.value)}
            />
            <Input 
              label="URL da foto do Naver"
              name="naverPhoto"
              placeholder="URL da foto do Naver"
              value={url}
              onChange={event => setUrl(event.target.value)}
            />
            
            {error && 
              <p 
                className="field-error register-field-error-mobile"
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