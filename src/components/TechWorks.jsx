import axios from 'axios';
import React, { useEffect, useState } from 'react';
import TechNavbar from './TechNavbar'; // Assuming you have a separate navbar for technicians
import TeethDiagram from './TeethDiagram';
import TechSidebar from './TechSidebar';
import { Link } from 'react-router-dom';

const TechWorks = () => {
    const [assignedOrders, setAssignedOrders] = useState([]);

    const fetchAssignedOrders = () => {
        const name = sessionStorage.getItem("name"); // Fetch technician name from session storage
        axios.post("http://localhost:8080/viewAssignedOrders", { name })
            .then((response) => setAssignedOrders(response.data))
            .catch((error) => alert("Error fetching assigned orders: " + error.message));
    };
    const updateOrderStatus = (orderId, status) => {
        const msg = { status }; // Create the message object with the status

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
        fetchAssignedOrders();
    }, []);

    return (
        <div>
            <TechSidebar />
            <div>
                <TechNavbar />
                <div className="container mt-4">
                    <center><h1><b>ASSIGNED ORDERS</b></h1></center>
                    <div className="row g-3 mt-3">
                        {assignedOrders.length > 0 ? (
                            assignedOrders.map((order, i) => {
                                const selectedTeeth = order.tooth_detail
                                    ? order.tooth_detail.split(',').map(tooth => tooth.trim())
                                    : [];
                                const shades = {
                                    shade1: order.shade1,
                                    shade2: order.shade2,
                                    shade3: order.shade3,
                                };

                                return (
                                    <div className="col-12 col-md-6" key={i}>
                                        <div className="card h-100 shadow-sm">
                                            <img
                                                src={`http://localhost:8080/${order.oral_scan}`}
                                                className="card-img-top"
                                                alt="Order Oral Scan"
                                            />
                                            <div className="card-body d-flex flex-column">
                                                <h5 className="card-title"><b>{order.category}</b></h5>
                                                <h6><strong>Doctor:</strong> {order.doctor_name}</h6>
                                                <p><strong>Patient Name:</strong> {order.patient_name}</p>
                                                <p><strong>Date:</strong> {order.date}</p>
                                                <div className="mt-auto">
                                                    <TeethDiagram selectedTeeth={selectedTeeth} shades={shades} />
                                                </div>
                                                <p><strong>Remarks : </strong> {order.Remarks}</p>
                                            </div>
                                            <button
                                                className="btn btn-success me-2"
                                                onClick={() => updateOrderStatus(order._id, "In Progress")}

                                            >
                                                In Progress
                                            </button>

                                           
                                                <button
                                                    className="btn btn-danger"
                                                >
                                                    CAD/CAM
                                                </button>
                                        

                                        </div>
                                    </div>
                                );
                            })
                        ) : (
                            <p className="text-center">No assigned orders found.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TechWorks;
