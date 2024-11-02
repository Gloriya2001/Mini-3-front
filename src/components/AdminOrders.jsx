import axios from 'axios';
import React, { useEffect, useState } from 'react';
import AdminNavbar from './AdminNavbar';
import TeethDiagram from './TeethDiagram';
import AdminSidebar from './AdminSidebar';

const AdminOrders = () => {
    const [data, setData] = useState([]);

    // Fetch orders from the server
    const fetchData = () => {
        axios.post("http://localhost:8080/viewPending")
            .then((response) => {
                console.log(response.data);
                setData(response.data);
            })
            .catch((error) => {
                console.error("Error fetching orders:", error);
                alert("Error fetching orders: " + (error.response ? error.response.data : error.message));
            });
    };

    useEffect(() => {
        fetchData();
    }, []);

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

    return (
        <div style={{ display: 'flex' }}>
            <AdminSidebar />
            <div style={{ flex: 3, marginLeft: '250px' }}>
                <AdminNavbar />
                <div className="container mt-4">
                    <center><h1><b>ORDER DETAILS</b></h1></center><br />
                    <div className="row g-3">
                        {data.map((value, i) => {
                            const selectedTeeth = value.tooth_detail.split(',').map(tooth => tooth.trim());
                            const shades = {
                                shade1: value.shade1,
                                shade2: value.shade2,
                                shade3: value.shade3,
                            };

                            return (
                                <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4" key={i}>
                                    <div className="card h-100 shadow-sm">
                                        <img src={`http://localhost:8080/${value.oral_scan}`} className="card-img-top" alt="Order Oral Scan" />
                                        <div className="card-body d-flex flex-column">
                                            <h5 className="card-title">{value.category}</h5>
                                            <h6 className="card-text"><strong>Doctor:</strong> {value.doctor_name}</h6>
                                            <p className="card-text"><strong>Patient Name:</strong> {value.patient_name}</p>
                                            <p className="card-text"><strong>Date:</strong> {value.date}</p>
                                            <div className="mt-auto">
                                                <TeethDiagram selectedTeeth={selectedTeeth} shades={shades} />
                                            </div>
                                            <p className="mt-2"><strong>Units:</strong> {value.tooth_count}</p>
                                            <p className="mt-2"><strong>Price:</strong> {value.total_price}</p>
                                        </div>
                                        <div className="card-footer text-center">
                                            <div className="d-flex justify-content-center">
                                                <button
                                                    className="btn btn-success me-2"
                                                    onClick={() => updateOrderStatus(value._id, "Accepted")}
                                                >
                                                    Accept
                                                </button>
                                                <button
                                                    className="btn btn-danger"
                                                    onClick={() => updateOrderStatus(value._id, "Rejected")}
                                                >
                                                    Reject
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminOrders;