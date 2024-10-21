import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Login = () => {

    const [data, setData] = useState(
        {
            email: "",
            password: ""
        }

    )

    const inputHandler = (event) => {
        setData({ ...data, [event.target.name]: event.target.value })

    }

    const readValue = () => {

        axios.post("http://localhost:8080/login", data).then(
            (response) => {
                if (response.data.status == "success") {
                    sessionStorage.setItem("token", response.data.token)
                    sessionStorage.setItem("userid", response.data.userid)
                    sessionStorage.setItem("role", response.data.role);
                    sessionStorage.setItem("name", response.data.name);


                    const userRole = response.data.role;

                    // Navigate based on the role
                    if (userRole === "Doctor") {
                        navigate('/DoctorDashboard');
                    } else if (userRole === "Technician") {
                        navigate('/TechnicianDashboard');
                    } else if (userRole === "Admin") {
                        navigate('/AdminDashboard'); // If you have an admin dashboard
                    } else {
                        alert("Invalid role");
                    }


                } else {
                    alert(response.data.status)
                }


            }
        ).catch(
            (error) => {
                console.log(error.message)
                alert(error.message)
            }
        ).finally()
    }


    let navigate = useNavigate()



    return (
        <div>



            <div className="container">
                <div className="row">
                    <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">

                        <div className="row g-3">

                            <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">

                                <label htmlFor="" className="form-label">email</label>
                                <input type="text" className="form-control" name='email' value={data.email} onChange={inputHandler} />

                            </div>

                            <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">

                                <label htmlFor="" className="form-label">Password</label>
                                <input type="password" className="form-control" name='password' value={data.password} onChange={inputHandler} />

                            </div>


                            <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                <button className="btn btn-success" onClick={readValue}>login</button>
                                <p>Don't have an account?<Link to='/signup'> Register here</Link></p>

                            </div>


                        </div>
                    </div>




                </div>


            </div>



        </div >
    )
}

export default Login