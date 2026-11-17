import React, { useEffect } from 'react';
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { LanguageProvider } from './i18n/LanguageContext';
import { CoreMvpQ304Page } from './pages/CoreMvpQ304Page';
import { HubPage } from './pages/HubPage';
import { PrototypeQ303Page } from './pages/PrototypeQ303Page';

const ScrollToTopOnRoute: React.FC = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

export const App: React.FC = () => {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <ScrollToTopOnRoute />
        <Routes>
          <Route path="/" element={<HubPage />} />
          <Route path="/q3-03" element={<PrototypeQ303Page />} />
          <Route path="/q3-04-core" element={<CoreMvpQ304Page />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </LanguageProvider>
  );
};
