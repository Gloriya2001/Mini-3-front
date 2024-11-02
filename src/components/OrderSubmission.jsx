import axios from 'axios';
import React, { useEffect, useState } from 'react';
import TeethDiagram from './TeethDiagram';
import './OrderSubmission.css'; // New CSS file for enhanced styling
import { Link, useLocation } from 'react-router-dom';

const OrderSubmission = () => {
    const [data, setData] = useState([]);
    const [orderDetails, setOrderDetails] = useState(null);
    const location = useLocation();
    const orderId = location.state?.orderId;

    // Fetch orders from the server
    const fetchData = () => {
        axios.post("http://localhost:8080/viewOrders", { orderId })
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

    useEffect(() => {
        if (data.length > 0 && orderId) {
            const foundOrder = data.find(order => order._id === orderId);
            setOrderDetails(foundOrder);
        }
    }, [data, orderId]);

    return (
        <div className="order-submission-container">
            <div className="order-submission-message">
                <h1 className="title">Order Submitted!</h1>
               
                <p className="status-message">
                    Your order is under process. Check Order Status on <strong>MY ORDERS</strong>.
                </p>
                <p className="payment-message">
                    Once your order is accepted, you can select payment methods and proceed.
                </p>
                <Link to='/pending'>
                    <button className="btn btn-success my-orders-btn">MY ORDERS</button>
                </Link>
            </div>

            <div className="order-details-section">
                <h2>ORDER DETAILS</h2>
                {orderDetails ? (
                    <div className="order-card">
                        <div className="order-card-header">
                            <h5 className="order-category">{orderDetails.category}</h5>
                            <h6 className="order-doctor">Doctor: {orderDetails.doctor_name}</h6>
                        </div>
                        <div className="order-card-body">
                            <p><strong>Patient Name:</strong> {orderDetails.patient_name}</p>
                            <p><strong>Date:</strong> {orderDetails.date}</p>
                            <img src={`http://localhost:8080/${orderDetails.oral_scan}`} className="order-scan" alt="Order Oral Scan" />
                            <TeethDiagram selectedTeeth={orderDetails.tooth_detail.split(',').map(tooth => tooth.trim())} 
                                          shades={{ shade1: orderDetails.shade1, shade2: orderDetails.shade2, shade3: orderDetails.shade3 }} />
                            <p><strong>Units:</strong> {orderDetails.tooth_count}</p>
                            <p><strong>Price:</strong> {orderDetails.total_price}</p>
                            <p><strong>Remarks:</strong> {orderDetails.Remarks}</p>
                        </div>
                    </div>
                ) : (
                    <p></p>
                )}
            </div>
        </div>
    );
};

export default OrderSubmission;
