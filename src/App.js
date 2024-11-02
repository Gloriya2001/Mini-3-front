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
import OrdersofDoctors from './components/OrdersofDoctors';
import ViewTech from './components/ViewTech';
import ViewDoctor from './components/ViewDoctor';
import ProductPrize from './components/ProductPrize';
import TechWorks from './components/TechWorks';
import SidebarD from './components/SidebarD';
import Pending from './components/Pending';
import Placed from './components/Placed';
import InProgress from './components/InProgress';
import Delivered from './components/Delivered';
import Cancelled from './components/Cancelled';
import Return from './components/Return';
import OrderSubmission from './components/OrderSubmission';
import AdminAsign from './components/AdminAsign';
import Payment from './components/Payment';
import AdminCompleted from './components/AdminCompleted';
import AdminCancelled from './components/AdminCancelled';
import TechInProgress from './components/TechInProgress';
import TechCompleted from './components/TechCompleted';



function App() {
  return (

    <BrowserRouter>
      <Routes>

        <Route path='/' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/doctorDashboard' element={<DoctorDashboard />} />
        <Route path='/technicianDashboard' element={<TechnicianDashboard />} />
        <Route path='/adminDashboard' element={<AdminDashboard />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/casemanage' element={<CaseManage />} />
        <Route path='/adminorders' element={<AdminOrders />} />
        <Route path='/adminnavbar' element={<AdminNavbar />} />
        <Route path='/techNavbar' element={<TechNavbar />} />
        <Route path='/Navbar' element={<Navbar />} />

        <Route path='/addProduct' element={<AddProduct />} />
        <Route path='/viewProduct' element={<ViewProduct />} />
        <Route path='/doctororders' element={<OrdersofDoctors />} />
        <Route path='/viewTech' element={<ViewTech />} />
        <Route path='/viewDoctor' element={<ViewDoctor />} />
        <Route path='/productPrize' element={<ProductPrize />} />
        <Route path='/techWorks' element={<TechWorks />} />


        <Route path='/sidebarD' element={<SidebarD />} />
        <Route path='/pending' element={<Pending />} />
        <Route path='/placed' element={<Placed />} />
        <Route path='/inProgress' element={<InProgress />} />
        <Route path='/delivered' element={<Delivered />} />
        <Route path='/cancelled' element={<Cancelled />} />
        <Route path='/return' element={<Return />} />


        <Route path='/orderSubmission' element={<OrderSubmission />} />
        <Route path='/payment/:orderId' element={<Payment />} />

        <Route path='/asignWork' element={<AdminAsign />} />
        <Route path='/adminCompleted' element={<AdminCompleted />} />
        <Route path='/adminCancelled' element={<AdminCancelled />} />


        <Route path='/techInProgress' element={<TechInProgress />} />
        <Route path='/techCompleted' element={<TechCompleted />} />












      </Routes>
    </BrowserRouter>



  );
}

export default App;
