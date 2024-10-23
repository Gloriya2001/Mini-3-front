import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import Signup from './components/Signup';
import Profile from './components/Profile';
import CaseManage from './components/CaseManage';
import DoctorDashboard from './components/DoctorDashboard';
import TechnicianDashboard from './components/TechnicianDashboard';
import AdminDashboard from './components/AdminDashboard';
import AdminOrders from './components/AdminOrders';
import AdminNavbar from './components/AdminNavbar';
import TechNavbar from './components/TechNavbar';
import AddProduct from './components/AddProduct';
import ViewProduct from './components/ViewProduct';
import Navbar from './components/Navbar';

function App() {
  return (

    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/doctorDashboard' element={<DoctorDashboard />} />
        <Route path='/technicianDashboard' element={<TechnicianDashboard/>} />
        <Route path='/adminDashboard' element={<AdminDashboard />} />
         <Route path='/profile' element={<Profile/>} />
         <Route path='/casemanage' element={<CaseManage/>} />
         <Route path='/adminorders' element={<AdminOrders/>} />
         <Route path='/adminnavbar' element={<adminNavbar/>} />
         <Route path='/techNavbar' element={<TechNavbar/>} />
         <Route path='/Navbar' element={<Navbar/>} />
        
         <Route path='/addProduct' element={<AddProduct/>} />
         <Route path='/viewProduct' element={<ViewProduct/>} />
        
      </Routes>
    </BrowserRouter>



  );
}

export default App;
