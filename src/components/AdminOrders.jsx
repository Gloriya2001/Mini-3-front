import axios from 'axios';
import React, { useEffect, useState } from 'react';
import AdminNavbar from './AdminNavbar';
import TeethDiagram from './TeethDiagram';
import './AdminOrders.css'; // Import the specific CSS file for AdminOrders

const AdminOrders = () => {
    const [data, setData] = useState([]);
    const [technicians, setTechnicians] = useState([]);
    const [selectedTechnicianIds, setSelectedTechnicianIds] = useState({}); // Store selected technician IDs for each order

    // Fetch orders from the server
    const fetchData = () => {
        axios.post("http://localhost:8080/viewOrders", {})
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
    const fetchTechnicians = () => {
        axios.get("http://localhost:8080/getTechnicians")
            .then((response) => {
                console.log("Technicians fetched:", response.data);
                setTechnicians(response.data);
            })
            .catch((error) => {
                console.error("Error fetching technicians:", error);
                alert("Error fetching technicians: " + (error.response ? error.response.data : error.message));
            });
    };

    useEffect(() => {
        fetchData();
        fetchTechnicians();
    }, []);

    // Delete an order
    const deleteOrder = (id) => {
        let input = { "_id": id };
        axios.post("http://localhost:8080/deleteOrder", input)
            .then((response) => {
                if (response.data.status === "deleted") {
                    alert("DELETED SUCCESSFULLY");
                    fetchData();
                } else {
                    alert("ERROR");
                }
            })
            .catch((error) => {
                console.error("Error deleting order:", error);
                alert("Error deleting order: " + (error.response ? error.response.data : error.message));
            });
    };

    // Assign a technician to an order
    const assignTechnician = (orderId) => {
        const technicianId = selectedTechnicianIds[orderId];
        if (!technicianId) {
            alert("Please select a technician.");
            return;
        }

        const input = { orderId, technicianId };
        axios.post("http://localhost:8080/assignTechnician", input)
            .then((response) => {
                if (response.data.status === "assigned") {
                    alert("Technician assigned successfully");
                    fetchData();
                } else {
                    alert("Error assigning technician");
                }
            })
            .catch((error) => {
                console.error("Error assigning technician:", error);
                alert("Error assigning technician: " + (error.response ? error.response.data : error.message));
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
                                        <h6 className="card-text"><strong>Doctor: {value.doctor_name} </strong></h6>
                                        <p className="card-text"><strong>Patient Name:</strong> {value.patient_name}</p>
                                        <p className="card-text"><strong>Date:</strong> {value.date}</p>
                                    </div >
                                    <img src={`http://localhost:8080/${value.oral_scan}`} className="card-img-top" alt="Order Oral Scan" />
                                    <div className="card">
                                        <TeethDiagram selectedTeeth={selectedTeeth} shades={shades} />
                                    </div>
                                    <div className="card-body">
                                        <p>Units: {value.tooth_count}</p>
                                        <p>Price: {value.total_price}</p>
                                    </div>
                                    <div className="col-12 d-flex justify-content-between align-items-center">
                                        <div className="dropdown">
                                            <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                Assign Technician
                                            </button>
                                            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                {technicians.map((technician, index) => (
                                                    <button key={index} className="dropdown-item" onClick={() => setSelectedTechnicianIds({ ...selectedTechnicianIds, [value._id]: technician._id })}>
                                                        {technician.name}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                        <button className="btn btn-primary" onClick={() => assignTechnician(value._id)}>Assign</button>
                                        <button className="btn btn-danger" onClick={() => deleteOrder(value._id)}>Delete Order</button>
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

export default AdminOrders;