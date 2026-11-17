import { Navigate } from "react-router-dom";
import { AuthProvider } from "./Admin/AuthContext";
import ProtectedRoute from "./Admin/ProtectedRoute";
import AdminLayout from "./Admin/AdminLayout";
import AdminDashboard from "./Admin/AdminDashboard";
import ManageEvents from "./Admin/ManageEvents";
import ManageGallery from "./Admin/ManageGallery";
import ManageNotices from "./Admin/ManageNotices";
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
      <Route path="/admin/login" element={<AdminLogin />} />
<Route element={<ProtectedRoute />}>
  <Route path="/admin" element={<AdminLayout />}>
    <Route index element={<AdminDashboard />} />
    <Route path="dashboard" element={<Navigate to="/admin" replace />} />
    <Route path="events" element={<ManageEvents />} />
    <Route path="gallery" element={<ManageGallery />} />
    <Route path="notices" element={<ManageNotices />} />
  </Route>
</Route>
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

<Route path="/admin/login" element={<AdminLogin />} />
<Route element={<ProtectedRoute />}>
  <Route path="/admin" element={<AdminLayout />}>
    <Route index element={<AdminDashboard />} />
    <Route path="dashboard" element={<Navigate to="/admin" replace />} />
    <Route path="events" element={<ManageEvents />} />
    <Route path="gallery" element={<ManageGallery />} />
    <Route path="notices" element={<ManageNotices />} />
  </Route>
</Route>
</Routes>
      <Footer/>
    </div>
    
  )
}

export default function AppWithAuth() { return <AuthProvider><App /></AuthProvider>; }




