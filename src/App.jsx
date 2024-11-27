import { useState } from 'react'

import './App.css'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Footer from './components/Footer'
import Wedding from './pages/Wedding'
import Birthday from './pages/Birthday'
import BabyShower from './pages/BabyShower'
import Contact from './pages/Contact'
import Login from './components/Login';
import Dashboard from './components/Dashboard';

import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import "bootstrap/dist/js/bootstrap.bundle.min"; // Optional: Bootstrap JS for functionality like modals or dropdowns
import SubNavbar from './components/SubNavbar'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
         <SubNavbar/>
         <Navbar/>
         <Routes>
         <Route path="/login" element={<Login />} />
         <Route path="/dashboard" element={<Dashboard />} />
          <Route path='/' element={<Home/>}/>
          <Route path='/home' element={<Home/>}/>
          <Route path='/wedding' element={<Wedding/>}/>
          <Route path='/birthday' element={<Birthday/>}/>
          <Route path='/babyshower' element={<BabyShower/>}/>
          <Route path='/contact' element={<Contact/>}/>
         </Routes>
         <Footer/>
      </BrowserRouter>
    </>
  )
}

export default App
