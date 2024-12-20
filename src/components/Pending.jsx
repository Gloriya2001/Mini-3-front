import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import SidebarD from './SidebarD';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Pending = () => {
    const [data, changedata] = useState([]);
    const id = sessionStorage.getItem("userId");


    const fetchdata = () => {
        // Send userId in the request body if needed
        axios.post("http://localhost:8080/viewPending", { userId: id })
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
            <SidebarD />
            <div style={{ flex: 1, marginLeft: '250px' }}>
                <Navbar />
                <div className="container mt-4">
                    <h1>Track Your Order Here</h1>
                    <div className="col-12">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">Patient Name</th>
                                    <th scope="col">Product</th>
                                    <th scope="col">Status</th>
                                    <th scope="col">Message</th>
                                    <th scope="col">Payment method</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((value, i) => (
                                    <tr> {/* Use a unique key */}
                                        <td>{value.patient_name}</td>
                                        <td>{value.category}</td>
                                        <td>{value.order_status}</td>
                                        <td>{value.message}</td>
                                        <td>
                                            {value.order_status === 'Accepted' && (
                                                <Link to={`/payment/${value._id}`}>
                                                    <button className="btn btn-success">Pay Now</button>
                                                </Link>
                                            )}
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

export default Pending;