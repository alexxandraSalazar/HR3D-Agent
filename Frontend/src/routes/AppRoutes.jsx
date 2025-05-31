import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from '../pages/Home';
// import Login from '../pages/auth/Login';
// import Register from '../pages/auth/Register';
// import Dashboard from '../pages/Dashboard'; 
// import ProtectedRoute from '../auth/ProtectedRoute';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
