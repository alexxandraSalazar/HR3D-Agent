import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { HomePage } from '../pages/Home/HomePage';
import AuthPage from '../pages/AuthPage';
import NotFound from '../pages/notFound';
import { useAuthentication } from '../auth';
import RedirectGoogleAuth from '../components/GoogleRedirectHandler';
// import Login from '../pages/auth/Login';
// import Register from '../pages/auth/Register';
// import Dashboard from '../pages/Dashboard'; 
// import ProtectedRoute from '../auth/ProtectedRoute';

const AppRoutes = () => {
  const { isAuthorized } = useAuthentication();
  const ProtectedLogin = () => {
    return isAuthorized ? <Navigate to="/" /> : <AuthPage initialMethod='login'/>;
  }
  const ProtectedRegister = () => {
    return isAuthorized ? <Navigate to="/" /> : <AuthPage initialMethod='register'/>;
  }

  return (
    <Router>
      <Routes>
        <Route path="/login/callback" element={<RedirectGoogleAuth />}/>
        <Route path="/login" element={<ProtectedLogin />}/>
        <Route path="/register" element={<ProtectedRegister />}/>
        <Route path="/" element={<HomePage />} />
        <Route path="*" element={<NotFound />}/>
      </Routes>
    </Router>
  );
};

export default AppRoutes;
