import { createContext, useState } from "react";
import { useHistory } from "react-router";

import { useAuth } from "./authContext";

import NaverModal from '../components/NaverModal';
import InfoModal from '../components/InfoModal';

import api from "../services/api";

export interface NaverData {
  id?: string;
  name: string;
  admission_date: string;
  job_role: string;
  project: string;
  birthdate: string;
  url: string;
}

interface NaverContextData {
  naverId: string;
  closeModal: () => void;
  naverCreated: () => void;
  getNaverIdAndOpenDeleteModal: (id: string) => void;
  getNaverIdAndGoToUpdatePage: (id: string) => void;
  openUpdatedNaverModal: () => void;
  getNaverIdAndOpenNaverModal: (id: string) => void;
  handleDeleteNaver: () => void;
}

export const NaverContext = createContext({} as NaverContextData);

export const NaverProvider: React.FC = ({ children }) => {
  const [naverId, setNaverId] = useState('');
  const [naverData, setNaverData] = useState<NaverData>({} as NaverData);

  const [isNaverModalOpen, setIsNaverModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [successfullyCreatedModal, setSuccessfullyCreatedModal] = useState(false);
  const [successfullyDeletedModal, setSuccessfullyDeletedModal] = useState(false);
  const [successfullyUpdatedModal, setSuccessfullyUpdatedModal] = useState(false);

  const { token } = useAuth();

  const history = useHistory();

  function closeModal() {
    setIsNaverModalOpen(false);
    setIsDeleteModalOpen(false);
    setSuccessfullyDeletedModal(false);
    setSuccessfullyUpdatedModal(false);
    setSuccessfullyCreatedModal(false);
  }

  function naverCreated() {
    setSuccessfullyCreatedModal(true);

    history.push('/home');
  }

  async function getNaverIdAndOpenNaverModal (id: string) {
    await api.get(`navers/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    }).then(response => setNaverData(response.data));
    
    setIsNaverModalOpen(true);
  };
  
  function getNaverIdAndGoToUpdatePage(id: string) {
    setNaverId(id);
    setIsNaverModalOpen(false);

    history.push('/update');
  }

  function openUpdatedNaverModal() {
    setSuccessfullyUpdatedModal(true);

    history.push('/home');
  }

  function getNaverIdAndOpenDeleteModal(id: string) {
    setNaverId(id);

    setIsDeleteModalOpen(true);
  }

  async function handleDeleteNaver() {
    setIsDeleteModalOpen(false);

    await api.delete(`navers/${naverId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });
    
    setSuccessfullyDeletedModal(true);
  }

  return (
    <NaverContext.Provider value={{
      naverId,
      closeModal,
      naverCreated,
      getNaverIdAndOpenDeleteModal,
      getNaverIdAndGoToUpdatePage,
      openUpdatedNaverModal,
      getNaverIdAndOpenNaverModal,
      handleDeleteNaver,
    }}>
      {children}

      {isNaverModalOpen &&
        <NaverModal
          id={naverData.id}
          name={naverData.name}
          admission_date={naverData.admission_date}
          job_role={naverData.job_role}
          birthdate={naverData.birthdate}
          project={naverData.project}
          url={naverData.url}
        />
      }

      {successfullyCreatedModal && 
        <InfoModal 
          modalTitle="Naver criado"
          modalInfo="Naver criado com sucesso!"
        />
      }

      {isDeleteModalOpen && 
        <InfoModal 
          deleteButtons
          modalTitle="Excluir Naver"
          modalInfo="Tem certeza que deseja excluir este Naver?"
        />
      }

      {successfullyDeletedModal && 
        <InfoModal 
          modalTitle="Naver excluído"
          modalInfo="Naver excluído com sucesso!"
        />
      }

      {successfullyUpdatedModal && 
        <InfoModal 
          modalTitle="Naver atualizado"
          modalInfo="Naver atualizado com sucesso!"
        />
      }
    </NaverContext.Provider>
  );
}