import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import Signup from './components/Signup';
import Profile from './components/Profile';
import CaseManage from './components/CaseManage';
import DoctorDashboard from './components/DoctorDashboard';
import TechnicianDashboard from './components/TechnicianDashboard';
import AdminDashboard from './components/AdminDashboard';

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
      </Routes>
    </BrowserRouter>



  );
}

export default App;
