import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import backgroundImage from './assets/qw.jpg'; // Ensure the image is in the correct path
import './DoctorDashboard.css'; // Import the CSS file
import { Link } from 'react-router-dom';

const DoctorDashboard = () => {
    const [doctorName, setDoctorName] = useState('');

    useEffect(() => {
        // Retrieve the doctor's name from session storage
        const name = sessionStorage.getItem("name");
        if (name) {
            setDoctorName(name);
        } else {
            console.log("Doctor's name not found in session storage.");
        }
    }, []);

    return (
        <div className='dashboard'>
            <Navbar />
            <div className="dashboard-container">
                <div className="dashboard-content">
                    <h1 className="heading">Welcome, Dr. {doctorName}!</h1>
                </div>
                <div className="button-container">
                    <Link to="/casemanage" className="button">
                        Case Management
                    </Link>
                    <Link to="/doctorOrders" className="button">
                        My Orders
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default DoctorDashboard;