import React from 'react';
import { Link } from 'react-router-dom'; // Ensure you have react-router-dom installed for routing

const TechSidebar = () => {
    const sidebarStyle = {
        height: '100vh',
        width: '250px',
        position: 'fixed',
        top: 0,
        left: 0,
        backgroundColor: '#343a40',
        color: 'white',
        padding: '20px',
        boxShadow: '2px 0 5px rgba(0, 0, 0, 0.5)',
    };


    const linkStyle = {
        color: 'white',
        textDecoration: 'none',
        padding: '10px',
        display: 'block',
        transition: 'background-color 0.3s',
    };

    const linkHoverStyle = {
        backgroundColor: '#495057',
    };

    return (
        <div style={sidebarStyle}>
            <ul className="list-unstyled">
                <li>
                    <Link to="/techWorks" style={linkStyle} onMouseOver={(e) => e.currentTarget.style.backgroundColor = linkHoverStyle.backgroundColor} onMouseOut={(e) => e.currentTarget.style.backgroundColor = ''}>
                        New Works
                    </Link>
                </li>
                <li>
                    <Link to="/techInProgress" style={linkStyle} onMouseOver={(e) => e.currentTarget.style.backgroundColor = linkHoverStyle.backgroundColor} onMouseOut={(e) => e.currentTarget.style.backgroundColor = ''}>
                        Inprogress
                    </Link>
                </li>
                <li>
                    <Link to="/techCompleted" style={linkStyle} onMouseOver={(e) => e.currentTarget.style.backgroundColor = linkHoverStyle.backgroundColor} onMouseOut={(e) => e.currentTarget.style.backgroundColor = ''}>
                        Completed
                    </Link>
                </li>
        
            </ul>
        </div>
    );
};

export default TechSidebar;