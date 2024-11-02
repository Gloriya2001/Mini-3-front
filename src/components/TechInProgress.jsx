import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import SidebarD from './SidebarD';
import axios from 'axios';
import { Link } from 'react-router-dom';
import TechSidebar from './TechSidebar';
import TechNavbar from './TechNavbar';


const TechInProgress = () => {
    const [data, changedata] = useState([]);
    const name = sessionStorage.getItem("name");

    const fetchdata = () => {
        // Send userId in the request body if needed
        axios.post("http://localhost:8080/techInProgress", { name })
            .then((response) => {
                changedata(response.data);
                console.log(response.data); // Log the fetched data
            })
            .catch((error) => {
                console.log(error.message);
                alert(error.message);
            });
    };
    const updateOrderStatus = (orderId, status) => {
        const msg = {status }; // Create the message object with the status

        // Make the PUT request
        axios.put(`http://localhost:8080/orderStatus/${orderId}`, msg)
            .then((response) => {
                console.log(response.data);
                if (response.data.status === "updated") {
                    alert(`ORDER ${status.toUpperCase()}`);
                } else {

                    alert("ERROR");
                }
            })
            .catch((error) => {
                console.error("Error saving order status:", error);
                alert("Error: " + (error.response ? error.response.data.message : error.message));
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
                                    <th scope="col">Status</th>

                                </tr>
                            </thead>
                            <tbody>
                                {data.map((value, i) => (
                                    <tr key={i}> {/* Use a unique key */}
                                        <td>{value.doctor_name}</td>
                                        <td>{value.patient_name}</td>
                                        <td>{value.category}</td>

                                        <td>

                                            <button className="btn btn-success"
                                                onClick={() => updateOrderStatus(value._id, "Completed By Tech")}

                                            >Completed</button>


                                        </td>
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

export default TechInProgress;