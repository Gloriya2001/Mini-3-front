import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import SidebarD from './SidebarD';
import axios from 'axios';

const OrdersofDoctors = () => {

    const [data, changedata] = useState([])
    const id = sessionStorage.getItem("userId");

    const fetchdata = () => {
        axios.post("http://localhost:8080/viewOrders", data).then(
            (response) => {
                changedata(response.data)
            }
        ).catch(
            (error) => {
                console.log(error.message)
                alert(error.message)
            }
        ).finally(
            console.log(data)
        )
    }
    useEffect(() => { fetchdata() }, [])

    return (
        <div style={{ display: 'flex' }}>
            <SidebarD />
            <div style={{ flex: 1, marginLeft: '250px' }}> {/* Adjust margin to match sidebar width */}
                <Navbar />
                <div className="container mt-4"> {/* Add some margin to the top */}
                    <h1>Track Your Order Here</h1>
    
                    <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
        
                        <table class="table">
                            <thead>
                                <tr>
                                    <th scope="col">Patient Name</th>
                                    <th scope="col">Product</th>
                                    <th scope="col">Units</th>
                                    <th scope="col">Price</th>
                                    <th scope="col">Track here</th>
                                  
                                </tr>
                            </thead>
                            <tbody>
                                {data.map(
                                    (value,i)=>{
                                        return <tr>
                                        <td>{value.patient_name}</td>
                                        <td>{value.category}</td>
                                        <td>{value.tooth_details}</td>
                                        <td>{value.price}</td>

                                        <td><button className="btn btn-success" >Track</button></td>
                                    </tr>
                                    }
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
                </div>

    );
};

export default OrdersofDoctors;