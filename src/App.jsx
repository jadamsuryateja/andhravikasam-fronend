import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import JoinUs from './components/JoinUs';
import Projects from './components/Projects';
import Transparency from './components/Transparency';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ReportProblem from './components/ReportProblem';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ScrollToTop from './components/ScrollToTop';
import Donate from './components/Donate';

function App() {
  const [adminToken, setAdminToken] = useState(() => 
    sessionStorage.getItem('adminToken')
  );
  
  const [adminData, setAdminData] = useState(() => {
    const stored = sessionStorage.getItem('adminData');
    return stored ? JSON.parse(stored) : null;
  });

  const [isLoading, setIsLoading] = useState(true);

  // Protected Route Component
  const ProtectedRoute = ({ children }) => {
    if (!adminToken) {
      return <Navigate to="/admin/login" replace />;
    }
    return children;
  };

  const handleLogin = (data) => {
    sessionStorage.setItem('adminToken', data.token);
    sessionStorage.setItem('adminData', JSON.stringify(data.admin));
    setAdminToken(data.token);
    setAdminData(data.admin);
  };

  const handleLogout = () => {
    sessionStorage.removeItem('adminToken');
    setAdminToken(null);
    setAdminData(null);
  };

  return (
    <>
      <BrowserRouter>
        <ScrollToTop /> {/* Add this line */}
        <div className="min-h-screen bg-white">
          <Routes>
            {/* Admin Routes */}
            <Route path="/admin" element={
              <ProtectedRoute>
                <AdminDashboard admin={adminData} onLogout={handleLogout} />
              </ProtectedRoute>
            } />
            <Route path="/admin/login" element={
              adminToken ? <Navigate to="/admin" replace /> : <AdminLogin onLogin={handleLogin} />
            } />

            {/* Public Routes */}
            <Route path="/" element={
              <>
                <Header />
                <Hero />
                <Footer />
              </>
            } />
            <Route path="/about" element={
              <>
                <Header />
                <About />
                <Footer />
              </>
            } />
            <Route path="/join" element={
              <>
                <Header />
                <JoinUs />
                <Footer />
              </>
            } />
            <Route path="/projects" element={
              <>
                <Header />
                <Projects />
                <Footer />
              </>
            } />
            <Route path="/transparency" element={
              <>
                <Header />
                <Transparency />
                <Footer />
              </>
            } />
            <Route path="/contact" element={
              <>
                <Header />
                <Contact />
                <Footer />
              </>
            } />
            <Route path="/report" element={
              <>
                <Header />
                <ReportProblem />
                <Footer />
              </>
            } />
            <Route path="/donate" element={
              <>
                <Header />
                <Donate />
                <Footer />
              </>
            } />
          </Routes>
        </div>
      </BrowserRouter>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default App;
