import { useContext } from 'react';

import { NaverContext } from '../../contexts/naverContext';

import deleteIcon from '../../assets/icons/delete-Icon.svg';
import editIcon from '../../assets/icons/edit-Icon.svg';

import './styles.css';

interface NaverCardProps {
  id: string;
  name: string;
  image: string;
  office: string;
}

const NaverCard: React.FC<NaverCardProps> = ({ id, name, image, office }) => {
  const { 
    getNaverIdAndOpenNaverModal,
    getNaverIdAndGoToUpdatePage,
    getNaverIdAndOpenDeleteModal
  } = useContext(NaverContext);

  return (
    <div className="naverCard-container">
      <button 
        type="button" 
        onClick={() => getNaverIdAndOpenNaverModal(id)}
      >
        <img src={image} alt={name} />
      </button>

      <strong>{name}</strong>
      <p>{office}</p>
      
      <div>
        <button 
          type="button" 
          onClick={() => getNaverIdAndOpenDeleteModal(id)}
        >
          <img src={deleteIcon} alt="Deletar"/>
        </button>

        <button type="button" onClick={() => getNaverIdAndGoToUpdatePage(id)}>
          <img src={editIcon} alt="Editar"/>
        </button>
      </div>
    </div>
  );
}

export default NaverCard;