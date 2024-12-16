import React, { useEffect, useState } from "react";

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import Header from "../../components/header/header";
import Footer from "../../components/footer/footer";

import './forum.css';
import { Link } from "react-router-dom";

function Forum() {
    const [courses, setCourses] = useState([]);
    const [forums, setForums] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        try {
            const response = await fetch('/admin/category/course');
            const result = await response.json();
            setCourses(result); // Update state with fetched data

            const forums = await fetch('/user/forums');
            const forumResult = await forums.json();

            setForums(forumResult); // Update state with fetched data
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false); // Stop loading spinner
        }
    };

    useEffect(() => {
        fetchData();
    }, [])
    return (
        <div>
            <Header />
            <div style={{ marginBottom: '6rem' }}>
                <div className="background-image d-flex flex-wrap" style={{
                    backgroundImage: "url(" + require("../../image/forum_bg.png") + ")",
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                }}>
                    <h1 className="fw-bold text-white my-auto mb-3 col-12">
                        Berbagi Informasi dengan Para Pelaku
                        <h1 className="fw-bold color-secondary" style={{ fontSize: 'calc(1.375rem + 1.5vw)', whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
                            Pertanian di Seluruh Indonesia
                        </h1>
                    </h1>
                    <div>
                        <Link to="/user/forum">
                            <button className="btn bg-secondary text-body fw-bold rounded-4 px-4">Buat Forum Diskusi</button>
                        </Link>
                    </div>
                </div>
            </div>

            <div className="container" style={{ marginBottom: '5rem' }}>
                <h1 className="color-primary fw-bold mb-3">Semua Forum</h1>
                <div className="row align-items-center mb-5">
                    <div className="col-md-3 mb-3">
                        <div className="input-group">
                            <span class="input-group-text py-2" style={{ borderRadius: '50rem', borderRight: '0', borderTopRightRadius: '0', borderBottomRightRadius: '0', backgroundColor: 'white', borderColor: '#028430' }} >
                                <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M7.32197 0.19873H1.34273C1.07843 0.19873 0.824959 0.303723 0.638071 0.49061C0.451184 0.677498 0.346191 0.930972 0.346191 1.19527V7.17451C0.346191 7.43881 0.451184 7.69228 0.638071 7.87917C0.824959 8.06606 1.07843 8.17105 1.34273 8.17105H7.32197C7.58627 8.17105 7.83974 8.06606 8.02663 7.87917C8.21352 7.69228 8.31851 7.43881 8.31851 7.17451V1.19527C8.31851 0.930972 8.21352 0.677498 8.02663 0.49061C7.83974 0.303723 7.58627 0.19873 7.32197 0.19873ZM17.2874 0.19873H11.3081C11.0438 0.19873 10.7904 0.303723 10.6035 0.49061C10.4166 0.677498 10.3116 0.930972 10.3116 1.19527V7.17451C10.3116 7.43881 10.4166 7.69228 10.6035 7.87917C10.7904 8.06606 11.0438 8.17105 11.3081 8.17105H17.2874C17.5517 8.17105 17.8051 8.06606 17.992 7.87917C18.1789 7.69228 18.2839 7.43881 18.2839 7.17451V1.19527C18.2839 0.930972 18.1789 0.677498 17.992 0.49061C17.8051 0.303723 17.5517 0.19873 17.2874 0.19873ZM7.32197 10.1641H1.34273C1.07843 10.1641 0.824959 10.2691 0.638071 10.456C0.451184 10.6429 0.346191 10.8964 0.346191 11.1607V17.1399C0.346191 17.4042 0.451184 17.6577 0.638071 17.8446C0.824959 18.0315 1.07843 18.1364 1.34273 18.1364H7.32197C7.58627 18.1364 7.83974 18.0315 8.02663 17.8446C8.21352 17.6577 8.31851 17.4042 8.31851 17.1399V11.1607C8.31851 10.8964 8.21352 10.6429 8.02663 10.456C7.83974 10.2691 7.58627 10.1641 7.32197 10.1641ZM14.2977 10.1641C15.0776 10.1641 15.8404 10.3929 16.4916 10.8221C17.1427 11.2514 17.6537 11.8622 17.9611 12.5789C18.2686 13.2957 18.359 14.0869 18.2212 14.8545C18.0834 15.6221 17.7235 16.3325 17.186 16.8976C16.6485 17.4627 15.957 17.8577 15.1972 18.0336C14.4374 18.2096 13.6427 18.1589 12.9115 17.8876C12.1803 17.6164 11.5447 17.1367 11.0834 16.5078C10.6222 15.8789 10.3556 15.1285 10.3166 14.3496L10.3116 14.1503L10.3166 13.951C10.3677 12.9296 10.8095 11.9669 11.5505 11.262C12.2915 10.5572 13.2751 10.1641 14.2977 10.1641Z" fill="#028430" />
                                </svg>
                            </span>
                            <select className="form-control form-select py-2" style={{ borderRadius: '50rem', borderRight: '0', borderTopLeftRadius: '0', borderBottomLeftRadius: '0', borderColor: '#028430', color: '#028430', boxShadow: 'none', borderLeft: '0', paddingLeft: '0' }}>
                                <option value="">Kategori</option>
                                <option value="kategori1">Kategori 1</option>
                                <option value="kategori2">Kategori 2</option>
                            </select>
                        </div>
                    </div>
                    <div className="col-md-3 mb-3">
                        <div className="input-group">
                            <span class="input-group-text py-2" style={{ borderRadius: '50rem', borderTopRightRadius: '0', borderBottomRightRadius: '0', backgroundColor: 'white', borderColor: '#028430' }} >
                                <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M7.32197 0.19873H1.34273C1.07843 0.19873 0.824959 0.303723 0.638071 0.49061C0.451184 0.677498 0.346191 0.930972 0.346191 1.19527V7.17451C0.346191 7.43881 0.451184 7.69228 0.638071 7.87917C0.824959 8.06606 1.07843 8.17105 1.34273 8.17105H7.32197C7.58627 8.17105 7.83974 8.06606 8.02663 7.87917C8.21352 7.69228 8.31851 7.43881 8.31851 7.17451V1.19527C8.31851 0.930972 8.21352 0.677498 8.02663 0.49061C7.83974 0.303723 7.58627 0.19873 7.32197 0.19873ZM17.2874 0.19873H11.3081C11.0438 0.19873 10.7904 0.303723 10.6035 0.49061C10.4166 0.677498 10.3116 0.930972 10.3116 1.19527V7.17451C10.3116 7.43881 10.4166 7.69228 10.6035 7.87917C10.7904 8.06606 11.0438 8.17105 11.3081 8.17105H17.2874C17.5517 8.17105 17.8051 8.06606 17.992 7.87917C18.1789 7.69228 18.2839 7.43881 18.2839 7.17451V1.19527C18.2839 0.930972 18.1789 0.677498 17.992 0.49061C17.8051 0.303723 17.5517 0.19873 17.2874 0.19873ZM7.32197 10.1641H1.34273C1.07843 10.1641 0.824959 10.2691 0.638071 10.456C0.451184 10.6429 0.346191 10.8964 0.346191 11.1607V17.1399C0.346191 17.4042 0.451184 17.6577 0.638071 17.8446C0.824959 18.0315 1.07843 18.1364 1.34273 18.1364H7.32197C7.58627 18.1364 7.83974 18.0315 8.02663 17.8446C8.21352 17.6577 8.31851 17.4042 8.31851 17.1399V11.1607C8.31851 10.8964 8.21352 10.6429 8.02663 10.456C7.83974 10.2691 7.58627 10.1641 7.32197 10.1641ZM14.2977 10.1641C15.0776 10.1641 15.8404 10.3929 16.4916 10.8221C17.1427 11.2514 17.6537 11.8622 17.9611 12.5789C18.2686 13.2957 18.359 14.0869 18.2212 14.8545C18.0834 15.6221 17.7235 16.3325 17.186 16.8976C16.6485 17.4627 15.957 17.8577 15.1972 18.0336C14.4374 18.2096 13.6427 18.1589 12.9115 17.8876C12.1803 17.6164 11.5447 17.1367 11.0834 16.5078C10.6222 15.8789 10.3556 15.1285 10.3166 14.3496L10.3116 14.1503L10.3166 13.951C10.3677 12.9296 10.8095 11.9669 11.5505 11.262C12.2915 10.5572 13.2751 10.1641 14.2977 10.1641Z" fill="#028430" />
                                </svg>
                            </span>
                            <select className="form-control form-select py-2" style={{ borderRadius: '50rem', borderTopLeftRadius: '0', borderBottomLeftRadius: '0', borderColor: '#028430', color: '#028430', boxShadow: 'none', borderLeft: '0', paddingLeft: '0' }}>
                                <option value="">Urutkan</option>
                                <option value="kategori1">Terbaru</option>
                                <option value="kategori2">Terlama</option>
                            </select>
                        </div>
                    </div>
                    <div className="col-md-3 mb-3">
                        <button type="button" className="btn btn-success w-100 rounded-pill py-2">
                            Mencari
                        </button>
                    </div>
                    <div className="col-md-3 mb-3">
                        <button type="button" className="btn btn-warning w-100 rounded-pill py-2">
                            Reset
                        </button>
                    </div>
                </div>
                <div className="row">
                    {forums.map((forum, index) => (
                        <div className="col-12 py-3 px-4 rounded-3" style={{ border: '1px solid #028430' }}>
                            <Link to="/forum/detail">
                                <h3 className="fw-bold color-primary mb-1">{forum.title}</h3>
                                <p className="mb-4">{forum.question}</p>
                                <div className="d-flex flex-wrap justify-content-between al;ign-items-center">
                                    <div>
                                        <p className="text-white badge bg-primary rounded-4 px-3 py-1 mb-0" style={{ fontSize: 12 }}>
                                            {forum.category_name}
                                        </p>
                                    </div>
                                    <p className="color-primary mb-0" style={{ fontSize: 12 }}>{forum.username} ( {new Intl.DateTimeFormat('en-GB', {
                                        day: 'numeric',
                                        month: 'long',
                                        year: 'numeric',
                                    }).format(new Date(forum.createdAt))} )</p>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Forum;
