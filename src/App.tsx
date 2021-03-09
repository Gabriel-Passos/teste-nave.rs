import { BrowserRouter } from 'react-router-dom';

import Routes from './routes';

import AppProvider from './contexts';

import './styles/global.css';

function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <Routes />
      </AppProvider>
    </BrowserRouter>
  );
}

export default App;
