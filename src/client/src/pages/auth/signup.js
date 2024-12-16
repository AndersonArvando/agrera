import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';

import './login.css';
import { Link } from "react-router-dom";

function Signup() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const navigate = useNavigate(); // To redirect after signup

    // Handle form input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form behavior

        setLoading(true);
        setError(null);

        try {
            // Send the form data to the backend for signup
            const response = await fetch('/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Signup failed');
            }

            // Save the token received from the server (auto-login)
            localStorage.setItem('authToken', data.token);

            // Redirect the user to the dashboard page after successful signup and login
            navigate('/user/');

        } catch (error) {
            console.error('Error:', error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="login-container">
            <div className="d-flex flex-wrap no-gutters w-100 h-100">
                <div className="col-md-6 col-12 login-form text-center">
                    <div className="col-12 ">
                        <img src={require("../../image/logo.png")} alt="Logo" className="logo" style={{ width: 200 }} /> {/* Replace with your logo */}
                    </div>
                    <div className="form-container col-lg-10 col-md-12 mx-auto">
                        <h2 className="fw-bold color-primary">Akun Baru</h2>
                        <p className="mb-4">Mari bergabung bersama Agrera, silahkan isi data berikut ini :</p>
                        {error && <div style={{backgroundColor: '#CF2B27'}} className="text-white p-3 mb-3">{error}</div>}
                        <form onSubmit={handleSubmit}>
                            <div className="form-group text-start mb-3">
                                <label className="color-primary fw-semibold mb-1">Nama Lengkap</label>
                                <input required type="text" name="name" value={formData.username} onChange={handleChange} className="form-control" style={{ border: '1px solid #585858', backgroundColor: 'transparent' }} placeholder="Nama Anda" />
                            </div>
                            <div className="form-group text-start mb-3">
                                <label className="color-primary fw-semibold mb-1">Email</label>
                                <input required type="email" name="email" value={formData.email} onChange={handleChange} className="form-control" style={{ border: '1px solid #585858', backgroundColor: 'transparent' }} placeholder="Email Anda" />
                            </div>
                            <div className="form-group text-start mb-3">
                                <label className="color-primary fw-semibold mb-1">Kata Sandi</label>
                                <input required type="password" name="password" value={formData.password} onChange={handleChange} className="form-control" style={{ border: '1px solid #585858', backgroundColor: 'transparent' }} placeholder="Kata Sandi Anda" />

                            </div>
                            <button disabled={loading} className="btn bg-primary fw-semibold text-white rounded-5" style={{ fontSize: 20., paddingLeft: '4rem', paddingRight: '4rem' }}>Daftar</button>
                            <p className="mt-3">
                                Apakah sudah punya akun? <Link to="/login" className="color-primary fw-bold">Masuk disini</Link>
                            </p>
                        </form>
                    </div>
                </div>
                <div className="col-md-6 d-none d-md-block login-image" style={{

                    backgroundImage: "url(" + require("../../image/login_bg.png") + ")",
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                }}>
                </div>
            </div>
        </div>
    );
}

export default Signup;
