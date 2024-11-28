import { useState } from 'react'

import './App.css'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
// import Navbar from './components/Navbar'
import Home from './pages/Home'
import Footer from './components/Footer'
import Wedding from './pages/Wedding'
import Birthday from './pages/Birthday'
import BabyShower from './pages/BabyShower'
import Contact from './pages/Contact'


import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import "bootstrap/dist/js/bootstrap.bundle.min"; // Optional: Bootstrap JS for functionality like modals or dropdowns
// <<<<<<< HEAD
// import CustomNavbar from './components/CustomNAvbar'
import TopNavbar from './components/TopNavbar'
// import MainNavbar from './components/MainNavbar'


// =======
// import SubNavbar from './components/SubNavbar'
import Login from './components/Admin/Login'
import Dashboard from './components/Admin/Dashboard'
import AddVideoForm from './components/Admin/AddVideoForm'
// >>>>>>> f55c6b60cba34c3cf25162850263704cf6984adc
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
     {/* <CustomNavbar/> */}
     <TopNavbar/>
     {/* <MainNavbar/> */}
         <Routes>
           <Route path='/login' element={<Login/>}/>
           <Route path='/dashbord' element={<Dashboard/>}/>
           <Route path='/addvideo' element={<AddVideoForm/>}/>
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
