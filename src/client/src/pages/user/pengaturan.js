import React, { useEffect, useState } from "react";

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';

import UserSidebar from "../../components/user_sidebar/user_sidebar";
import { NotificationContainer, NotificationManager } from "react-notifications";
import 'react-notifications/lib/notifications.css';

function UserPengaturan() {
    const [image, setImage] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null); // To store the preview URL
    const [loading, setLoading] = useState(true);
    const token = localStorage.getItem('authToken');
    const [formData, setFormData] = useState({
        name: '',
        dob: '',
        city: '',
        email: '',
        mobile_no: '',
    });

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
        const url = URL.createObjectURL(file); // Create a temporary URL for preview
        setPreviewUrl(url);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const fetchData = async () => {
        try {
            const response = await fetch('/user/profile', {
                headers: {
                    Authorization: token,
                },
            });
            const result = await response.json();

            setFormData({
                ...formData,
                name: result.name,
                dob: result.dob,
                city: result.city,
                email: result.email,
                mobile_no: result.mobile_no,
            })
            if(result.image) {
                setImage(result.image)
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false); // Stop loading spinner
        }
    };

    const handleProfileSubmit = async (e) => {
        e.preventDefault();

        try {
            const submissionData = new FormData();
            submissionData.append('name', formData.name);
            submissionData.append('dob', formData.dob);
            submissionData.append('city', formData.city);
            submissionData.append('email', formData.email);
            submissionData.append('mobile_no', formData.mobile_no);
            if (image) submissionData.append('image', image); // Add the image file

            const response = await fetch('/user/profile', {
                method: 'POST',
                headers: {
                    Authorization: token,
                },
                body: submissionData
            });
            const result = await response.json();

            fetchData()
            NotificationManager.success('Profil disimpan!', 'Berhasil');
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false); // Stop loading spinner
        }
    }

    useEffect(() => {
        fetchData();
    }, []);
    return (
        <div style={{ padding: 25 }} className="d-flex position-relative">
            <UserSidebar />

            <div style={{ paddingLeft: '30px' }} className="col">
                <form onSubmit={handleProfileSubmit}>
                    <div className="mb-3">
                        <div className="d-flex align-items-center">
                            {
                                previewUrl ?
                                    <img
                                        src={previewUrl}
                                        alt="Preview"
                                        style={{ width: 90, height: 90, borderRadius: '50%' }}
                                    />
                                    :
                                    image ?
                                        <img src={'/' + image} style={{ width: 90, height: 90, borderRadius: '50%' }}></img> :
                                        <img src={require('../../image/user_profile.png')} style={{ width: 90, height: 90, borderRadius: '50%' }} />
                            }

                            <label for="image">
                                <div className="d-flex align-items-center py-2 px-3 rounded-5 mx-2 mb-3" style={{ backgroundColor: '#028430', cursor: 'pointer' }}>
                                    <span className="fw-semibold text-white">Ganti Foto Profil</span>
                                </div>
                                <input type="file" style={{ display: 'none' }} accept="image/*" name="image" id="image" onChange={handleFileChange} />
                            </label>
                            <div className="mx-2" style={{ color: "#CF2B27", display: 'none' }}>
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="me-1">
                                    <path d="M1.2002 4.0062H14.8002M5.133 3.9998V3.6334C5.133 2.88189 5.43153 2.16115 5.96294 1.62975C6.49434 1.09834 7.21508 0.799805 7.9666 0.799805C8.71811 0.799805 9.43885 1.09834 9.97025 1.62975C10.5017 2.16115 10.8002 2.88189 10.8002 3.6334V3.9998M6.3826 7.1998V11.9998M9.6242 7.1998V11.9998M11.6002 15.1998H4.4002C3.97585 15.1998 3.56888 15.0312 3.26882 14.7312C2.96877 14.4311 2.8002 14.0242 2.8002 13.5998V3.9998H13.2002V13.5998C13.2002 14.0242 13.0316 14.4311 12.7316 14.7312C12.4315 15.0312 12.0245 15.1998 11.6002 15.1998Z" stroke="#CF2B27" stroke-width="1.28" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                                Hapus Foto Profil
                            </div>
                        </div>
                    </div>
                    <div className="mb-3">
                        <div className="mb-3">
                            <label>Nama Lengkap</label>
                            <input value={formData.name} onChange={handleChange} required name="name" type="text" className="form-control rounded-4" style={{ border: '1px solid #B2B2B2' }} placeholder="User123" />
                        </div>
                        <div className="mb-3">
                            <label>Tanggal Lahir</label>
                            <input value={formData.dob} onChange={handleChange} required name="dob" type="date" className="form-control rounded-4" style={{ border: '1px solid #B2B2B2' }} />
                        </div>
                        <div className="mb-3">
                            <label>Kota</label>
                            <input value={formData.city} onChange={handleChange} required name="city" type="text" className="form-control rounded-4" style={{ border: '1px solid #B2B2B2' }} placeholder="Medan" />
                        </div>
                        <div className="mb-3">
                            <label>E-mail</label>
                            <input value={formData.email} onChange={handleChange} required name="email" type="email" className="form-control rounded-4" style={{ border: '1px solid #B2B2B2' }} placeholder="user@gmail.com" />
                        </div>
                        <div className="mb-5">
                            <label>Nomor Telepon</label>
                            <input value={formData.mobile_no} onChange={handleChange} required name="mobile_no" type="text" className="form-control rounded-4" style={{ border: '1px solid #B2B2B2' }} placeholder="08123456789" />
                        </div>
                        <div className="mb-3">
                            <button type="submit" className="btn rounded-5 px-4 py-2 text-white" style={{ backgroundColor: '#028430' }}>Simpan Perubahan</button>
                            {/* <button className="btn rounded-5 px-4 py-2 mx-2 " style={{ backgroundColor: 'white', border: '1px solid #000000', color: 'black' }}>Batalkan</button> */}
                        </div>
                    </div>
                </form>
            </div>
            <NotificationContainer />
        </div >
    );
}

export default UserPengaturan;
