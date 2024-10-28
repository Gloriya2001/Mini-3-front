import React, { useEffect, useState } from 'react';
import AdminNavbar from './AdminNavbar';
import axios from 'axios';
import './ProductPrize.css';

const ProductPrize = () => {
    const [data, setdata] = useState({
        "category": "",
        "price": ""
    });

    const [viewdata, changedata] = useState([]);

    const inputHandler = (event) => {
        setdata({ ...data, [event.target.name]: event.target.value });
    };

    const readValue = () => {
        console.log(data);
        axios.post("http://localhost:8080/addPrice", data).then(
            (response) => {
                console.log(response.data);
                if (response.data.status === "added") {
                    alert("SUCCESSFULLY ADDED");
                    // Update the viewdata state with the new item
                    changedata([...viewdata, { category: data.category, price: data.price, _id: response.data._id }]);
                    // Reset the form
                    setdata({ category: "", price: "" });
                } else {
                    alert("ERROR");
                }
            }
        ).catch((error) => {
            console.error("Error adding price:", error);
            alert("Error adding price");
        });
    };

    const fetchdata = () => {
        axios.post("http://localhost:8080/viewPrice").then(
            (response) => {
                changedata(response.data);
            }
        ).catch(
            (error) => {
                console.log(error.message);
                alert(error.message);
            }
        ).finally(
            console.log(data)
        );
    };

    useEffect(() => {
        fetchdata();
    }, []);

    const deletePrice = (id) => {
        let input = { "_id": id };
        axios.post("http://localhost:8080/deletePrice", input).then(
            (response) => {
                if (response.data.status === "deleted") {
                    alert("Deleted Successfully");
                    // Update the viewdata state to remove the deleted item
                    changedata(viewdata.filter(item => item._id !== id));
                } else {
                    alert("Error");
                }
            }
        ).catch((error) => {
            console.error("Error deleting price:", error);
            alert("Error deleting price");
        });
    };

    return (
        <div>
            <AdminNavbar />
            <div className="container">
                <div className="row g-3">
                    <div className="col col-12">
                        <label className="form-label">Category</label>
                        <input type="text" className="form-control" name='category' onChange={inputHandler} value={data.category} />
                    </div>
                    <div className="col col-12">
                        <label className="form-label">Price</label>
                        <input type="text" className="form-control" name='price' onChange={inputHandler} value={data.price} />
                    </div>
                    <div className="col col-12">
                        <button className="btn btn-success" onClick={readValue}>ADD</button>
                    </div>
                    <div className="col col-12">
                        <center><h1><b>Price Catalog</b></h1></center><br />
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">Category</th>
                                    <th scope="col">Price</th>
                                    <th scope="col">Delete Item</th>
                                </tr>
                            </thead>
                            <tbody>
                                {viewdata.map((value) => {
                                    return (
                                        <tr key={value._id}>
                                            <td>{value.category}</td>
                                            <td>{value.price}</td>
                                            <td>
                                                <button className="btn btn-danger" onClick={() => deletePrice(value._id)}>DELETE</button>
                                            </td>
                                        </tr>
                                    );
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