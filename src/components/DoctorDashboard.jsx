import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Navbar from './Navbar';

const DoctorDashboard = () => {
    const [doctorName, setDoctorName] = useState('');
    const [data, changedata] = useState([])
    useEffect(() => {
        // Retrieve the doctor's name from session storage
        const name = sessionStorage.getItem("name");
        if (name) {
            setDoctorName(name);
        } else {
            console.log("Doctor's name not found in session storage.");
        }
    }, []);
    const fetchdata = () => {
        axios.post("http://localhost:8080/viewProduct", data).then(
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

    const styles = {
        container: {
            padding: '20px',
            maxWidth: '1200px',
            margin: '0 auto',
        },
        row: {
            display: 'flex',
            flexWrap: 'wrap',
            gap: '20px',
        },
        card: {
            border: '1px solid #ddd',
            borderRadius: '10px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            width: '100%',
            maxWidth: '500px',
            margin: 'auto',
        },
        cardImg: {
            width: '100%',
            height: '300px',
            objectFit: 'cover',
            borderRadius: '10px 10px 0 0',
        },
        cardBody: {
            padding: '15px',
            textAlign: 'center',
        },
        productTitle: {
            fontSize: '24px',
            fontWeight: 'bold',
            marginBottom: '10px',
        },
        productDetail: {
            fontSize: '18px',
            color: '#555',
            marginBottom: '10px',
        },
        btnDanger: {
            backgroundColor: '#dc3545',
            border: 'none',
            padding: '10px 20px',
            color: '#fff',
            cursor: 'pointer',
            borderRadius: '5px',
        },
        heading: {
            textAlign: 'center',
            fontSize: '32px',
            fontWeight: 'bold',
            margin: '20px 0',
        },
        buttonRow: {
            display: 'flex',
            justifyContent: 'center',
            padding: '10px',
        }
    }



    return (
        <div>
            <Navbar/>
            <div className="container">
                <h1>Welcome, {doctorName}!</h1> {/* Display the doctor's name */}
                {/* Additional content for the Doctor Dashboard can go here */}
            </div>
            <div style={styles.container}>
                <center><h1 style={styles.heading}><b>PRODUCT CATALOG</b></h1></center><br />
                <div style={styles.row}>
                    {data.map((value, i) => {
                        return (
                            <div key={i} style={styles.card}>
                                <div style={styles.cardBody}>
                                    <h3 style={styles.productTitle}>{value.product_name}</h3>
                                    <img src={`http://localhost:8080/${value.product_img}`} style={styles.cardImg} alt="Product_image" />
                                    <h4 style={styles.productDetail}>Material: {value.about_product}</h4>
                                    <h4 style={styles.productDetail}>Price: ₹{value.product_price}</h4>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
export default DoctorDashboard