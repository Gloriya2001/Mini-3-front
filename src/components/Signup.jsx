import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Signup.css'; // Import the CSS file for styles

const Signup = () => {
    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
        confirm_password: "",
        role: "",
        doctor_id: "",
        technician_id: "",
        lab_name: ""
    });

    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const inputHandler = (event) => {
        setData({ ...data, [event.target.name]: event.target.value });
        validateField(event.target.name, event.target.value); // Validate field on change
    };

    const validateField = (name, value) => {
        let newErrors = { ...errors };

        if (name === "name" && !value) {
            newErrors.name = "Name is required.";
        } else {
            delete newErrors.name;
        }

        if (name === "email") {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!value) {
                newErrors.email = "Email is required.";
            } else if (!emailPattern.test(value)) {
                newErrors.email = "Invalid email format.";
            } else {
                delete newErrors.email;
            }
        }

        if (name === "password") {
            if (!value) {
                newErrors.password = "Password is required.";
            } else if (value.length < 6) {
                newErrors.password = "Password must be at least 6 characters long.";
            } else {
                delete newErrors.password;
            }
        }

        if (name === "confirm_password") {
            if (value !== data.password) {
                newErrors.confirm_password = "Passwords do not match.";
            } else {
                delete newErrors.confirm_password;
            }
        }

        setErrors(newErrors);
    };

    const readValue = async (event) => {
        event.preventDefault(); // Prevent form submission
        if (Object.keys(errors).length > 0) {
            alert("Please fix the errors before submitting.");
            return;
        }

        try {
            const response = await axios.post("http://localhost:8080/signup", data);
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

    return (
        <div className="signup-page">
            <div className="signup-container">
                <h1 className="signup-title">REGISTER</h1>
                <form onSubmit={readValue}>
                    <div className="form-group">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input
                            type="text"
                            className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                            name='name'
                            placeholder='Enter your name'
                            value={data.name}
                            onChange={inputHandler}
                        />
                        {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="email" className="form-label">Email ID</label>
                        <input
                            type="text"
                            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                            name="email"
                            placeholder="Enter your email"
                            value={data.email}
                            onChange={inputHandler}
                        />
                        {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input
                            type="password"
                            className={`form-control ${ errors.password ? 'is-invalid' : ''}`}
                            name="password"
                            placeholder="Enter your password"
                            value={data.password}
                            onChange={inputHandler}
                        />
                        {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="confirm_password" className="form-label">Confirm Password</label>
                        <input
                            type="password"
                            className={`form-control ${errors.confirm_password ? 'is-invalid' : ''}`}
                            name="confirm_password"
                            placeholder="Retype your password"
                            value={data.confirm_password}
                            onChange={inputHandler}
                        />
                        {errors.confirm_password && <div className="invalid-feedback">{errors.confirm_password}</div>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="role" className="form-label">Role</label>
                        <select
                            name="role"
                            id="role"
                            className="form-control"
                            value={data.role}
                            onChange={inputHandler}
                        >
                            <option value="" disabled>Select Role</option>
                            <option value="Doctor">Doctor</option>
                            <option value="Technician">Technician</option>
                        </select>
                    </div>

                    {data.role === 'Doctor' && (
                        <div className="form-group">
                            <label htmlFor="doctorId" className="form-label">Doctor ID</label>
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

                    {data.role === 'Technician' && (
                        <>
                            <div className="form-group">
                                <label htmlFor="labId" className="form-label">Lab Name</label>
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
                            <div className="form-group">
                                <label htmlFor="technicianId" className="form-label">Technician ID</label>
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

                    <div className="form-group">
                        <button className="btn btn-success" onClick={readValue}>Register</button>
                    </div>
                    <div className="form-group">
                        <label htmlFor="" className="form-label">Back to <Link to='/'>Login</Link></label>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Signup;