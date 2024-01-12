import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Header from '../components/header';
import './styles/deviceDetails.css';

const DeviceDetails = ({ loggedInUser }) => {
    const { id } = useParams();
    const [device, setDevice] = useState(null);
    const [category, setCategory] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchDeviceDetails = async () => {
            const token = localStorage.getItem('token');

            try {
                const response = await axios.get(`http://localhost:4444/devices/${id}`);
                setDevice(response.data);
                console.log("RESPONSE", response);
                const categoryId = response.data.category;
                console.log("CategoryID", categoryId);
                if (categoryId != null && categoryId != undefined) {
                    const categoryResponse = await axios.get(`http://localhost:4444/deviceCategory/${categoryId}`);
                    console.log(categoryResponse);
                    setCategory(categoryResponse.data.name);
                }
            } catch (error) {
                console.error('Error fetching device details:', error.message);
            }
        };


        fetchDeviceDetails();
    }, [id,]);


    const handleDeleteDevice = async () => {
        try {
            const token = localStorage.getItem('token');
            const resp = await axios.delete(`http://localhost:4444/devices/${id}`, {
                headers: {
                    Authorization: token
                },
            });
            console.log(resp);
            navigate("/");

        } catch (error) {
            console.error('Error deleting device:', error.message);
        }
    };

    if (!device) {
        return <p>Loading...</p>;
    }
    return (

        <div><Header />
            <div className="containerr">

                <p className="trip-detailsss">Name: {device.name}</p>
                <p className="trip-detailsss">Category: {category || 'Unknown'}</p>
                <p className="trip-detailsss">Price: {device.price}</p>

                {loggedInUser && (
                    <button className="trip-detailss" onClick={handleDeleteDevice}>Delete device</button>
                )}
                {loggedInUser && (
                    <Link to={`/edit-device/${id}`}>
                        <button className="trip-detailss">Edit device</button>
                    </Link>
                )}
            </div>
        </div>
    );
};

export default DeviceDetails;