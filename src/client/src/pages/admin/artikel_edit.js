import React, { useEffect, useState } from "react";
import { EditorState, convertFromRaw, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';

import AdminSidebar from "../../components/admin_sidebar/admin_sidebar";
import 'draft-js/dist/Draft.css';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import { stateFromHTML } from 'draft-js-import-html';
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";

function AdminArtikelEdit() {
    const { id } = useParams(); // Get the item ID from the route
    const [image, setImage] = useState(null);
  
    // Handle file selection
    const handleFileChange = (e) => {
      const file = e.target.files[0];
      setImage(file);
    };
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category_id: '',
        source: '',
        image: '',
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
            const response = await fetch('/admin/category/article');
            const result = await response.json();

            setArticles(result); // Update state with fetched data

            const dataResponse = await fetch(`/admin/article/edit/${id}`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            });
            
            const data = await dataResponse.json();
            setFormData({
                ...formData,
                title: data.title,
                source: data.source,
                category_id: data.category_id,
                image: data.image
            })
            const contentState = stateFromHTML(data.description); // Convert from raw JSON
            setEditorState(EditorState.createWithContent(contentState)); 
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false); // Stop loading spinner
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form behavior

        setLoading(true);
        setError(null);

        // Create FormData to include both text and image
        const submissionData = new FormData();
        submissionData.append('title', formData.title);
        submissionData.append('description', draftToHtml(convertToRaw(editorState.getCurrentContent())));
        submissionData.append('category_id', formData.category_id);
        submissionData.append('source', formData.source);
        if(image) submissionData.append('image', image); // Add the image file

        try {
            // Send the form data to the backend for signup
            const response = await fetch(`/admin/article/edit/${id}`, {
                method: 'POST',
                body: submissionData
            });
            
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Failed to save!');
            }

            // Navigate to the success page and pass a success message
            navigate('/admin/artikel', { state: { success: 'Artikel berhasil disimpan!' } });
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
                        }}>Tambah Artikel</span>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label">Judul Artikel</label>
                            <input value={formData.title} onChange={handleChange} required name="title" type="text" className="form-control" style={{ borderColor: '#028430', boxShadow: 'none', }} placeholder="Judul Artikel" />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Gambar Artikel</label>
                            <input onChange={handleFileChange} name="image" type="file" className="form-control" style={{ borderColor: '#028430', boxShadow: 'none', }} placeholder="Judul Artikel" />
                            {formData.image ? <img src={'/' + formData.image} style={{width: '50%'}} className="my-3"></img> : ''}
                            
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Kategori</label>
                            <select value={formData.category_id} onChange={handleChange} required name="category_id" className="form-control" style={{ borderColor: '#028430' }}>
                                <option>Pilih Kategori</option>
                                {
                                    articles.length > 0 ? articles.map((item, index) => (
                                        <option value={item.id}>{item.name}</option>
                                    )) : <></>
                                }
                            </select>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Source</label>
                            <input value={formData.source} onChange={handleChange} required name="source" type="text" className="form-control" style={{ borderColor: '#028430', boxShadow: 'none', }} placeholder="Judul Artikel" />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Deskripsi</label>
                            <div style={{ border: '1px solid #ddd', padding: '10px', minHeight: '400px' }}>
                                <Editor
                                    editorState={editorState}
                                    wrapperClassName="demo-wrapper"
                                    editorClassName="demo-editor"
                                    onEditorStateChange={setEditorState}
                                />
                                <textarea
                                    className="d-none" onInput={handleChange} onChange={handleChange} name="description"  value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
                                />
                            </div>
                        </div>
                        <div className="mb-3 text-end">
                            <Link to={'/admin/artikel'}>
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

export default AdminArtikelEdit;
