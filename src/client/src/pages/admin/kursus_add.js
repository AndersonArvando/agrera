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
import { Link, useNavigate } from "react-router-dom";

function AdminKursusAdd() {
    const [image, setImage] = useState(null);
    const [pdf, setPDF] = useState(null);
  
    // Handle file selection
    const handleFileChange = (e) => {
      const file = e.target.files[0];
      setImage(file);
    };
    const handlePDFChange = (e) => {
      const file = e.target.files[0];
      setPDF(file);
    };
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        canva_url: '',
        youtube_url: '',
        description: '',
        certificate: '',
        category_id: '',
        image: ''
    });
    const navigate = useNavigate(); // To redirect after signup

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const fetchData = async () => {
        try {
            const response = await fetch('/admin/category/course');
            const result = await response.json();

            setCourses(result); // Update state with fetched data
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false); // Stop loading spinner
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form behavior

        // setLoading(true);
        // setError(null);

        // Create FormData to include both text and image
        const submissionData = new FormData();
        submissionData.append('name', formData.name);
        submissionData.append('description', formData.description);
        submissionData.append('category_id', formData.category_id);
        submissionData.append('youtube_url', formData.youtube_url);
        submissionData.append('canva_url', formData.canva_url);
        submissionData.append('image', image); // Add the image file
        // submissionData.append('pdf', pdf); // Add the image file

        try {
            // Send the form data to the backend for signup
            const response = await fetch('/admin/course/add', {
                method: 'POST',
                body: submissionData
            });
            
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Failed to save!');
            }

            // Navigate to the success page and pass a success message
            navigate('/admin/kursus', { state: { success: 'Kursus berhasil disimpan!' } });
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {

        fetchData();
    }, []);
    return (
        <div style={{ padding: 25 }} className="d-flex position-relative">
            <AdminSidebar />

            <div style={{ paddingLeft: '30px' }} className="col">
                <div className="mb-3">
                    <div className="mb-4">
                        <span className="fs-4 " style={{
                            color: '#028430',
                            fontWeight: 'bold',
                        }}>Tambah Kursus</span>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label">Judul Kursus</label>
                            <input value={formData.title} onChange={handleChange} required name="name" type="text" className="form-control" style={{ borderColor: '#028430', boxShadow: 'none', }} placeholder="Judul Kursus" />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Deskripsi</label>
                            <textarea onChange={handleChange} required name="description" type="text" className="form-control" style={{ borderColor: '#028430', boxShadow: 'none', }} placeholder="Deskripsi">
                                {formData.description}

                            </textarea>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Gambar</label>
                            <input onChange={handleFileChange} name="image" type="file" className="form-control" style={{ borderColor: '#028430', boxShadow: 'none', }}/>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">URL Youtube</label>
                            <input value={formData.youtube_url} onChange={handleChange} required name="youtube_url" type="text" className="form-control" style={{ borderColor: '#028430', boxShadow: 'none', }} placeholder="URL Youtube" />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">URL Canva</label>
                            <input value={formData.canva_url} onChange={handleChange} required name="canva_url" type="text" className="form-control" style={{ borderColor: '#028430', boxShadow: 'none', }} placeholder="URL Youtube" />
                        </div>
                        {/* <div className="mb-3">
                            <label className="form-label">Upload PDF Sertifikat</label>
                            <input onChange={handlePDFChange} name="certificate" type="file" className="form-control" style={{ borderColor: '#028430', boxShadow: 'none', }} placeholder="URL Youtube" />
                        </div> */}
                        <div className="mb-3">
                            <label className="form-label">Kategori</label>
                            <select onChange={handleChange} required name="category_id" className="form-control" style={{ borderColor: '#028430' }}>
                                <option>Pilih Kategori</option>
                                {
                                    courses.length > 0 ? courses.map((item, index) => (
                                        <option value={item.id}>{item.name}</option>
                                    )) : <></>
                                }
                            </select>
                        </div>
                        <div className="mb-3 text-end">
                            <Link to={'/admin/kursus'}>
                                <button className="btn text-white rounded-5 px-4 fw-bold me-3" style={{ backgroundColor: '#CF2B27', }}>Kembali</button>
                            </Link>
                            <button className="btn text-white rounded-5 px-4 fw-bold" style={{ backgroundColor: '#028430', }}>Simpan</button>
                        </div>
                    </form>
                </div>
            </div>
        </div >
    );
}

export default AdminKursusAdd;
