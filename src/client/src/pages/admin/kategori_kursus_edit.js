import React, { useEffect, useState } from "react";
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';

import AdminSidebar from "../../components/admin_sidebar/admin_sidebar";
import 'draft-js/dist/Draft.css';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import { Link, useNavigate, useParams } from "react-router-dom";

function AdminKategoriKursusEdit() {
    const { id } = useParams(); // Get the item ID from the route
    const [formData, setFormData] = useState({
        name: '',
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
            const response = await fetch(`/admin/category/course/edit/${id}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Failed to save!');
            }

            // Navigate to the success page and pass a success message
            navigate('/admin/kategori/artikel', { state: { success: 'Kategori berhasil disimpan!' } });
        } catch (error) {
            console.error('Error:', error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const getData = async () => {

        const response = await fetch(`/admin/category/course/edit/${id}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        });
        
        const data = await response.json();

        setFormData({
            name: data.name
        })
    }
    
    useEffect(() => {

        getData();
    }, [id])

    return (
        <div style={{ padding: 25 }} className="d-flex position-relative">
            <AdminSidebar />

            <div style={{ paddingLeft: '30px' }} className="col">
                <div className="mb-3">
                    <div className="mb-4">
                        <span className="fs-4 " style={{
                            color: '#028430',
                            fontWeight: 'bold',
                        }}>Ubah Kategori Kursus</span>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label">Nama Kategori Kursus</label>
                            <input onChange={handleChange} value={formData.name} required name="name"  type="text" className="form-control" style={{ borderColor: '#028430', boxShadow: 'none', }} placeholder="Kategori Kursus" />
                        </div>
                        <div className="mb-3 text-end">
                            <Link to={'/admin/kategori/kursus'}>
                                <button className="btn text-white rounded-5 px-4 fw-bold me-3" style={{ backgroundColor: '#CF2B27', }}>Kembali</button>
                            </Link>
                            <button disabled={loading} type="submit" className="btn text-white rounded-5 px-4 fw-bold" style={{ backgroundColor: '#028430', }}>Simpan</button>
                        </div>
                    </form>
                </div>
            </div>
        </div >
    );
}

export default AdminKategoriKursusEdit;
