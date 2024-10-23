import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import axios from 'axios';

const Profile = () => {
    const [profileData, setProfileData] = useState({
        name: '',
        profile_pic: '',
        email: '',
        role: '',
        address: '',
        phone_number: '',
        doctor_id: '',
        clinic_name: ''
    });

    const [isEditing, setIsEditing] = useState(false);
    const [profileImg, setProfileImg] = useState(null);

    useEffect(() => {
        // Fetch user profile data from the server
        axios.get('http://localhost:8080/getProfile')
            .then(response => {
                setProfileData(response.data);
            })
            .catch(error => {
                console.error("Error fetching profile data:", error);
            });
    }, []);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setProfileData({ ...profileData, [name]: value });
    };

    const handleImgChange = (event) => {
        const file = event.target.files[0];
        setProfileImg(file);
    };

    const handleUpdateProfile = () => {
        const formData = new FormData();
        for (const key in profileData) {
            formData.append(key, profileData[key]);
        }
        if (profileImg) {
            formData.append('profile_pic', profileImg);
        }

        axios.post('http://localhost:8080/updateProfile', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
        .then(response => {
            alert("Profile updated successfully!");
            setIsEditing(false);
        })
        .catch(error => {
            console.error("Error updating profile:", error);
            alert("Error updating profile");
        });
    };

    return (
        <div>
            <Navbar />
            <div className="container">
                <h2>Profile Management</h2>
                <div className="row">
                    <div className="col-md-6">
                        <div className="form-group">
                            <label>Name</label>
                            <input
                                type="text"
                                className="form-control"
                                name="name"
                                value={profileData.name}
                                onChange={handleInputChange}
                                disabled={!isEditing && profileData.name}
                            />
                        </div>
                        <div className="form-group">
                            <label>Email</label>
                            <input
                                type="email"
                                className="form-control"
                                name="email"
                                value={profileData.email}
                                onChange={handleInputChange}
                                disabled={!isEditing && profileData.email}
                            />
                        </div>
                        <div className="form-group">
                            <label>Role</label>
                            <input
                                type="text"
                                className="form-control"
                                name="role"
                                value={profileData.role}
                                onChange={handleInputChange}
                                disabled={!isEditing && profileData.role}
                            />
                        </div>
                        <div className="form-group">
                            <label>Address</label>
                            <input
                                type="text"
                                className="form-control"
                                name="address"
                                value={profileData.address}
                                onChange={handleInputChange}
                                disabled={!isEditing && profileData.address}
                            />
                        </div>
                        <div className="form-group">
                            <label>Phone Number</label>
                            <input
                                type="text"
                                className="form-control"
                                name="phone_number"
                                value={profileData.phone_number}
                                onChange={handleInputChange}
                                disabled={!isEditing && profileData.phone_number}
                            />
                        </div>
                        <div className="form-group">
                            <label>Doctor ID</label>
                            <input
                                type="text"
                                className="form-control"
                                name="doctor_id"
                                value={profileData.doctor_id}
                                onChange={handleInputChange}
                                disabled={!isEditing && profileData.doctor_id}
                            />
                        </div>
                        <div className="form-group">
                            <label>Clinic Name</label>
                            <input
                                type="text"
                                className="form-control"
                                name="clinic_name"
                                value={profileData.clinic_name}
                                onChange={handleInputChange}
                                disabled={!isEditing && profileData.clinic_name}
                            />
                        </div>
                        <div className="form-group">
                            <label>Profile Picture</label>
 <input
                                type="file"
                                className="form-control"
                                onChange={handleImgChange}
                                disabled={!isEditing}
                            />
                        </div>
                    </div>
                </div>
                {isEditing ? (
                    <button className="btn btn-success" onClick={handleUpdateProfile}>
                        Update Profile
                    </button>
                ) : (
                    <button className="btn btn-primary" onClick={() => setIsEditing(true)}>
                        Edit Profile
                    </button>
                )}
            </div>
        </div>
    );
};

export default Profile;