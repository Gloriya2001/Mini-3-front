import React, { useState } from 'react';
import AdminNavbar from './AdminNavbar';
import axios from 'axios';

const AddProduct = () => {
    const [data, setData] = useState({
        product_name: "",
        about_product: "",
        product_price: "",
        product_img: ""
    });

    const [productImg, setImg] = useState(null);

    const inputHandler = (event) => {
        setData({ ...data, [event.target.name]: event.target.value });
    };

    const handleImgChange = (event) => {
        const file = event.target.files[0];
        setImg(file);
    };

    const readValue = () => {
        const requiredFields = [
            data.product_name,
            data.about_product,
            data.product_price,
        ];
        const allFieldsFilled = requiredFields.every(field => field.trim() !== "");

        const formData = new FormData();
        for (const key in data) {
            formData.append(key, data[key]);
        }

        if (productImg) {
            formData.append('product_img', productImg); // Append the image file
        }

        if (allFieldsFilled && productImg) {
            axios.post("http://localhost:8080/addProduct", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }).then((response) => {
                console.log(response.data);
                if (response.data.status === "added") {
                    alert("SUCCESSFULLY ADDED");
                    // Clear the input fields
                    setData({
                        product_name: "",
                        about_product: "",
                        product_price: "",
                        product_img: ""
                    });
                    setImg(null); // Clear the image file
                } else {
                    alert("ERROR");
                }
            }).catch((error) => {
                console.error("Error:", error.response ? error.response.data : error.message);
                alert("Error adding product");
            });
        } else {
            alert("Please fill all fields and select an image.");
        }
    };

    return (
        <div>
            <AdminNavbar />
            <div className="container">
                <div className="row g-3">
                    <div className="col col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                        <label className="form-label">Product Image</label>
                        <input type="file" className="form-control" onChange={handleImgChange} name='product_img' />
                    </div>
                    <div className="col col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                        <label className="form-label">Product Name</label>
                        <input type="text" className="form-control" name='product_name' onChange={inputHandler} value={data.product_name} />
                    </div>
                    <div className="col col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col -xxl-6">
                        <label className="form-label">About Product</label>
                        <input type="text" className="form-control" name='about_product' onChange={inputHandler} value={data.about_product} />
                    </div>
                    <div className="col col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                        <label className="form-label">Product Price</label>
                        <input type="text" className="form-control" name='product_price' onChange={inputHandler} value={data.product_price} />
                    </div>
                    <div className="col col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                        <button className="btn btn-success" onClick={readValue}>ADD</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddProduct;