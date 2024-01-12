import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

const AddDeviceForm = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [formData, setFormData] = useState({
        name: '',
        price: 0,
        category: '',
    });
    const [categories, setCategories] = useState([]);
    const [formError, setFormError] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem('token');

            try {
                const categoriesResponse = await axios.get(`http://localhost:4444/deviceCategory`);
                console.log('категории при добавление устройства',categoriesResponse.data);
                setCategories(categoriesResponse.data);
                //console.log(categories)
            } catch (error) {
                console.error('Error fetching details:', error.message);
            }
        };

        fetchData();
    }, [id]);

    const handleChange = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
        console.log(name,value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const token = localStorage.getItem('token');
            console.log(`add device token: ${token}`);
            console.log('FormData:',formData);
            await axios.post(`http://localhost:4444/devices`, formData, {
                headers: {
                    Authorization: token,
                },
            });

            navigate(`/`);
        } catch (error) {
            console.error('Error addiing device:', error.message);
            console.log(error.response);

            if (error.response && error.response.data) {
                setFormError(error.response.data);
            } else {
                setFormError('Error adding device. Please try again.');
            }
        }
    };

    return (
        <form className="form-container" onSubmit={handleSubmit}>

            <label className="form-label">
                Category:
                <select
                    className="form-select"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                >
                    {categories.map((category) => (
                        <option key={category._id} value={category._id}>
                            {category.name}
                        </option>
                    ))}
                </select>
            </label>

            <label className="form-label">
                Name:
                <input
                    className="form-input"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                />
            </label>

            <label className="form-label">
                Price:
                <input
                    className="form-input"
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                />
            </label>


            <button className="form-button" type="submit">
                Create Device.
            </button>

            {formError && <p className="form-error">{formError}</p>}
        </form>
    );
};

export default AddDeviceForm;