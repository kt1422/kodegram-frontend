import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import { AuthContextProvider } from './components/context/AuthContext';
import { ChatContextProvider } from './components/context/ChatContext';
import reportWebVitals from './reportWebVitals';

ReactDOM.createRoot(document.getElementById('root')).render(
<AuthContextProvider>
  <ChatContextProvider>
    <>
      <App />
    </>
  </ChatContextProvider>
</AuthContextProvider>
);
reportWebVitals();