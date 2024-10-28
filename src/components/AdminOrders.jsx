import axios from 'axios';
import React, { useEffect, useState } from 'react';
import AdminNavbar from './AdminNavbar';
import TeethDiagram from './TeethDiagram';
import './AdminOrders.css'; // Import the specific CSS file for AdminOrders

const AdminOrders = () => {
    const [data, setData] = useState([]);
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

    useEffect(() => {fetchData();}, []);


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