import React from 'react';

import { AuthProvider } from './authContext';
import { NaverProvider } from './naverContext';

const AppProvider: React.FC = ({ children }) => (
  <AuthProvider>
    <NaverProvider>
      {children}
    </NaverProvider>
  </AuthProvider>
)

export default AppProvider;