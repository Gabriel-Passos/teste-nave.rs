import { useAuth } from '../../contexts/authContext';

import logo from '../../assets/images/logo.png';

import './styles.css';

const Header:React.FC = () => {
  const { signOut } = useAuth();

  return (
    <header className="header-container">
      <img src={logo} alt="Logo"/>

      <button type="button" onClick={signOut}>Sair</button>
    </header>
  );
}

export default Header;