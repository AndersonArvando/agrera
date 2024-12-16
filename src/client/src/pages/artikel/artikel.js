import React, { useEffect, useState } from "react";

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import Header from "../../components/header/header";
import Footer from "../../components/footer/footer";

import './artikel.css';
import { Link } from "react-router-dom";

function Artikel() {
    const [newArticles, setNewArticles] = useState([]);
    const [popularArticles, setPopularArticles] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        try {
            const articlePopularResponse = await fetch('/article/popular');
            const articlePopularResult = await articlePopularResponse.json();

            setPopularArticles(articlePopularResult); // Update state with fetched data

            const response = await fetch('/admin/article');
            const result = await response.json();

            setNewArticles(result); // Update state with fetched data
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false); // Stop loading spinner
        }
    };

    useEffect(() => {
        fetchData();
    }, []);
    return (
        <div>
            <Header />
            <div style={{ marginBottom: '6rem' }} id="background">
                <div className="text-center background-image d-flex" style={{
                    backgroundImage: "url(" + require("../../image/tentang-kami-bg.png") + ")",
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                }}>
                    <h1 className="fw-bold text-white m-auto">
                        Artikel Terpopuler Seputar
                        <h1 className="fw-bold color-secondary badge bg-primary d-block rounded-4" style={{ fontSize: 'calc(1.375rem + 1.5vw)', whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>Dunia Agrikultur Untuk Anda</h1>
                    </h1>
                </div>
            </div>

            <div className="container" style={{ marginBottom: '5rem' }}>
                <div className="row align-items-center mb-3 px-lg-5">
                    <div className="col-md-3 mb-3">
                        <div className="input-group">
                            <span class="input-group-text py-2" style={{ borderRadius: '50rem', borderRight: '0', borderTopRightRadius: '0', borderBottomRightRadius: '0', backgroundColor: 'white', borderColor: '#028430' }} >
                                <svg width="25" height="23" viewBox="0 0 25 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M17.4361 14.1323H16.3558L15.9729 13.7855C17.3594 12.2747 18.1214 10.3458 18.1198 8.35098C18.1198 6.69934 17.5985 5.08479 16.6218 3.7115C15.6451 2.3382 14.2569 1.26785 12.6328 0.635797C11.0086 0.00374035 9.22144 -0.161634 7.49723 0.160585C5.77303 0.482805 4.18925 1.27815 2.94616 2.44604C1.70308 3.61392 0.856533 5.1019 0.513568 6.72181C0.170602 8.34172 0.346625 10.0208 1.01938 11.5467C1.69213 13.0726 2.83139 14.3769 4.2931 15.2945C5.75481 16.2121 7.47331 16.7018 9.2313 16.7018C11.4329 16.7018 13.4568 15.9438 15.0157 14.6848L15.3849 15.0445V16.0595L22.2222 22.4704L24.2597 20.5561L17.4361 14.1323ZM9.2313 14.1323C5.82631 14.1323 3.07771 11.55 3.07771 8.35098C3.07771 5.15196 5.82631 2.56962 9.2313 2.56962C12.6363 2.56962 15.3849 5.15196 15.3849 8.35098C15.3849 11.55 12.6363 14.1323 9.2313 14.1323Z" fill="#028430" />
                                </svg>
                            </span>
                            <input type="text" className="form-control search-artikel" style={{ borderRadius: '50rem', borderTopLeftRadius: '0', borderBottomLeftRadius: '0', borderColor: '#028430', boxShadow: 'none', borderLeft: '0', paddingLeft: '0' }} placeholder="Cari Artikel..." />
                        </div>
                    </div>
                    <div className="col-md-3 mb-3">
                        <div className="input-group">
                            <span class="input-group-text py-2" style={{ borderRadius: '50rem', borderRight: '0', borderTopRightRadius: '0', borderBottomRightRadius: '0', backgroundColor: 'white', borderColor: '#028430' }} >
                                <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M7.32197 0.19873H1.34273C1.07843 0.19873 0.824959 0.303723 0.638071 0.49061C0.451184 0.677498 0.346191 0.930972 0.346191 1.19527V7.17451C0.346191 7.43881 0.451184 7.69228 0.638071 7.87917C0.824959 8.06606 1.07843 8.17105 1.34273 8.17105H7.32197C7.58627 8.17105 7.83974 8.06606 8.02663 7.87917C8.21352 7.69228 8.31851 7.43881 8.31851 7.17451V1.19527C8.31851 0.930972 8.21352 0.677498 8.02663 0.49061C7.83974 0.303723 7.58627 0.19873 7.32197 0.19873ZM17.2874 0.19873H11.3081C11.0438 0.19873 10.7904 0.303723 10.6035 0.49061C10.4166 0.677498 10.3116 0.930972 10.3116 1.19527V7.17451C10.3116 7.43881 10.4166 7.69228 10.6035 7.87917C10.7904 8.06606 11.0438 8.17105 11.3081 8.17105H17.2874C17.5517 8.17105 17.8051 8.06606 17.992 7.87917C18.1789 7.69228 18.2839 7.43881 18.2839 7.17451V1.19527C18.2839 0.930972 18.1789 0.677498 17.992 0.49061C17.8051 0.303723 17.5517 0.19873 17.2874 0.19873ZM7.32197 10.1641H1.34273C1.07843 10.1641 0.824959 10.2691 0.638071 10.456C0.451184 10.6429 0.346191 10.8964 0.346191 11.1607V17.1399C0.346191 17.4042 0.451184 17.6577 0.638071 17.8446C0.824959 18.0315 1.07843 18.1364 1.34273 18.1364H7.32197C7.58627 18.1364 7.83974 18.0315 8.02663 17.8446C8.21352 17.6577 8.31851 17.4042 8.31851 17.1399V11.1607C8.31851 10.8964 8.21352 10.6429 8.02663 10.456C7.83974 10.2691 7.58627 10.1641 7.32197 10.1641ZM14.2977 10.1641C15.0776 10.1641 15.8404 10.3929 16.4916 10.8221C17.1427 11.2514 17.6537 11.8622 17.9611 12.5789C18.2686 13.2957 18.359 14.0869 18.2212 14.8545C18.0834 15.6221 17.7235 16.3325 17.186 16.8976C16.6485 17.4627 15.957 17.8577 15.1972 18.0336C14.4374 18.2096 13.6427 18.1589 12.9115 17.8876C12.1803 17.6164 11.5447 17.1367 11.0834 16.5078C10.6222 15.8789 10.3556 15.1285 10.3166 14.3496L10.3116 14.1503L10.3166 13.951C10.3677 12.9296 10.8095 11.9669 11.5505 11.262C12.2915 10.5572 13.2751 10.1641 14.2977 10.1641Z" fill="#028430" />
                                </svg>
                            </span>
                            <select className="form-control form-select py-2" style={{ borderRadius: '50rem', borderTopLeftRadius: '0', borderBottomLeftRadius: '0', borderColor: '#028430', color: '#028430', boxShadow: 'none', borderLeft: '0', paddingLeft: '0' }}>
                                <option value="">Kategori</option>
                                <option value="kategori1">Kategori 1</option>
                                <option value="kategori2">Kategori 2</option>
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
                <h1 className="color-primary fw-bold mb-5">Artikel Terpopuler</h1>
                <div className="d-flex flex-wrap align-items-stretch">
                    {popularArticles[0] ?
                        <div className="col-lg-7 pe-lg-4">
                            <Link to={"/artikel/detail/" + popularArticles[0].id}>
                                <div className="border-0 overflow-hidden h-100">
                                    <div className="position-relative">
                                        <h5 className="fw-bold color-primary position-absolute badge fs-6 rounded-4 px-4" style={{ backgroundColor: '#EBF6EF', bottom: 0, left: 10 }}>{popularArticles[0].category_name}</h5>
                                        <img src={'/' + popularArticles[0].image} className="w-100" />
                                    </div>
                                    <div className="py-4 d-flex h-100 flex-column">
                                        <h3 className="text-start color-primary fw-bold mb-3">{popularArticles[0].title}</h3>
                                        <p className="mb-4 text-subtitle" style={{
                                            textAlign: 'justify',
                                            display: '-webkit-box',
                                            WebkitBoxOrient: 'vertical',
                                            WebkitLineClamp: 3,
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                        }}>{popularArticles[0].description}</p>
                                        <p className="text-end">
                                            {new Intl.DateTimeFormat('en-GB', {
                                                day: 'numeric',
                                                month: 'long',
                                                year: 'numeric',
                                            }).format(new Date(popularArticles[0].createdAt))}
                                        </p>
                                    </div>
                                </div>
                            </Link>
                        </div> : ''
                    }
                    <div className="col-lg-5">
                        <div className="row">
                            {popularArticles[1] ?
                                <Link to={"/artikel/detail/" + popularArticles[1].id}>
                                    <div className="col-lg-12 col-md-4 d-flex flex-wrap">
                                        <div className="col-lg-6 mb-3">
                                            <div className="position-relative h-100">
                                                <h5 className="fw-bold text-white position-absolute badge fs-6 rounded-4 w-50" style={{ backgroundColor: '#373900', bottom: 0, left: 10 }}>{popularArticles[1].category_name}</h5>
                                                <img src={'/' + popularArticles[1].image} className="w-100 h-100" style={{ objectFit: 'cover', aspectRatio: '3/2' }} />
                                            </div>
                                        </div>
                                        <div className="col-lg-6 ps-lg-3">
                                            <div className="d-flex h-100 flex-column">
                                                <h5 className="text-start color-primary fw-bold mb-2">{popularArticles[1].title}</h5>
                                                <p style={{ fontSize: '14px' }}>
                                                    {new Intl.DateTimeFormat('en-GB', {
                                                        day: 'numeric',
                                                        month: 'long',
                                                        year: 'numeric',
                                                    }).format(new Date(popularArticles[1].createdAt))}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                                : ''}
                            {popularArticles[2] ?
                                <Link to={"/artikel/detail/" + popularArticles[2].id}>
                                    <div className="col-lg-12 col-md-4 d-flex flex-wrap">
                                        <div className="col-lg-6 mb-3">
                                            <div className="position-relative h-100">
                                                <h5 className="fw-bold position-absolute badge fs-6 rounded-4 w-50" style={{ backgroundColor: '#FFDA3A', bottom: 0, left: 10, color: '#0B7077' }}>{popularArticles[2].category_name}</h5>
                                                <img src={'/' + popularArticles[2].image} className="w-100 h-100" style={{ objectFit: 'cover', aspectRatio: '3/2' }} />
                                            </div>
                                        </div>
                                        <div className="col-lg-6 ps-lg-3">
                                            <div className="d-flex h-100 flex-column">
                                                <h5 className="text-start color-primary fw-bold mb-2">{popularArticles[2].title}</h5>
                                                <p style={{ fontSize: '14px' }}>
                                                    {new Intl.DateTimeFormat('en-GB', {
                                                        day: 'numeric',
                                                        month: 'long',
                                                        year: 'numeric',
                                                    }).format(new Date(popularArticles[2].createdAt))}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                                : ''}
                            {popularArticles[3] ?
                                <Link to={"/artikel/detail/" + popularArticles[3].id}>
                                    <div className="col-lg-12 col-md-4 d-flex flex-wrap">
                                        <div className="col-lg-6 mb-3">
                                            <div className="position-relative h-100">
                                                <h5 className="fw-bold text-white position-absolute badge fs-6 rounded-4 w-50" style={{ backgroundColor: '#0B7077', bottom: 0, left: 10 }}>{popularArticles[3].category_name}</h5>
                                                <img src={'/' + popularArticles[3].image} className="w-100 h-100" style={{ objectFit: 'cover', aspectRatio: '3/2' }} />
                                            </div>
                                        </div>
                                        <div className="col-lg-6 ps-lg-3">
                                            <div className="d-flex h-100 flex-column">
                                                <h5 className="text-start color-primary fw-bold mb-2">{popularArticles[3].title}</h5>
                                                <p style={{ fontSize: '14px' }}>
                                                    {new Intl.DateTimeFormat('en-GB', {
                                                        day: 'numeric',
                                                        month: 'long',
                                                        year: 'numeric',
                                                    }).format(new Date(popularArticles[3].createdAt))}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                                : ''}
                        </div>
                    </div>
                </div>
            </div>
            <div className="container" style={{ marginBottom: '6rem' }}>
                <h1 className="color-primary fw-bold mb-5">Artikel Terbaru</h1>
                <div className="row">
                    {
                        newArticles.length > 0 ? newArticles.map((item, index) => (
                            <div className="col-md-4">
                                <Link to={"/artikel/detail/" + item.id}>
                                    <div className="border-0 overflow-hidden h-100">
                                        <div className="position-relative">
                                            <h5 className="fw-bold color-primary position-absolute badge fs-6 rounded-4 px-4" style={{ backgroundColor: '#EBF6EF', bottom: 0, left: 10 }}>{item.category_name}</h5>
                                            <img src={'/' + item.image} className="w-100" style={{ objectFit: 'cover', aspectRatio: '3/2' }} />
                                        </div>
                                        <div className="py-4 d-flex h-100 flex-column">
                                            <h3 className="text-start color-primary fw-bold mb-3">{item.title}</h3>
                                            <p className="mb-4 text-subtitle" style={{
                                                textAlign: 'justify',
                                                display: '-webkit-box',
                                                WebkitBoxOrient: 'vertical',
                                                WebkitLineClamp: 3,
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis',
                                                fontSize: '14px'
                                            }} dangerouslySetInnerHTML={{ __html: item.description }}></p>
                                            <p className="text-end" style={{ fontSize: '14px' }}>
                                                {new Intl.DateTimeFormat('en-GB', {
                                                    day: 'numeric',
                                                    month: 'long',
                                                    year: 'numeric',
                                                }).format(new Date(item.createdAt))}
                                            </p>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        )) : ''
                    }
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Artikel;
