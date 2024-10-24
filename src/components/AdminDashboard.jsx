import React from 'react';
import AdminNavbar from './AdminNavbar';
import './AdminDashboard.css'; // Import the external CSS file
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  return (
    <div>
      <AdminNavbar />
      <div className="dashboard-container">
        <h1>DENT-TECH SOLUTIONS</h1>
        <div className="button-container">
          <Link to="/adminorders"><button className="dashboard-button"  >New Orders</button></Link>
          <Link to="/viewProduct"><button className="dashboard-button"  >Product Catalog Design</button></Link>
          <Link to="/viewDoctor" > <button className="dashboard-button"  >Doctors Details</button></Link>
          <Link to="/viewTech" > <button className="dashboard-button" >Technicians Details</button></Link>
          <Link to="/productPrize" ><button className="dashboard-button">Product Prizing</button></Link>



        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;