import React from 'react';

import { AuthProvider } from './authContext';
import { Router } from './Router';

const App = () => {

  return (
    <AuthProvider>
      <Router/>
    </AuthProvider>
  )
}

export default App;