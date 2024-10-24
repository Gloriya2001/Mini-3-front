import React, { useEffect, useState } from 'react';
import AdminNavbar from './AdminNavbar';
import axios from 'axios';

const ProductPrize = () => {
    const [elment, setElement] = useState([]); // Correctly set state to hold fetched data
    const [data, setData] = useState({
        category: "",
        price: ""
    });

    const inputHandler = (event) => {
        setData({ ...data, [event.target.name]: event.target.value });
    };

    const fetchData = () => {
        axios.post("http://localhost:8080/viewPrice")
            .then(response => {
                setElement(response.data); // Set fetched data to state
            })
            .catch(error => {
                console.error("Error fetching data:", error.message);
                alert(error.message);
            });
    };

    useEffect(() => {
        fetchData(); // Call fetchData on component mount
    }, []);

    const readValue = () => {
        const requiredFields = [data.category, data.price];
        const allFieldsFilled = requiredFields.every(field => field.trim() !== "");

        const formData = new FormData();
        for (const key in data) {
            formData.append(key, data[key]);
        }

        if (allFieldsFilled) {
            axios.post("http://localhost:8080/addPrice", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }).then(response => {
                if (response.data.status === "added") {
                    alert("SUCCESSFULLY ADDED");
                    setData({ category: "", price: "" });
                    fetchData(); // Refresh the data after adding
                } else {
                    alert("ERROR");
                }
            }).catch(error => {
                console.error("Error adding product:", error.response ? error.response.data : error.message);
                alert("Error adding product");
            });
        } else {
            alert("Please fill all fields");
        }
    };

    const deletePrice = (id) => {
        let input = { "_id": id };
        axios.post("http://localhost:8080/deletePrice", input).then(response => {
            if (response.data.status === "deleted") {
                alert("DELETED SUCCESSFULLY");
                fetchData(); // Refresh the data after deletion
            } else {
                alert("ERROR");
            }
        }).catch(error => {
            console.error("Error deleting product:", error.message);
            alert("Error deleting product");
        });
    };

    return (
        <div>
            <AdminNavbar />
            <div className="container">
                <div className="row g-3">
                    <div className="col">
                        <label className="form-label">Category</label>
                        <input type="text" className="form-control" name='category' onChange={inputHandler} value={data.category} />
                    </div>
                    <div className="col">
                        <label className="form-label">Price</label>
                        <input type="text" className="form-control" name='price' onChange={inputHandler} value={data.price} />
                    </div>
                    <div className="col">
                        <button className="btn btn-success" onClick={readValue}>ADD</button>
                    </div>
                    <div className="col">
                        <center><h1><b>Price Catalog</b></h1></center><br />
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">Category</th>
                                    <th scope="col">Price</th>
                                    <th scope="col">Delete Item</th >
                                </tr>
                            </thead>
                            <tbody>
                                {elment.map((value, i) => {
                                    return <tr>
                                        <td>{value.category}</td>
                                        <td>{value.price}</td>
                                        <td><button className="btn btn-danger" onClick={() => deletePrice(value._id)}>DELETE</button></td>
                                    </tr>
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductPrize;