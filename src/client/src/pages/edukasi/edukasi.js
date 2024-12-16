import React, { useEffect, useState } from "react";

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import Header from "../../components/header/header";
import Footer from "../../components/footer/footer";
import { Link } from "react-router-dom";

// import './edukasi.css';

function Edukasi() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);


    const fetchData = async () => {
        try {
            const response = await fetch('/admin/course');
            const result = await response.json();

            setData(result); // Update state with fetched data
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
            <div className="mb-4">
                <div className="background-image d-flex flex-wrap text-center" style={{
                    backgroundImage: "url(" + require("../../image/edukasi_bg.png") + ")",
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                }}>
                    <h1 className="fw-bold text-white m-auto">

                        Tingkatkan Pengetahuan, Ciptakan Masa Depan Hijau dengan Edukasi Pertanian!
                    </h1>
                </div>
            </div>

            <div className="container" style={{ marginBottom: '5rem' }}>
                <h1 className="fw-bold color-primary m-auto text-center mb-4">
                    Tambah Wawasanmu Tentang Agrikultur
                    <h1 className="fw-bold color-secondary" style={{ fontSize: 'calc(1.375rem + 1.5vw)', whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>Menuju Indonesia Emas 2045</h1>
                </h1>
                <div className="row align-items-center mb-3">
                    <div className="col-md-3 mb-3">
                        <div className="input-group">
                            <span class="input-group-text py-2" style={{ borderRadius: '50rem', borderRight: '0', borderTopRightRadius: '0', borderBottomRightRadius: '0', backgroundColor: 'white', borderColor: '#028430' }} >
                                <svg width="25" height="23" viewBox="0 0 25 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M17.4361 14.1323H16.3558L15.9729 13.7855C17.3594 12.2747 18.1214 10.3458 18.1198 8.35098C18.1198 6.69934 17.5985 5.08479 16.6218 3.7115C15.6451 2.3382 14.2569 1.26785 12.6328 0.635797C11.0086 0.00374035 9.22144 -0.161634 7.49723 0.160585C5.77303 0.482805 4.18925 1.27815 2.94616 2.44604C1.70308 3.61392 0.856533 5.1019 0.513568 6.72181C0.170602 8.34172 0.346625 10.0208 1.01938 11.5467C1.69213 13.0726 2.83139 14.3769 4.2931 15.2945C5.75481 16.2121 7.47331 16.7018 9.2313 16.7018C11.4329 16.7018 13.4568 15.9438 15.0157 14.6848L15.3849 15.0445V16.0595L22.2222 22.4704L24.2597 20.5561L17.4361 14.1323ZM9.2313 14.1323C5.82631 14.1323 3.07771 11.55 3.07771 8.35098C3.07771 5.15196 5.82631 2.56962 9.2313 2.56962C12.6363 2.56962 15.3849 5.15196 15.3849 8.35098C15.3849 11.55 12.6363 14.1323 9.2313 14.1323Z" fill="#028430" />
                                </svg>
                            </span>
                            <input type="text" className="form-control search-artikel" style={{ borderRadius: '50rem', borderRight: '0', borderTopLeftRadius: '0', borderBottomLeftRadius: '0', borderColor: '#028430', boxShadow: 'none', borderLeft: '0', paddingLeft: '0' }} placeholder="Cari Artikel..." />
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
                <div className="row">
                    {
                        data.length > 0 ? data.map((item, index) => (
                            <div className="col-md-6 col-lg-4 mb-4">
                                <div className="card rounded-4 overflow-hidden h-100" style={{ border: '1px solid #028430', backgroundColor: '#EBF6EF', boxShadow: '0 4px 4px 0 rgba(0,0,0,0.25)' }}>
                                    <img src={'/' + item.image} style={{ aspectRatio: '3/2', objectFit: 'cover' }} className="w-100" />
                                    <div className="p-3 h-100 d-flex flex-column flex-wrap justify-content-center">
                                        <div className="">
                                            <h4 className="fw-bold color-primary mb-2">{item.name}</h4>
                                            <p className="mb-2" style={{
                                                fontSize: 14,
                                                textAlign: 'justify',
                                                display: '-webkit-box',
                                                WebkitBoxOrient: 'vertical',
                                                WebkitLineClamp: 3,
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis',
                                            }}>
                                                {item.description}
                                            </p>
                                            <div className="px-3 py-1 rounded-5 mb-2 color-primary fw-bold mb-3" style={{ fontSize: 14, backgroundColor: 'white', border: '1px solid #028430', width: 'fit-content' }}>{item.category_name}</div>

                                        </div>
                                        <div className="text-center mt-auto align-content-end">
                                            <Link to={"/user/kursus/detail/" + item.id}>
                                                <button className="btn btn-warning col-11 py-1 fw-bold rounded-5" style={{ color: '#0B7077', fontSize: 24 }}>Detail Kursus</button>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )) : ''
                    }
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Edukasi;
