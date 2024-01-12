import React from 'react';
import AddDeviceForm from '../components/addDeviceForm';
import { useNavigate } from "react-router-dom";

const AddDevicePage = () => {
    const navigate = useNavigate();

    return (
        <div>
            <AddDeviceForm />
        </div>
    );
};

export default AddDevicePage;