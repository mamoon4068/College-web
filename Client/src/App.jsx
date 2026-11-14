import React from 'react'
import {  Routes, Route } from "react-router-dom"
import TickerBar from "./component/TickerBar";
import Navbar from './component/Navbar';
import Hero from './Pages/Hero';
import Footer from './component/Footer'; 
import AboutUs from './Pages/AboutUS';
import AuthoritiesPage from './Pages/AuthoritiesPage';
import Admission from './Pages/admmisson';
import FeesPage from './Pages/FeePage';
import GalleryPage from './Pages/GalleryPage';
import Academics from './Pages/Acedmics';
import ContactSection from './Pages/Contect';
import StudentLogin from "./Pages/StudentLogin";
import StaffLogin from "./Pages/StaffLogin";
import AdminLogin from "./Pages/AdminLogin";
const App = () => {
  return (
     
    <div>
     
      <TickerBar />
      <Navbar />
      
      {/* <Routes>
      <Route path='/hero' element={<Hero />} />
      <Route path="/about" element={<AboutUs/>} />
      </Routes> */}

      <Routes>
  <Route path="/" element={<Hero />} />
  <Route path="/about" element={<AboutUs />} />
  <Route path="/AuthoritiesPage" element={<AuthoritiesPage/>} />
  <Route path="/Admmisson" element={<Admission/>} />
  <Route path="/fees" element={<FeesPage />} />
  <Route path="/gallerypage" element={<GalleryPage />} />
  <Route path="/academics" element={<Academics />} />
  <Route path="/contact" element={<ContactSection />} />
  <Route path="/student-login" element={<StudentLogin />} />

<Route path="/staff-login" element={<StaffLogin />} />
<Route path="/adminlogin" element={<AdminLogin/>} />

</Routes>
      <Footer/>
    </div>
    
  )
}

export default App




