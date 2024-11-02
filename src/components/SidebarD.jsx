import React from 'react';
import { Link } from 'react-router-dom'; // Ensure you have react-router-dom installed for routing

const SidebarD = () => {
    const sidebarStyle = {
        height: '100vh',
        width: '250px',
        position: 'fixed',
        top: 0,
        left: 0,
        backgroundColor: '#007bff',
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
                    <Link to="/pending" style={linkStyle} onMouseOver={(e) => e.currentTarget.style.backgroundColor = linkHoverStyle.backgroundColor} onMouseOut={(e) => e.currentTarget.style.backgroundColor = ''}>
                        Pending
                    </Link>
                </li>
                <li>
                    <Link to="/placed" style={linkStyle} onMouseOver={(e) => e.currentTarget.style.backgroundColor = linkHoverStyle.backgroundColor} onMouseOut={(e) => e.currentTarget.style.backgroundColor = ''}>
                        Placed
                    </Link>
                </li>
                <li>
                    <Link to="/inProgress" style={linkStyle} onMouseOver={(e) => e.currentTarget.style.backgroundColor = linkHoverStyle.backgroundColor} onMouseOut={(e) => e.currentTarget.style.backgroundColor = ''}>
                        In Progress
                    </Link>
                </li>
                <li>
                    <Link to="/delivered" style={linkStyle} onMouseOver={(e) => e.currentTarget.style.backgroundColor = linkHoverStyle.backgroundColor} onMouseOut={(e) => e.currentTarget.style.backgroundColor = ''}>
                        Delivered
                    </Link>
                </li>
                <li>
                    <Link to="/cancelled" style={linkStyle} onMouseOver={(e) => e.currentTarget.style.backgroundColor = linkHoverStyle.backgroundColor} onMouseOut={(e) => e.currentTarget.style.backgroundColor = ''}>
                        Cancelled
                    </Link>
                </li>
                <li>
                    <Link to="/return" style={linkStyle} onMouseOver={(e) => e.currentTarget.style.backgroundColor = linkHoverStyle.backgroundColor} onMouseOut={(e) => e.currentTarget.style.backgroundColor = ''}>
                        Returned
                    </Link>
                </li>
            </ul>
        </div>
    );
};

export default SidebarD;