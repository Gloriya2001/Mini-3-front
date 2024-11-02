import axios from 'axios';
import React, { useEffect, useState } from 'react';
import AdminNavbar from './AdminNavbar';
import TeethDiagram from './TeethDiagram';
import './AdminOrders.css';

const OrderStatus = () => {
    
    const [data, setData] = useState([]);
    const [technicians, setTechnicians] = useState([]);
    const [selectedTechnicians, setSelectedTechnicians] = useState('');

    // Fetch orders from the server
    const fetchData = () => {
        axios.post("http://localhost:8080/viewNewOrders", data)
            .then((response) => {
                console.log(response.data);
                setData(response.data);
            })
            .catch((error) => {
                console.error("Error fetching orders:", error);
                alert("Error fetching orders: " + (error.response ? error.response.data : error.message));
            });
    };

    // Fetch technicians from the server
    const fetchTech = () => {
        axios.post("http://localhost:8080/technicians")
            .then((response) => {
                console.log(response.data);
                setTechnicians(response.data);
            })
            .catch((error) => {
                console.error("Error fetching Technicians:", error);
                alert("Error fetching Technicians: " + (error.response ? error.response.data : error.message));
            });
    };

    const [status, setStatus] = useState(
        {
            "order_id": "",
            "Status": ""
        }
    )

    useEffect(() => {
        fetchData();
        fetchTech();
    }, []);

    const handleTechnicianChange = (orderId, technicianName) => {
        setSelectedTechnicians((prev) => ({
            ...prev,
            [orderId]: technicianName,
        }));
    };

    const readValue = (orderId) => {
        const technicianName = selectedTechnicians[orderId];
        console.log("Order ID:", orderId); // Log the order ID
        console.log("Technician Name:", technicianName); // Log the technician name

        if (!technicianName) {
            alert("Please select a technician first.");
            return;
        }

        const updatedData = { assigned_technician: technicianName }; // Only send the technician name
        console.log("Updating order:", orderId, "with technician:", technicianName);

        axios.put(`http://localhost:8080/updateOrder/${orderId}`, updatedData)
            .then((response) => {
                console.log(response.data);
                if (response.data.status === "updated") {
                    alert("SUCCESSFULLY ASSIGNED");
                } else {
                    alert("ERROR: " + response.data.message);
                }
            })
            .catch((error) => {
                console.error("Error updating order:", error);
                const errorMessage = error.response
                    ? error.response.data.message || error.message
                    : error.message;

                alert("Error updating order: " + errorMessage);
            });
    };

    const accepted = (orderId) => {
        const msg = {
            order_id: orderId,
            status: "Accepted"
        };

        // Make the POST request
        axios.post("http://localhost:8080/orderStatusForDoctor", msg)
            .then((response) => {
                console.log(response.data);
                if (response.data.status === "added") {
                    alert("ORDER ACCEPTED");
                } else {
                    alert("ERROR");
                }
            })
            .catch((error) => {
                console.error("Error saving order status:", error);
                alert("Error: " + (error.response ? error.response.data.message : error.message));
            });
    };

    return (
        <div>
            <AdminNavbar />
            <div className="container">
                <div className="row g-3">
                    <center><h1><b>ORDER DETAILS</b></h1></center><br />
                    {data.map((value, i) => {
                        const selectedTeeth = value.tooth_detail.split(',').map(tooth => tooth.trim());
                        const shades = {
                            shade1: value.shade1,
                            shade2: value.shade2,
                            shade3: value.shade3,
                        };

                        return (
                            <div className="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 col-xxl-6" key={i}>
                                <div className="card">
                                    <div className="card-body">
                                        <h5 className="card-title">{value.category}</h5>
                                        <h6 className="card-text"><strong>Doctor: {value.doctor_name}</strong></h6>
                                        <p className="card-text"><strong>Patient Name:</strong> {value.patient_name}</p>
                                        <p className="card-text"><strong>Date:</strong> {value.date}</p>
                                    </div>
                                    <img src={`http://localhost:8080/${value.oral_scan}`} className="card-img-top" alt="Order Oral Scan" />
                                    <div className="card">
                                        <TeethDiagram selectedTeeth={selectedTeeth} shades={shades} />
                                    </div>
                                    <div className="card-body">
                                        <p>Units: {value.tooth_count}</p>
                                        <p>Price: {value.total_price}</p>
                                    </div>
                                    <div>
                                        <select
                                            value={selectedTechnicians[value._id] || ""}
                                            onChange={(e) => handleTechnicianChange(value._id, e.target.value)}
                                        >
                                            <option value="" disabled>Select Technician</option>
                                            {technicians.map((tech, i) => (
                                                <option key={i} value={tech.name}>{tech.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="col col-12">
                                        <button onClick={() => readValue(value._id)}>Assign Technician</button>
                                    </div>
                                    <div className="col col-12">
                                    <select
                                            value={selectedTechnicians[value._id] || ""}
                                            onChange={(e) => handleTechnicianChange(value._id, e.target.value)}>
                                            <option value="" disabled>Select Technician</option>
                                            {technicians.map((tech, i) => (
                                                <option key={i} value={tech.name}>{tech.name}</option>
                                            ))}
                                        </select>
                                        
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default OrderStatus;