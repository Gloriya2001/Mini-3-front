import axios from 'axios';
import React, { useEffect, useState } from 'react';
import AdminNavbar from './AdminNavbar';
import AdminSidebar from './AdminSidebar';

const AdminAsign = () => {
    const [data, setData] = useState([]);
    const [technicians, setTechnicians] = useState([]);
    const [selectedTechnicians, setSelectedTechnicians] = useState('');

    // Fetch orders and technicians from the server
    const fetchData = () => {
        axios.post("http://localhost:8080/viewNewOrders", data)
            .then((response) => setData(response.data))
            .catch((error) => alert("Error fetching orders: " + (error.response ? error.response.data : error.message)));
    };

    const fetchTech = () => {
        axios.post("http://localhost:8080/technicians")
            .then((response) => setTechnicians(response.data))
            .catch((error) => alert("Error fetching technicians: " + (error.response ? error.response.data : error.message)));
    };

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
        if (!technicianName) {
            alert("Please select a technician first.");
            return;
        }

        const updatedData = { assigned_technician: technicianName };
        axios.put(`http://localhost:8080/updateOrder/${orderId}`, updatedData)
            .then((response) => {
                if (response.data.status === "updated") {
                    alert("Technician assigned successfully!");
                    fetchData(); // Refresh data after assigning
                } else {
                    alert("Error assigning technician.");
                }
            })
            .catch((error) => alert("Error updating order: " + (error.response ? error.response.data.message : error.message)));
    };

    return (
        <div style={{ display: 'flex' }}>
            <AdminSidebar />
            <div style={{ flex: 1, marginLeft: '250px' }}>
                <AdminNavbar />
                <div className="container mt-4">
                    <h2 className="text-center my-4 text-primary">Assign Technicians to Orders</h2>
                    <table className="table table-striped table-bordered shadow">
                        <thead className="table-dark text-center">
                            <tr>
                                <th scope="col">Doctor Name</th>
                                <th scope="col">Patient Name</th>
                                <th scope="col">Work</th>
                                <th scope="col">Select Technician</th>
                                <th scope="col">Assign</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((value, i) => (
                                <tr key={i}>
                                    <td className="align-middle text-center">{value.doctor_name}</td>
                                    <td className="align-middle text-center">{value.patient_name}</td>
                                    <td className="align-middle text-center">{value.work}</td>
                                    <td className="align-middle">
                                        <select
                                            className="form-select"
                                            value={selectedTechnicians[value._id] || ""}
                                            onChange={(e) => handleTechnicianChange(value._id, e.target.value)}
                                        >
                                            <option value="" disabled>Select Technician</option>
                                            {technicians.map((tech, index) => (
                                                <option key={index} value={tech.name}>{tech.name}</option>
                                            ))}
                                        </select>
                                    </td>
                                    <td className="align-middle text-center">
                                        <button
                                            className="btn btn-success"
                                            onClick={() => readValue(value._id)}
                                        >
                                            Assign Technician
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminAsign;
