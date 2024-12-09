import { useState } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Footer from './components/Footer';
import Wedding from './pages/Wedding';
import Birthday from './pages/Birthday';
import BabyShower from './pages/BabyShower';
import Contact from './pages/Contact';
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import "bootstrap/dist/js/bootstrap.bundle.min"; // Optional: Bootstrap JS for functionality like modals or dropdowns

import SubNavbar from './components/SubNavbar';
import Navbar from './components/Navbar';
import Login from './login.singup/Login';
import Dashboard from './Dashboard/Dashboard';

function App() {
  const [count, setCount] = useState(0);

  return (
    <BrowserRouter>
      {/* Conditional rendering of Navbar and SubNavbar */}
      {window.location.pathname !== "/login" && window.location.pathname !== "/dashboard" && (
        <>
          <SubNavbar />
          <Navbar />
        </>
      )}
      
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/home' element={<Home />} />
        <Route path='/wedding' element={<Wedding />} />
        <Route path='/birthday' element={<Birthday />} />
        <Route path='/babyshower' element={<BabyShower />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/login' element={<Login />} />
        <Route path='/dashboard' element={<Dashboard />} />
      </Routes>

      {/* Only show Footer on pages other than Login and Dashboard */}
      {window.location.pathname !== "/login" && window.location.pathname !== "/dashboard" && <Footer />}
    </BrowserRouter>
  );
}

export default App;
