import React from 'react';
import { Link } from 'react-router-dom'; // Ensure you have react-router-dom installed for routing

const AdminSidebar = () => {
    const sidebarStyle = {
        height: '100vh',
        width: '250px',
        position: 'fixed',
        top: 0,
        left: 0,
        backgroundColor: '#021324',
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
                    <Link to="/adminorders" style={linkStyle} onMouseOver={(e) => e.currentTarget.style.backgroundColor = linkHoverStyle.backgroundColor} onMouseOut={(e) => e.currentTarget.style.backgroundColor = ''}>
                        New Orders
                    </Link>
                </li>
                <li>
                    <Link to="/asignWork" style={linkStyle} onMouseOver={(e) => e.currentTarget.style.backgroundColor = linkHoverStyle.backgroundColor} onMouseOut={(e) => e.currentTarget.style.backgroundColor = ''}>
                        Works To Assingn
                    </Link>
                </li>
                <li>

                    <Link to="/adminInprogress" style={linkStyle} onMouseOver={(e) => e.currentTarget.style.backgroundColor = linkHoverStyle.backgroundColor} onMouseOut={(e) => e.currentTarget.style.backgroundColor = ''}>
                        In Progress
                    </Link>
                </li>
                <li>
                    <Link to="/adminCompleted" style={linkStyle} onMouseOver={(e) => e.currentTarget.style.backgroundColor = linkHoverStyle.backgroundColor} onMouseOut={(e) => e.currentTarget.style.backgroundColor = ''}>
                        Completed
                    </Link>
                </li>
                <li>
                    <Link to="/adminCancelled" style={linkStyle} onMouseOver={(e) => e.currentTarget.style.backgroundColor = linkHoverStyle.backgroundColor} onMouseOut={(e) => e.currentTarget.style.backgroundColor = ''}>
                        Cancelled
                    </Link>
                </li>

            </ul>
        </div >
    );
};

export default AdminSidebar;