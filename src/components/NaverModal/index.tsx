import { useContext, useEffect, useState } from 'react';
import moment from 'moment';

import { NaverData, NaverContext } from '../../contexts/naverContext';

import deleteIcon from '../../assets/icons/delete-Icon.svg';
import editIcon from '../../assets/icons/edit-Icon.svg';
import closeIcon from '../../assets/icons/close-icon.svg';

import './styles.css';

const NaverModal: React.FC<NaverData> = ({
  id,
  name, 
  admission_date,
  job_role,
  project,
  birthdate,
  url
}) => {
  const [age, setAge] = useState('');
  const [companyTime, setNaverCompanyTime] = useState('');

  const { 
    closeModal, 
    getNaverIdAndOpenDeleteModal,
    getNaverIdAndGoToUpdatePage,
  } = useContext(NaverContext);

  useEffect(() => {
    const [birthdateWithoutTime] = birthdate.split('T');
    const [BirthdateWithoutTimeAndHyphens] = [
      birthdateWithoutTime.replace(/-/g, ''),
    ];
    
    const naverAge = moment().diff(BirthdateWithoutTimeAndHyphens, 'years', false);
    
    setAge(String(naverAge));
  
    const [admissionDateWithoutTime] = admission_date.split('T');
    const [admissionDateWithoutTimeAndHyphens] = [
      admissionDateWithoutTime.replace(/-/g, ''),
    ];
    
    const naverCompanyTime = moment().diff(admissionDateWithoutTimeAndHyphens, 'days', false);

    setNaverCompanyTime(String(naverCompanyTime));
  }, [admission_date, birthdate]);
  

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <img src={url} alt={name}/>

        <button 
          type="button"
          className="btn-close-modal"
          onClick={closeModal}
        >
          <img src={closeIcon} alt="Fechar modal"/>
        </button>

        <div className="modal-info">
          <h2>{name}</h2>

          <span>{job_role}</span>

          <strong>Idade</strong>
          <p>{age} anos</p>

          <strong>Tempo de empresa</strong>
          <p>
            {Number(companyTime) === 1 && (
              Math.abs(Number(companyTime)) + ' dia'
            )}
            {Number(companyTime) > 1 && (
              Math.abs(Number(companyTime)) + ' dias'
            )}
            {Number(companyTime) === 0 && (
              'Iniciará em breve'
            )}
            {Number(companyTime) === -1 && (
              'Iniciará em ' + Math.abs(Number(companyTime)) + ' dia'
            )}
            {Number(companyTime) < -1 && (
              'Iniciará em ' + Math.abs(Number(companyTime)) + ' dias'
            )}
          </p>

          <strong>Projetos que participou</strong>
          <div className="naver-projects">
            <p>{project}</p>
          </div>

          <div className="modal-buttons">
            <button type="button" onClick={() => getNaverIdAndOpenDeleteModal(String(id))}>
              <img src={deleteIcon} alt="Deletar Naver"/>
            </button>

            <button type="button" onClick={() => getNaverIdAndGoToUpdatePage(String(id))}>
              <img src={editIcon} alt="Editar Naver"/>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NaverModal;