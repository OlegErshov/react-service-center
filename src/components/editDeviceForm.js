import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

const EditDeviceForm = () => {
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
                const DeviceResponse = await axios.get(`http://localhost:4444/devices/${id}`, {
                    headers: {
                        Authorization: token,
                    },
                });

                const categoryResponse = await axios.get(`http://localhost:4444/DeviceCategory`);

                setFormData({
                    name: DeviceResponse.data.name,
                    price: DeviceResponse.data.price,
                    category: DeviceResponse.data.category,
                });

                setCategories(categoryResponse.data);
            } catch (error) {
                console.error('Error fetching details:', error.message);
            }
        };

        fetchData();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const token = localStorage.getItem('token');
            console.log(formData);
            await axios.put(`http://localhost:4444/devices/${id}`, formData, {
                headers: {
                    Authorization: token,
                },
            });

            navigate(`/`);
        } catch (error) {
            console.error('Error editing device:', error.message);

            if (error.response && error.response.data) {
                setFormError(error.response.data);
            } else {
                setFormError('Error editing device. Please try again.');
            }
        }
    };

    return (
        <form className="form-container" onSubmit={handleSubmit}>
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

            <label className="form-label">
                Country:
                <select
                    className="form-select"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                >
                    {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                            {category.name}
                        </option>
                    ))}
                </select>
            </label>

            <button className="form-button" type="submit">
                Update device.
            </button>

            {formError && <p className="form-error">{formError}</p>}
        </form>
    );
};

export default EditDeviceForm;