import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AdminNavbar from './AdminNavbar';
import './ViewDoctor.css'; // Import the existing CSS file for doctors

const ViewTech = () => {
    const [data, setData] = useState([]);

    const fetchData = () => {
        axios.post("http://localhost:8080/technicians") // Adjusted endpoint for technicians
            .then((response) => {
                setData(response.data);
            })
            .catch((error) => {
                console.log(error.message);
                alert(error.message);
            });
    };

    useEffect(() => {
        fetchData(); // Fetch data on component mount
    }, []);

    const deleteTech = (id) => {
        let input = { "_id": id };
        axios.post("http://localhost:8080/deleteUser", input) // Adjusted endpoint for deleting technicians
            .then((response) => {
                if (response.data.status === "deleted") {
                    alert("Deleted Successfully");
                    fetchData(); // Refresh the data after deletion
                } else {
                    alert("Error");
                }
            });
    };

    return (
        <div>
            <AdminNavbar />
            <div className="container">
                <h1>
                    <u>Technicians List</u>
                </h1>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Id</th>
                            <th scope="col">Email</th>
                            <th scope="col">Contact</th>
                            <th scope="col">Address</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((tech, i) => {
                            return (
                                <tr key={i}>
                                    <td>{tech.name}</td>
                                    <td>{tech.technicia_id}</td>
                                    <td>{tech.email}</td>
                                    <td>{tech.phone_num}</td>
                                    <td>{tech.address}</td>
                                    <td>
                                        <button className="btn btn-danger" onClick={() => { deleteTech(tech._id) }}>Delete</button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ViewTech;