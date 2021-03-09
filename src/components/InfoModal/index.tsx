import { useContext } from 'react';
import closeIcon from '../../assets/icons/close-icon.svg';
import { NaverContext } from '../../contexts/naverContext';

import Button from '../Button';

import './styles.css';

interface InfoModalProps {
  modalTitle: string;
  modalInfo: string;
  deleteButtons?: boolean;
}

const InfoModal: React.FC<InfoModalProps> = ({ 
  modalTitle, 
  modalInfo, 
  deleteButtons 
}) => {
  const { closeModal, handleDeleteNaver } = useContext(NaverContext);
  
  return (
    <div className="modal-overlay">
      <div className="info-modal-container">
        <h2>{modalTitle}</h2>

        <p>{modalInfo}</p>

        {deleteButtons ? (
          <div>
            <Button onClick={closeModal}>
              Cancelar
            </Button>

            <Button onClick={handleDeleteNaver}>
              Excluir
            </Button>
          </div>
        ) : (
          <button 
            type="button"
            onClick={closeModal} 
            className="btn-close-info-modal"
          >
            <img src={closeIcon} alt="Fechar modal"/>
          </button>
        )}
      </div>
    </div>
  );
}

export default InfoModal;