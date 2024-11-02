import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import SidebarD from './SidebarD';
import axios from 'axios';
import { Link } from 'react-router-dom';
import TechSidebar from './TechSidebar';
import TechNavbar from './TechNavbar';


const TechCompleted= () => {
    const [data, changedata] = useState([]);
    const name = sessionStorage.getItem("name");

    const fetchdata = () => {
        // Send userId in the request body if needed
        axios.post("http://localhost:8080/techCompleted", { name })
            .then((response) => {
                changedata(response.data);
                console.log(response.data); // Log the fetched data
            })
            .catch((error) => {
                console.log(error.message);
                alert(error.message);
            });
    };
    

    useEffect(() => {
        fetchdata();
    }, []);

    return (
        <div style={{ display: 'flex' }}>
            <TechSidebar />
            <div style={{ flex: 1, marginLeft: '250px' }}>
                <TechNavbar />
                <div className="container mt-4">
                    <h1>Track Your Order Here</h1>
                    <div className="col-12">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">Doctor Name</th>
                                    <th scope="col">Patient Name</th>
                                    <th scope="col">Category</th>
                    

                                </tr>
                            </thead>
                            <tbody>
                                {data.map((value, i) => (
                                    <tr key={i}> {/* Use a unique key */}
                                        <td>{value.doctor_name}</td>
                                        <td>{value.patient_name}</td>
                                       <td>{value.category}</td>

                                       
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TechCompleted;