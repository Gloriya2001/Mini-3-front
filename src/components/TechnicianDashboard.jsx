import React, { useEffect, useState } from 'react';
import TechNavbar from './TechNavbar'; // Import the technician-specific navbar
import backgroundImage from './assets/qw.jpg'; // Ensure the image is in the correct path
import './DoctorDashboard.css'; // Import the CSS file
import { Link } from 'react-router-dom';

const TechnicianDashboard = () => {
    const [technicianName, setTechnicianName] = useState('');

    useEffect(() => {
        // Retrieve the technician's name from session storage
        const name = sessionStorage.getItem("name");
        if (name) {
            setTechnicianName(name);
        } else {
            console.log("Technician's name not found in session storage.");
        }
    }, []);

    return (
        <div className='dashboard'>
            <TechNavbar /> {/* Use the technician-specific navbar */}
            <div className="dashboard-container">
                <div className="dashboard-content">
                    <h1 className="heading">Welcome, {technicianName}!</h1>
                </div>
                <div className="button-container">
                    <Link to="/techWorks" className="button">
                        New Works
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default TechnicianDashboard;