import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css'; // Import the CSS file

const Login = () => {
    const [data, setData] = useState({ email: "", password: "" });
    const [errors, setErrors] = useState({ email: "", password: "" });
    const navigate = useNavigate();

    const inputHandler = (event) => {
        const { name, value } = event.target;
        setData({ ...data, [name]: value });
        validateField(name, value); // Validate field on change
    };

    const validateField = (name, value) => {
        let emailError = "";
        let passwordError = "";

        if (name === "email") {
            // Simple email regex for validation
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!value) {
                emailError = "Email is required.";
            } else if (!emailPattern.test(value)) {
                emailError = "Invalid email format.";
            }
        }

        if (name === "password") {
            if (!value) {
                passwordError = "Password is required.";
            } else if (value.length < 6) {
                passwordError = "Password must be at least 6 characters long.";
            }
        }

        setErrors({ email: emailError, password: passwordError });
    };

    const readValue = () => {
        // Check for any errors before making the API call
        if (errors.email || errors.password) {
            alert("Please fix the errors before submitting.");
            return;
        }

        axios.post("http://localhost:8080/login", data).then(
            (response) => {
                if (response.data.status === "success") {
                    sessionStorage.setItem("token", response.data.token);
                    sessionStorage.setItem("userid", response.data.userid);
                    sessionStorage.setItem("role", response.data.role);
                    sessionStorage.setItem("name", response.data.name);

                    const userRole = response.data.role;

                    if (userRole === "Doctor") {
                        navigate('/DoctorDashboard');
                    } else if (userRole === "Technician") {
                        navigate('/TechnicianDashboard');
                    } else if (userRole === "Admin") {
                        navigate('/AdminDashboard');
                    } else {
                        alert("Invalid role");
                    }
                } else {
                    alert(response.data.status);
                }
            }
        ).catch((error) => {
            console.log(error.message);
            alert(error.message);
        });
    };

    return (
        <div className="login-page">
            <div className="login">
                <div className="container">
                    <header className="header">
                        <h1 className="project-name">Dent Tech Solutions</h1>
                        <p className="tagline">Connecting Dental Labs and Professionals</p>
                    </header>

                    <div className="login-container">
                        <div className="row">
                            <div className="col-12">
                                <h2 className="login-title">Login to Your Account</h2>
                                <div className="row g-3">
                                    <div className="col-12">
                                        <label htmlFor="email" className="form-label">Email</label>
                                        <input
                                            type="text"
                                            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                            name='email'
                                            value={data.email}
                                            onChange={inputHandler}
                                            required
                                        />
                                        {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                                    </div>
                                    <div className="col-12">
                                        <label htmlFor="password" className="form-label">Password</label>
                                        <input
                                            type="password"
                                            className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                                            name='password'
                                            value={data.password}
                                            onChange={inputHandler}
                                            required
                                        />
                                        {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                                    </div>
                                    <div className="col-12">
                                        <button className="btn btn-success" onClick={readValue}>Login</button>
                                        <p className="register-prompt">Don't have an account? <Link to='/signup'>Register here</Link></p>
                                    </div>
 </div>
                            </div>
                        </div>
                    </div>

                    <div className="product-catalog">
                        <h2 className="catalog-title">Explore Our Products</h2>
                    </div>

                    <footer className="footer">
                        <p>&copy; 2024 Dent Tech Solutions | Building bridges between dental professionals</p>
                    </footer>
                </div>
            </div>
        </div>
    );
};

export default Login;