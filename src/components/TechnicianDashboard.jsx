import axios from 'axios';
import React, { useEffect, useState } from 'react';
import TechNavbar from './TechNavbar'; // Assuming you have a separate navbar for technicians

const TechnicianDashboard = () => {
    const [assignedOrders, setAssignedOrders] = useState([]);

    const fetchAssignedOrders = () => {
        const technicianId = sessionStorage.getItem("technicianId"); // Assuming you store technician ID in session storage
        axios.post("http://localhost:8080/viewAssignedOrders", { technicianId })
            .then((response) => {
                console.log(response.data);
                setAssignedOrders(response.data);
            })
            .catch((error) => {
                console.log(error.message);
                alert("Error fetching assigned orders: " + error.message);
            });
    };

    useEffect(() => {
        fetchAssignedOrders();
    }, []);

    return (
        <div>
            <TechNavbar />
            <div className="container">
                <div className="row g-3">
                    <center><h1><b>ASSIGNED ORDERS</b></h1></center><br />
                    {assignedOrders.map((order, i) => (
                        <div className="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 col-xxl-6" key={i}>
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">{order.category}</h5>
                                    <h6 className="card-text"><strong>Doctor: {order.doctor_name}</strong></h6>
                                    <p className="card-text"><strong>Patient Name:</strong> {order.patient_name}</p>
                                    <p className="card-text"><strong>Date:</strong> {order.date}</p>
                                    <p className="card-text"><strong>Units:</strong> {order.tooth_count}</p>
                                    <p className="card-text"><strong>Price:</strong> {order.total_price}</p>
                                </div>
                                <img src={`http://localhost:8080/${order.oral_scan}`} className="card-img-top" alt="Order Oral Scan" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TechnicianDashboard;