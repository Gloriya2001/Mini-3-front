import axios from 'axios';
import React, { useEffect, useState } from 'react';
import AdminNavbar from './AdminNavbar';
import TeethDiagram from './TeethDiagram';

const AdminOrders = () => {
    const [data, setData] = useState([]);
    const [technicians, setTechnicians] = useState([]);
    const [selectedTechnicianId, setSelectedTechnicianId] = useState(''); 

    const fetchData = () => {
        axios.post("http://localhost:8080/viewOrders", {})
            .then((response) => {
                console.log(response.data); // Log the response data
                setData(response.data);
            })
            .catch((error) => {
                console.log(error.message);
                alert(error.message);
            });
    };
    const fetchTechnicians = () => {
        axios.get("http://localhost:8080/getTechnicians") // Endpoint to fetch technicians
            .then((response) => {
                setTechnicians(response.data); // Assuming response.data is an array of technicians
            })
            .catch((error) => {
                console.log(error.message);
                alert("Error fetching technicians: " + error.message);
            });
    };

    useEffect(() => { fetchData(); fetchTechnicians(); }, []);

    const deleteorder = (id) => {
        let input = { "_id": id }
        axios.post("http://localhost:8080/deleteOrder", input).then(
            (response) => {
                if (response.data.status === "deleted") {
                    alert("DELETED SUCCESSFULLY");
                    fetchData();
                } else {
                    alert("ERROR");
                }
            }
        ).catch(
            (error) => {
                console.error(error.message);
                alert("Error deleting order: " + error.message);
            }
        );
    }

    const assignTechnician = (orderId, technicianId) => {
        const input = { orderId, technicianId };
        axios.post("http://localhost:8080/assignTechnician", input) // Endpoint to assign technician
            .then((response) => {
                if (response.data.status === "assigned") {
                    alert("Technician assigned successfully");
                    fetchData(); // Refresh the order list
                } else {
                    alert("Error assigning technician");
                }
            })
            .catch((error) => {
                console.error(error.message);
                alert("Error assigning technician: " + error.message);
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

                        return (
                            <div className="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 col-xxl-6" key={i}>
                                <div className="card">
                                    <div className="card-body">
                                        <h5 className="card-title" style={{ backgroundColor: '#f8d7da', padding: '10px', borderRadius: '5px' }}>{value.category}</h5>
                                        <h6 className="card-text"><strong>Doctor: {value.doctor_name} </strong></h6> {/* Display the doctor's name */}
                                        <p className="card-text"><strong>Patient Name:</strong> {value.patient_name}</p>
                                        <p className="card-text"><strong>Date:</strong> {value.date}</p>
                                    </div>
                                    <img src={`http://localhost:8080/${value.oral_scan}`} className="card-img-top" alt="Order Oral Scan" />
                                    <div className="card">
                                        <TeethDiagram selectedTeeth={selectedTeeth} />
                                    </div>
                                    <div className="card-body">
                                        <p>Units: {value.tooth_count}</p>
                                        <p>Price: {value.total_price}</p>
                                    </div>
                                    <div className="col-12 d-flex justify-content-between align-items-center">
                                        <div className="dropdown">
                                            <button className="btn btn -primary dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                                                Status
                                            </button>
                                            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                <li><a className="dropdown-item" href="#">Accepted</a></li>
                                                <li><a className="dropdown-item" href="#">In Progress</a></li>
                                                <li><a className="dropdown-item" href="#">Delivered</a></li>
                                                <li><a className="dropdown-item" href="#">Cancelled</a></li>
                                            </ul>
                                        </div>
                                        <div className="col-12 d-flex justify-content-between align-items-center">
                                            <div className="dropdown">
                                                <select className="form-select " aria-label="Select technician">
                                                    {technicians.map((technician, index) => (
                                                        <option key={index} value={technician._id}>{technician.name}</option>
                                                    ))}
                                                </select>
                                            </div>
                                            </div>
                                        
                                            <button type="button" className="btn btn-success" onClick={() => { assignTechnician(value._id, selectedTechnicianId) }} >Assign</button>
                                            <button type="button" className="btn btn-danger" onClick={() => { deleteorder(value._id) }}>Delete</button>


                                        </div>


                                    </div>
                                </div>
                                );
                    })}
                            </div>
            </div>
            </div>
            );
}

            export default AdminOrders;