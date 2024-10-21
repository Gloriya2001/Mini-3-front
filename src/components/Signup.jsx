import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Signup = () => {
    const [data,setdata]=useState(
        {
            name:"",
            email:"",
            password:"",
            confirm_password:"",
            role:"",
            doctor_id:"",
            technician_id:""
        }
    )

    const inputHandler=(event)=>{
        setdata({...data,[event.target.name]:event.target.value})
    }

    const readValue = async (event) => {
        event.preventDefault(); // Prevent form submission
        if (data.password !== data.confirm_password) {
            alert("Passwords do not match!");
            return;
        }
        try {
            const response = await axios.post("http://localhost:8080/signup", data); // Adjust the URL as needed
            if (response.data.status === "success") {
                alert("Signup successful! Please log in.");
                navigate("/"); // Navigate to login page after successful signup
            } else {
                alert(response.data.status); // Display error message
            }
        } catch (error) {
            console.log(error.message);
            alert("An error occurred during signup.");
        }
    };

    const navigate = useNavigate();

        
    
  return (
    <div>
        <div className="container">
            <div className="row">
                <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                    <center><h1><b>REGISTER</b></h1></center><br/>
                    <div className="row g-3">
                        <div className="col col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                            <label htmlFor="name" className="form-label">Name </label>
                            <input type="text" className="form-control" placeholder='Enter your name' name='name' value={data.name} onChange={inputHandler}/>
                        </div>

                       

                        <div className="col col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                        <label htmlFor="email" className="form-label"><b>Email id </b></label>
                            <input
                                type="text"
                                id="email"
                                className="form-control"
                                name="email"
                                required
                                placeholder="Enter your email"
                                value={data.email}
                                onChange={inputHandler}
                            />
                        </div>

                        <div className="col col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                        <label htmlFor="password" className="form-label"><b>Password </b></label>
                            <input
                                type="password"
                                id="password"
                                className="form-control"
                                name="password"
                                required
                                placeholder="Enter your password"
                                value={data.password}
                                onChange={inputHandler}
                            />
                        </div>

                        <div className="col col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                        <label htmlFor="confirm_password" className="form-label"><b>Confirm Password</b></label>
                            <input
                                type="password"
                                id="confirm_password"
                                className="form-control"
                                name="confirm_password"
                                required
                                placeholder="retype your password"
                                value={data.confirm_password}
                                onChange={inputHandler}
                            />
                            </div>

                        <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                        <label htmlFor="role" className="form-label"><b>Role </b></label>
                            <select
                                name="role"
                                id="role"
                                className="form-control"
                                required
                                value={data.role}
                                onChange={inputHandler}
                            >
                                <option value="" disabled>Select Role</option>
                                <option value="Doctor">Doctor</option>
                                <option value="Technician">Technician</option>
                            </select>
                        </div>

                        {data.role === 'Doctor' && (

                            <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                <label htmlFor="doctorId" className="form-label"><b>Doctor Id </b></label>
                                <input
                                    type="text"
                                    id="doctor_id"
                                    className="form-control"
                                    name="doctor_id"
                                    placeholder="Enter your Doctor ID"
                                    value={data.doctor_id}
                                    onChange={inputHandler}
                                />
                            </div>
                        )}

                        {data.role === 'technician' && (
                            <>
                                <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                    <label htmlFor="labId" className="form-label"><b>Lab Name </b></label>
                                    <input
                                        type="text"
                                        id="lab_name"
                                        className="form-control"
                                        name="lab_name"
                                        placeholder="Enter your Lab ID"
                                        value={data.lab_name}
                                        onChange={inputHandler}
                                    />
                                </div>
                                <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                    <label htmlFor="technicianId" className="form-label"><b>Technician Id</b></label>
                                    <input
                                        type="text"
                                        id="technician_id"
                                        className="form-control"
                                        name="technician_id"
                                        placeholder="Enter your Technician ID"
                                        value={data.technician_id}
                                        onChange={inputHandler}
                                    />
                                </div>
                            </>
                        )}
                        
                        
                        <div className="col col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                            <button className="btn btn-success" onClick={readValue}>Register</button>
                        </div>
                        <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                            <label htmlFor="" className="form-label"><b>Back to <Link to='/'>Login</Link></b></label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Signup