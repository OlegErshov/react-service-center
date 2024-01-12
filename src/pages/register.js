// Register.js
import React from 'react';
import RegisterForm from '../components/registerForm';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = ({ onRegister }) => {
    const navigate = useNavigate();
    const handleRegister = async (email, password, name) => {
        try {
            const role = 'Admin';
            const response = await axios.post('http://localhost:4444/auth/register', {
                name,
                email,
                password,
                role
            });
            console.log(response.data, 'jaba1');
            localStorage.setItem('token', response.data);
            onRegister(response.data);
            navigate('/');
        } catch (error) {
            console.error('Registration error:', error.message);
        }
    };

    return (
        <div>
            <RegisterForm onSubmit={handleRegister} />
        </div>
    );
};

export default Register;