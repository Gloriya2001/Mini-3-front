import React, { useEffect, useState } from 'react';
import './CaseManage.css';
import { ReactComponent as TeethDiagram } from '../icons/teeth_demo.svg';
import Navbar from './Navbar';
import axios from 'axios';

const CaseManage = () => {
    const [selectedTeeth, setSelectedTeeth] = useState([]);
    const [doctorName, setDoctorName] = useState('');
    const [data, setData] = useState({
        patient_name: "",
        doctor_name: "",
        file_num: "",
        date: "",
        shade1: "",
        shade2: "",
        shade3: "",
        category: "",
        tooth_count: "",
        tooth_detail: "",
        order_count: "",
        oral_scan: "",
        Remarks: "",
        technician_id: "",
        product: "",
        price: "",
        total_price: "",
        order_id: "",
        order_status: ""
    });

    const [oralScan, setOralScan] = useState(null);
    const [selectedColor1, setSelectedColor1] = useState('');
    const [selectedColor2, setSelectedColor2] = useState('');
    const [selectedColor3, setSelectedColor3] = useState('');
    const [colorOptions] = useState([
        { name: 'A1', value: 'A1' },
        { name: 'A2', value: 'A2' },
        { name: 'A3', value: 'A3' },
        { name: 'A3.5', value: 'A3.5' },
        { name: 'A4', value: 'A4' },
        { name: 'B1', value: 'B1' },
        { name: 'B2', value: 'B2' },
        { name: 'B3', value: 'B3' },
        { name: 'B4', value: 'B4' },
        { name: 'C1', value: 'C1' },
        { name: 'C2', value: 'C2' },
        { name: 'C3', value: 'C3' },
        { name: 'C4', value: 'C4' },
        { name: 'D2', value: 'D2' },
        { name: 'D3', value: 'D3' },
        { name: 'D4', value: 'D4' },
    ]);

    useEffect(() => {
        const name = sessionStorage.getItem("name");
        const id = sessionStorage.getItem("userid");
        if (name) {
            setDoctorName(name);
            setData(prevData => ({ ...prevData, doctor_name: name }));
        }
    }, []);

    const inputHandler = (event) => {
        setData(prevData => ({ ...prevData, [event.target.name]: event.target.value }));
    };

    const handleColorChange = (setter) => (event) => {
        setter(event.target.value);
        inputHandler({ target: { name: event.target.name, value: event.target.value } });
    };

    const handleOralScanChange = (event) => {
        const file = event.target.files[0];
        setOralScan(file);
    };

    const readValue = () => {
        const requiredFields = [
            data.patient_name,
            data.file_num,
            data.date,
            data.category,
            data.shade1,
            data.shade2,
            data.shade3,
            data.tooth_detail,
            data.Remarks
        ];
        const id = sessionStorage.getItem("userId");
        if (id) {
            formData.append('user', id); // Assuming 'user' is the field name in your order model
        } else {
            console.error("User  ID not found in sessionStorage");
        }

        const allFieldsFilled = requiredFields.every(field => field.trim() !== "");
        const formData = new FormData();

        for (const key in data) {
            formData.append(key, data[key]);
        }

        if (oralScan) {
            formData.append('oral_scan', oralScan);
        }

        if (allFieldsFilled) {
            axios.post("http://localhost:8080/addorder", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }).then((response) => {
                alert(response.data.status === "added" ? "SUCCESSFULLY ADDED" : "ERROR");
            }).catch((error) => {
                console.error("Error:", error.response ? error.response.data : error.message);
                alert("Error adding order");
            });
        } else {
            alert("Fill data");
        }
    };

    // Handle tooth selection
    const handleToothClick = (toothId) => {
        setSelectedTeeth((prevSelected) => {
            const isSelected = prevSelected.includes(toothId);

            const updatedSelectedTeeth = isSelected
                ? prevSelected.filter((id) => id !== toothId)
                : [...prevSelected, toothId];

            const toothElement = document.getElementById(toothId);
            if (toothElement) {
                toothElement.style.fill = isSelected ? '#ffffff' : 'blue';
            }

            inputHandler({ target: { name: 'tooth_detail', value: updatedSelectedTeeth.join(', ') } });

            return updatedSelectedTeeth;
        });
    };

    // Select all teeth
    const selectFullTeeth = () => {
        const svg = document.querySelector('.teeth-diagram');
        const allToothIds = Array.from(svg.querySelectorAll('path')).map(tooth => tooth.getAttribute('id'));
        setSelectedTeeth(allToothIds);

        allToothIds.forEach(id => {
            const toothElement = document.getElementById(id);
            if (toothElement) {
                toothElement.style.fill = 'blue';
            }
        });
    };

    // Deselect all teeth
    const unselectAllTeeth = () => {
        setSelectedTeeth([]);

        const svg = document.querySelector('.teeth-diagram');
        const toothElements = svg.querySelectorAll('path');

        toothElements.forEach(tooth => {
            tooth.style.fill = '#ffffff';
        });
    };

    return (
        <div>
            <Navbar />
            <div className="container">
                <div className="row g-3">
                    <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                        <div className="row g-3">
                            {/* Patient Info Inputs */}
                            <div className="col col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                                <label className="form-label">Doctor Name</label>
                                <input type="text" className="form-control" name='doctor_name' value={data.doctor_name} readOnly />
                            </div>

                            <div className="col col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                                <label className="form-label">Patient Name</label>
                                <input type="text" className="form-control" onChange={inputHandler} name='patient_name' value={data.patient_name} required />
                            </div>

                            <div className="col col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                                <label className="form-label">File Number</label>
                                <input type="text" className="form-control" onChange={inputHandler} name='file_num' value={data.file_num} />
                            </div>

                            <div className="col col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                                <label className="form-label">Expected Date</label>
                                <input type="date" className="form-control" onChange={inputHandler} name='date' value={data.date} />
                            </div>

                            <div className="col col-12">
                                <label className="form-label">Category</label>
                                <select name="category" className="form-control" required onChange={inputHandler} value={data.category}>
                                    <option value="" disabled>Select Category</option>
                                    <option value="Study Model">Study Model</option>
                                    <option value="Dentures">Dentures</option>
                                    <option value="Reline">Reline</option>
                                    <option value="Repair">Repair</option>
                                    <option value="Remake">Remake</option>
                                    <option value="Bridge">Bridge</option>
                                    <option value="Temporary Bridge">Temporary Bridge</option>
                                    <option value="Inlay">Inlay</option>
                                    <option value="Post and Core">Post and Core</option>
                                    <option value="Diagnostic wax-up">Diagnostic wax-up</option>
                                    <option value="Crown">Crown</option>
                                    <option value="Temporary Crown">Temporary Crown</option>
                                    <option value="Onlay">Onlay</option>
                                    <option value="Orthodontic">Orthodontic</option>
                                </select>
                            </div>
                        </div>

                        <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-6 col-xxl-6">
                            <div className="teeth-container">
                                <TeethDiagram className="teeth-diagram" />
                            </div>
                            <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-6 col-xxl-6">
                                {data.tooth_detail ? (
                                    <p>Selected Teeth:{data.tooth_detail}</p>
                                ) : (
                                    <p>No teeth selected</p>
                                )}
                            </div>
                            <div className="button-group">
                                <button className="btn btn-primary" onClick={selectFullTeeth}>Select Full Teeth</button>
                                <button className="btn btn-secondary" onClick={unselectAllTeeth}>Unselect All Teeth</button>
                            </div>

                            <div className="col col-12">
                                <label className="form-label">Units</label>
                                <input type="number" className="form-control" onChange={inputHandler} value={data.tooth_count} name='tooth_count' />
                            </div>
                            <div className="col col-12">
                                <label className="form-label">Price</label>
                                <input type="number" className="form-control" onChange={inputHandler} value={data.total_price} />
                            </div>

                            <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-6 col-xxl-6">
                                <h2>Select Shades</h2>
                                <select onChange={handleColorChange(setSelectedColor1)} defaultValue="" name='shade1'>
                                    <option value="" disabled>Shade 1</option>
                                    {colorOptions.map((option) => (
                                        <option key={option.value} value={option.value}>
                                            {option.name}
                                        </option>
                                    ))}
                                </select>
                                <select onChange={handleColorChange(setSelectedColor2)} defaultValue="" name='shade2'>
                                    <option value="" disabled>Shade 2</option>
                                    {colorOptions.map((option) => (
                                        <option key={option.value} value={option.value}>
                                            {option.name}
                                        </option>
                                    ))}
                                </select>
                                <select onChange={handleColorChange(setSelectedColor3)} defaultValue="" name='shade3'>
                                    <option value="" disabled>Shade 3</option>
                                    {colorOptions.map((option) => (
                                        <option key={option.value} value={option.value}>
                                            {option.name}
                                        </option>
                                    ))}
                                </select>

                                <svg width="500" height="500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600">
                                    <g id="Layer_1">
                                        <title>Layer 1</title>
                                        <path
                                            transform="rotate(90 234.001 237.03)"
                                            stroke="#000"
                                            id="svg_19"
                                            d="m121.18603,236.53174c8.35609,225.49758 233.97062,2.16825 225.6146,0.43366c8.35602,1.73459 -233.97069,-225.93124 -225.6146,-0.43366z"
                                            opacity="NaN"
                                            fill="#fff"
                                        />
                                        <line x1="133.99999" y1="197" x2="331.99999" y2="197" stroke="#000" strokeWidth="2" />
                                        <line x1="159" y1="260" x2="306" y2="260" stroke="#000" strokeWidth="2" />

                                        <text x="230" y="170" fontSize="18" textAnchor="middle" fill="#000" >{selectedColor1}</text>
                                        <text x="230" y="240" fontSize="18" textAnchor="middle" fill="#000">{selectedColor2}</text>
                                        <text x="230" y="290" fontSize="18" textAnchor="middle" fill="#000" >{selectedColor3}</text>
                                    </g>
                                </svg>

                            </div>
                            <div className="col col-12">
                                <label className="form-label">Oral Scan</label>
                                <input type="file" className="form-control" onChange={handleOralScanChange} name='oral_scan' />
                            </div>
                            <div className="col col-12">
                                <label className="form-label">Remarks</label>
                                <input type="text-area" className="form-control" onChange={inputHandler} value={data.Remarks} name='Remarks' />
                            </div>
                            <div className="col col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                                <button class="btn btn-success" onClick={readValue}>ADD</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CaseManage;