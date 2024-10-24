import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AdminNavbar from './AdminNavbar';
import './ViewDoctor.css'; // Import the specific CSS file

const ViewDoctor = () => {
    const [data, setData] = useState([]);

    const fetchData = () => {
        axios.post("http://localhost:8080/doctors")
            .then((response) => {
                setData(response.data);
            })
            .catch((error) => {
                console.log(error.message);
                alert(error.message);
            });
    };

    useEffect(() => {
        fetchData();
    }, []);

    const deleteDoctor = (id) => {
        let input = { "_id": id };
        axios.post("http://localhost:8080/deleteUser", input)
            .then((response) => {
                if (response.data.status === "deleted") {
                    alert("Deleted Successfully");
                    fetchData();
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
                    <u>Doctors List</u>
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
                    <tbody >
                        {data.map((doctor, i) => {
                            return (
                                <tr key={i}>
                                    <td>{doctor.name}</td>
                                    <td>{doctor.doctor_id}</td>
                                    <td>{doctor.email}</td>
                                    <td>{doctor.phone_num}</td>
                                    <td>{doctor.address}</td>
                                    <td>
                                        <button className="btn btn-danger" onClick={() => { deleteDoctor(doctor._id) }}>Delete</button>
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
export default ViewDoctor;