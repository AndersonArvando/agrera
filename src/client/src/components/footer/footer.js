import React, { Component } from 'react';

import './style.css';
import { NavLink } from 'react-router-dom';

class Footer extends Component {
    render() {
        return (
            <footer className="py-4 color-primary" style={{ backgroundColor: '#EBF6EF' }}>
                <div className="container">
                    <div className="row">
                        {/* Logo and Description */}
                        <div className="col-lg-4 mb-4 pe-4">
                            <img src={require("../../image/logo.png")} alt="Agrera Logo" style={{ height: '50px' }} />
                            <p className="mt-3 fw-bold">
                                Platform Yang Menyediakan Informasi Berbasis Edukasi Serta Forum Diskusi Tentang Agrikultur Menuju Indonesia Emas 2045                            </p>
                        </div>

                        {/* Kategori Section */}
                        <div className="col-lg-3 mb-4 px-4">
                            <h6 className='mb-3'>Kategori</h6>
                            <ul className="list-unstyled">
                                <li className='mb-2'>
                                    <NavLink to="/artikel" className="color-primary" style={{ textDecoration: 'none' }}>
                                        Berita dan Artikel
                                    </NavLink>
                                </li>
                                <li className='mb-2'>
                                    <NavLink to="/edukasi" className="color-primary" style={{ textDecoration: 'none' }}>
                                        Edukasi
                                    </NavLink>
                                </li>
                                <li className='mb-2'>
                                    <NavLink to="/forum" className="color-primary" style={{ textDecoration: 'none' }}>
                                        Komunitas dan Forum
                                    </NavLink>
                                </li>
                            </ul>
                        </div>

                        {/* Tautan Section */}
                        <div className="col-lg-2 mb-4 px-4">
                            <h6 className='mb-3'>Tautan</h6>
                            <ul className="list-unstyled">
                                <li className='mb-2'>
                                    <NavLink to="/tentang-kami" className="color-primary" style={{ textDecoration: 'none' }}>
                                        Tentang Kami
                                    </NavLink>
                                </li>
                                <li className='mb-2'>
                                    <NavLink to="/tentang-kami#faq" className="color-primary" style={{ textDecoration: 'none' }}>
                                        FAQ
                                    </NavLink>
                                </li>
                            </ul>
                        </div>

                        {/* Hubungi Kami Section */}
                        <div className="col-lg-3 mb-4 ps-4">
                            <h6>Hubungi Kami</h6>
                            <ul className="list-unstyled">
                                <li className='mb-3'><img src={require("../../image/call.png")} alt="Agrera Logo" style={{ height: 24, width: 24 }} /> Tel: +6282142630937</li>
                                <li className='mb-3'><img src={require("../../image/time.png")} alt="Agrera Logo" style={{ height: 24, width: 24 }} /> Response hours: 8 to 20</li>
                                <li className='mb-3'><img src={require("../../image/message.png")} alt="Agrera Logo" style={{ height: 24, width: 24 }} /> Email: agrera@gmail.com</li>
                            </ul>
                        </div>
                    </div>
                    {/* Copyright */}
                    <div className="pt-4" style={{ borderTop: "1px solid #028430" }}>
                        <p className="m-0">Copyright 2024 | Semua Hak Dilindungi Undang-Undang</p>
                    </div>
                </div>
            </footer>
        )
    }
}

export default Footer;