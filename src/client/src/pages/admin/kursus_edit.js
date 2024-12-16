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

function AdminKursusEdit() {
    const [quizzes, setQuizzes] = useState([]); // Store all quizzes (fetched + new)
    const [modules, setModules] = useState([]);
    const { id } = useParams(); // Get the item ID from the route
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
        summary: '',
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

            const dataResponse = await fetch(`/admin/course/edit/${id}`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            });

            const data = await dataResponse.json();
            setModules(data.modules); // Update state with fetched data
            setQuizzes(data.quizzes); // Update state with fetched data

            setFormData({
                ...formData,
                name: data.name,
                canva_url: data.canva_url,
                youtube_url: data.youtube_url,
                description: data.description,
                summary: data.summary,
                certificate: data.certificate,
                category_id: data.category_id,
                image: data.image,
                quizzes: quizzes,
                modules: modules,
            })
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false); // Stop loading spinner
        }
    };

    const handleModuleChange = (index, field, value) => {
        const newModules = [...modules];
        newModules[index][field] = value;
        setModules(newModules);
    };

    // Add a new empty module
    const addModule = () => {
        setModules([...modules, { id: null, title: '', description: "" }]); // `id: null` indicates a new module
    };

    // Remove a module
    const removeModule = (index) => {
        const newModules = modules.filter((_, i) => i !== index);
        setModules(newModules);
    };

    const handleQuizChange = (index, field, value) => {
        const newQuizzes = [...quizzes];
        newQuizzes[index].choices = JSON.parse(newQuizzes[index].choices);
        if (field === "choices") {
            newQuizzes[index].choices = [...newQuizzes[index].choices];
            newQuizzes[index].choices[value.index] = value.value;
        } else {
            newQuizzes[index][field] = value;
        }
        newQuizzes[index].choices = JSON.stringify(newQuizzes[index].choices);
        setQuizzes(newQuizzes);
    };

    // Add a new empty quiz
    const addQuiz = () => {
        setQuizzes([
            ...quizzes,
            { id: null, question: "", choices: JSON.stringify(["", "", "", ""]), answer: 1 },
        ]); // `id: null` indicates a new quiz
    };

    // Remove a quiz
    const removeQuiz = (index) => {
        const newQuizzes = quizzes.filter((_, i) => i !== index);
        setQuizzes(newQuizzes);
    };


    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form behavior

        setLoading(true);
        setError(null);

        // Create FormData to include both text and image
        const submissionData = new FormData();
        submissionData.append('name', formData.name);
        submissionData.append('description', formData.description);
        submissionData.append('category_id', formData.category_id);
        submissionData.append('youtube_url', formData.youtube_url);
        submissionData.append('canva_url', formData.canva_url);
        submissionData.append('summary', formData.summary);
        submissionData.append('modules', JSON.stringify(modules));
        submissionData.append('quizzes', JSON.stringify(quizzes));
        if (image) submissionData.append('image', image); // Add the image file
        if (pdf) submissionData.append('pdf', pdf); // Add the image file

        try {
            // Send the form data to the backend for signup
            const response = await fetch(`/admin/course/edit/${id}`, {
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
                        }}>Edit Kursus</span>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label">Judul Kursus</label>
                            <input value={formData.name} onChange={handleChange} required name="name" type="text" className="form-control" style={{ borderColor: '#028430', boxShadow: 'none', }} placeholder="Judul Kursus" />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Deskripsi</label>
                            <textarea value={formData.description} onChange={handleChange} required name="description" type="text" className="form-control" style={{ borderColor: '#028430', boxShadow: 'none', }} placeholder="Deskripsi">
                                {formData.description}

                            </textarea>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Rangkuman</label>
                            <textarea value={formData.summary} onChange={handleChange} required name="summary" type="text" className="form-control" style={{ borderColor: '#028430', boxShadow: 'none', }} placeholder="Rangkuman">
                                {formData.summary}

                            </textarea>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Gambar</label>
                            <input onChange={handleFileChange} name="image" type="file" className="form-control" style={{ borderColor: '#028430', boxShadow: 'none', }} />
                            {formData.image ? <img src={'/' + formData.image} style={{ width: '50%' }} className="my-3"></img> : ''}
                        </div>
                        <div className="mb-3">
                            <label className="form-label">URL Youtube</label>
                            <input value={formData.youtube_url} onChange={handleChange} required name="youtube_url" type="text" className="form-control" style={{ borderColor: '#028430', boxShadow: 'none', }} placeholder="URL Youtube" />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">URL Canva</label>
                            <input value={formData.canva_url} onChange={handleChange} required name="canva_url" type="text" className="form-control" style={{ borderColor: '#028430', boxShadow: 'none', }} placeholder="URL Youtube" />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Upload PDF Sertifikat</label>
                            <input onChange={handlePDFChange} name="certificate" type="file" className="form-control" style={{ borderColor: '#028430', boxShadow: 'none', }} placeholder="URL Youtube" />
                            {formData.certificate ? <a href={'/' + formData.certificate} target="_blank">View PDF</a> : ''}
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Kategori</label>
                            <select value={formData.category_id} onChange={handleChange} required name="category_id" className="form-control" style={{ borderColor: '#028430' }}>
                                <option>Pilih Kategori</option>
                                {
                                    courses.length > 0 ? courses.map((item, index) => (
                                        <option value={item.id}>{item.name}</option>
                                    )) : <></>
                                }
                            </select>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Modul</label>
                            <table className="table table-bordered" cellPadding={10}>
                                <tr>
                                    <th>Judul</th>
                                    <th>Deskripsi</th>
                                    <th>Aksi</th>
                                </tr>

                                {modules.map((module, index) => (
                                    <tr>
                                        <td>
                                            <input required className="form-control"
                                                placeholder="Judul Modul"
                                                value={module.title}
                                                onChange={(e) => handleModuleChange(index, 'title', e.target.value)} style={{ borderWidth: '1px' }}/>
                                        </td>
                                        <td>
                                            <textarea required className="form-control"
                                                placeholder="Deskripsi Modul"
                                                value={module.description}
                                                onChange={(e) => handleModuleChange(index, 'description', e.target.value)}
                                                rows={3}
                                                cols={50} style={{ borderWidth: '1px' }}></textarea>
                                        </td>
                                        <td>

                                            <button type="button" className="btn text-white rounded-5 px-4 fw-bold me-3" style={{ backgroundColor: '#CF2B27', }} onClick={() => removeModule(index)}>
                                                Hapus
                                            </button>

                                        </td>
                                    </tr>
                                ))}
                            </table>
                            <button type="button" className="btn text-white rounded-5 px-4 fw-bold" style={{ backgroundColor: '#028430', }} onClick={addModule}>Tambah Modul</button>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Quiz</label>
                            <table className="table table-bordered" cellPadding={10}>
                                <tr>
                                    <th>Pertanyaan</th>
                                    <th>Pilihan</th>
                                    <th>Jawaban yang benar</th>
                                    <th>Aksi</th>
                                </tr>

                                {quizzes.length > 0 && quizzes.map((quiz, index) => (
                                    <tr>
                                        <td>
                                            <textarea required className="form-control"
                                                placeholder="Pertanyaan"
                                                value={quiz.question}
                                                onChange={(e) => handleQuizChange(index, "question", e.target.value)}
                                                rows={3}
                                                cols={40} style={{ borderWidth: '1px' }}>{quiz.question}</textarea>
                                        </td>
                                        <td>
                                            {console.log(JSON.parse(quiz.choices))}
                                            {quiz.choices && JSON.parse(quiz.choices).map((choice, i) => (
                                                <input required className="form-control mb-2"
                                                    key={i}
                                                    type="text"
                                                    placeholder={`Isi Pilihan`}
                                                    value={choice} style={{ borderWidth: '1px' }}
                                                    onChange={(e) =>
                                                        handleQuizChange(index, "choices", { index: i, value: e.target.value })
                                                    }
                                                />
                                            ))}
                                        </td>
                                        <td>
                                            <select required className="form-control"
                                                value={quiz.answer}
                                                style={{ borderWidth: '1px' }}
                                                onChange={(e) => handleQuizChange(index, "answer", parseInt(e.target.value))}
                                            >
                                                <option value={0}>A</option>
                                                <option value={1}>B</option>
                                                <option value={2}>C</option>
                                                <option value={3}>D</option>
                                            </select>
                                        </td>
                                        <td>

                                            <button type="button" className="btn text-white rounded-5 px-4 fw-bold me-3" style={{ backgroundColor: '#CF2B27', }} onClick={() => removeQuiz(index)}>
                                                Hapus
                                            </button>

                                        </td>
                                    </tr>
                                ))}
                            </table>
                            <button type="button" className="btn text-white rounded-5 px-4 fw-bold" style={{ backgroundColor: '#028430', }} onClick={addQuiz}>Tambah Quiz</button>
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

export default AdminKursusEdit;
