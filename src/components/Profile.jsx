import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import TechNavbar from './TechNavbar';
import axios from 'axios';
import './Profile.css';

const Profile = () => {
    const [userData, setUserData] = useState({
        name: '',
        email: '',
        phone_number: '',
        alternate_phone_number: '',
        address: '',
        doctor_id: '',
        technician_id: '', // Added technician_id
        clinic_name: '',
    });

    const [isEditing, setIsEditing] = useState(false);
    const role = sessionStorage.getItem("role");

    useEffect(() => {
        const userId = sessionStorage.getItem("userid");
        if (userId) {
            fetchUserDetails(userId);
        } else {
            console.log("User  ID not found in session storage.");
        }
    }, []);

    const fetchUserDetails = async (userId) => {
        try {
            const response = await axios.post(`http://localhost:8080/userDetailsView`, { userId });
            const filteredData = {
                name: response.data.name,
                email: response.data.email,
                phone_number: response.data.phone_number,
                alternate_phone_number: response.data.alternate_phone_number,
                address: response.data.address,
                clinic_name: response.data.clinic_name,
            };

            // Conditional inclusion of role-specific fields
            if (role === 'Doctor') {
                filteredData.doctor_id = response.data.doctor_id;
            } else if (role === 'Technician') {
                filteredData.technician_id = response.data.technician_id;
            }

            setUserData(filteredData); // Set user data in state
        } catch (error) {
            console.error("Error fetching user details:", error);
            alert(error.message);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userId = sessionStorage.getItem("userid");
        try {
            await axios.put(`http://localhost:8080/updateProfile/${userId}`, userData);
            alert("Profile updated successfully!");
            setIsEditing(false);
        } catch (error) {
            console.error("Error updating profile:", error);
            alert(error.message);
        }
    };

    return (
        <div>
            {role === 'Doctor' && ( // Conditional rendering based on role
                <div className="container">
                    <Navbar />
                    <h2>User Profile</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="row g-4">
                            {Object.keys(userData).map((key) => (
                                <div className="col col-12 col-sm-6" key={key}>
                                    <label htmlFor={key} className="form-label">
                                        {key.replace(/_/g, ' ').replace(/\b\w/g, char => char.toUpperCase())}
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name={key}
                                        value={userData[key]}
                                        onChange={handleChange}
                                        readOnly={!isEditing} // Make input read-only if not editing
                                    />
                                </div>
                            ))}
                            <div className="col col-12">
                                {!isEditing && (
                                    <button className="btn btn-primary" type="button" onClick={handleEdit}>Edit Profile</button>
                                )}
                                {isEditing && (
                                    <>
                                        <button className="btn btn-success" type="submit">Submit Changes</button>
                                        <button className="btn btn-secondary" type="button" onClick={() => setIsEditing(false)}>Cancel</button>
                                    </>
                                )}
                            </div>
                        </div>
                    </form>
                </div>
            )}

            {role === 'Technician' && ( // Conditional rendering for Technician role
                <div className="container">
                    <TechNavbar />
                    <h2>User Profile</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="row g-4">
                            {Object.keys(userData).map((key) => (
                                <div className="col col-12 col-sm-6" key={key}>
                                    <label htmlFor={key} className="form-label">
                                        {key.replace(/_/g, ' ').replace(/\b\w/g, char => char.toUpperCase())}
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name={key}
                                        value={userData[key]}
                                        onChange={handleChange}
                                        readOnly={!isEditing} // Make input read-only if not editing
                                    />
                                </div>
                            ))}
                            <div className="col col-12">
                                {!isEditing && (
                                    <button className="btn btn-primary" type="button" onClick={handleEdit}>Edit Profile</button>
                                )}
                                {isEditing && (
                                    <>
                                        <button className="btn btn-success" type="submit">Submit Changes</button>
                                        <button className="btn btn-secondary" type="button" onClick={() => setIsEditing(false)}>Cancel</button>
                                    </>
                                )}
                            </div>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
};

export default Profile;