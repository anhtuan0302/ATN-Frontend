import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminRoute from './routes/admin';
import IndexRoutes from './routes/index';
import { Navigate } from 'react-router-dom';

const App = () => {
  const userEmail = sessionStorage.getItem('userEmail');

  return (
    <Router>
      <Routes>
        { userEmail === 'admin@atn.com' ? (
          <Route path="/admin/*" element={<AdminRoute />} />
        ) : (
          <Route path="/admin/*" element={<Navigate to="/" />} />
        )}
        <Route path="/*" element={<IndexRoutes />} />
      </Routes>
    </Router>
  );
}

export default App;
