import React, { useState } from "react";
import Carousel from 'react-bootstrap/Carousel';
import Header from "../../components/header/header";
import Footer from "../../components/footer/footer";
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';

import "./tentang_kami.css";

function TentangKami() {
    const [backgroundIndex, setIndex] = useState(0);
    const [tawarkanIndex, setTawarkanIndex] = useState(0);

    const handleSelect = (selectedIndex) => {
        setIndex(selectedIndex);
    };
    const handleTawarkanSelect = (selectedIndex) => {
        setTawarkanIndex(selectedIndex);
    };
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
                    <h1 className="fw-bold text-white m-auto">Visi Misi Agrera Untuk Memajukan <h1 className="fw-bold color-secondary">Pertanian di Indonesia</h1></h1>
                </div>
            </div>
            <div className="text-center" style={{ marginBottom: '6rem' }}>
                <div className="mb-5">
                    <div className="px-5 py-3 bg-primary mx-auto rounded-4" style={{ width: '30%' }}>
                        <h1 className="color-secondary fw-bold" style={{ width: 'fit-content', margin: 'auto' }}>Visi Kami</h1>
                    </div>
                </div>
                <div className="d-flex flex-wrap mb-4">
                    <img src={require("../../image/tentang-kami-1.png")} className="col-4" style={{ objectFit: 'contain' }} />
                    <img src={require("../../image/tentang-kami-2.png")} className="col-4" style={{ objectFit: 'contain' }} />
                    <img src={require("../../image/tentang-kami-3.png")} className="col-4" style={{ objectFit: 'contain' }} />
                </div>
                <div className="text-center container">
                    <h3 className="fw-bold color-primary px-sm-5">
                        Menjadi platform edukasi dan informasi agrikultural terdepan di Indonesia yang memberdayakan petani dan masyarakat luas dengan akses mudah ke pembelajaran, berita terkini, dan forum diskusi pertanian.
                    </h3>
                </div>
            </div>
            <div className="text-center" style={{
                marginBottom: '6rem',
                backgroundColor: '#EBF6EF',
                paddingTop: '5rem',
                paddingBottom: '5rem',
            }} id="yang-kami-tawarkan-section">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-md-6">
                            <img src={require("../../image/tentang-kami-misi.png")} className="w-100 rounded-4" />
                        </div>
                        <div className="col-md-6">
                            <div className="mb-4">
                                <div className="px-5 py-3 bg-primary mx-auto rounded-4" style={{ width: '75%' }}>
                                    <h1 className="color-secondary fw-bold" style={{ width: 'fit-content', margin: 'auto' }}>Misi Kami</h1>
                                </div>
                            </div>
                            <div className="row align-items-center mb-3">
                                <div className="col">
                                    <div style={{ width: 40, height: 40, alignContent: 'center' }} className="text-align bg-primary text-white rounded-circle">
                                        1
                                    </div>
                                </div>
                                <div style={{ width: '87.5%' }}>
                                    <p style={{ textAlign: 'justify', marginBottom: '0' }}>
                                        Menyediakan artikel dan informasi terkini seputar dunia pertanian, perikanan, dan peternakan untuk membantu pengguna tetap up-to-date dengan perkembangan terbaru.
                                    </p>
                                </div>
                            </div>
                            <div className="row align-items-center mb-3">
                                <div className="col">
                                    <div style={{ width: 40, height: 40, alignContent: 'center' }} className="text-align bg-primary text-white rounded-circle">
                                        2
                                    </div>
                                </div>
                                <div style={{ width: '87.5%' }}>
                                    <p style={{ textAlign: 'justify', marginBottom: '0' }}>
                                        Membangun forum diskusi yang memungkinkan pengguna untuk berbagi pengetahuan, pengalaman, dan ide seputar pertanian, memperkuat komunitas agrikultural di Indonesia.
                                    </p>
                                </div>
                            </div>
                            <div className="row align-items-center mb-3">
                                <div className="col">
                                    <div style={{ width: 40, height: 40, alignContent: 'center' }} className="text-align bg-primary text-white rounded-circle">
                                        3
                                    </div>
                                </div>
                                <div style={{ width: '87.5%' }}>
                                    <p style={{ textAlign: 'justify', marginBottom: '0' }}>
                                        Mengembangkan modul pembelajaran agrikultur yang interaktif dan mudah diakses oleh semua kalangan, dengan sertifikat yang dapat diperoleh setelah menyelesaikan kursus.
                                    </p>
                                </div>
                            </div>
                            <div className="row align-items-center mb-3">
                                <div className="col">
                                    <div style={{ width: 40, height: 40, alignContent: 'center' }} className="text-align bg-primary text-white rounded-circle">
                                        4
                                    </div>
                                </div>
                                <div style={{ width: '87.5%' }}>
                                    <p style={{ textAlign: 'justify', marginBottom: '0' }}>
                                        Mendorong kolaborasi dan inovasi dalam industri pertanian melalui informasi yang akurat dan terorganisir.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            <div className="container" style={{ marginBottom: '6rem' }}>
                <div className="mb-5">
                    <div className="px-5 py-3 bg-primary mx-auto rounded-4" style={{ width: '75%' }}>
                        <h1 className="color-secondary fw-bold" style={{ width: 'fit-content', margin: 'auto' }}>Kenalan dengan Tim Agrera</h1>
                    </div>
                </div>
                <img src={require("../../image/tim-agrera.png")} className="w-100 mb-5" />
                <h1 className="color-primary fw-bold mb-3">FAQ</h1>
                <div className="accordion" id="faq">
                    <div className="card border-0 rounded-0">
                        <div className="card-header faq-shadow" id="faq-1" style={{ cursor: 'pointer', backgroundColor: '#EBF6EF', zIndex: 1 }} data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                            <h3 className="fw-bold color-primary">Bagaimana cara daftar kursus?</h3>
                        </div>

                        <div id="collapseOne" className="collapse faq-shadow" aria-labelledby="faq-1" data-parent="#faq">
                            <div className="card-body color-primary" style={{ backgroundColor: '#EBF6EF', borderBottom: '1px solid #0B7077' }}>
                                Daftar kursus mudah! Cukup buat akun di halaman registrasi kami. Setelah terdaftar, Anda bisa menjelajahi beragam kursus yang tersedia di halaman "Semua Kursus." Temukan topik yang sesuai dan mulai belajar hanya dengan sekali klik.
                            </div>
                        </div>
                    </div>
                    <div className="card border-0 rounded-0">
                        <div className="card-header faq-shadow" id="faq-2" style={{ cursor: 'pointer', backgroundColor: '#EBF6EF', zIndex: 1 }} data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="true" aria-controls="collapseTwo">
                            <h3 className="fw-bold color-primary">Bagaimana cara mengunduh sertifikat?</h3>
                        </div>

                        <div id="collapseTwo" className="collapse faq-shadow" aria-labelledby="faq-2" data-parent="#faq">
                            <div className="card-body color-primary" style={{ backgroundColor: '#EBF6EF', borderBottom: '1px solid #0B7077' }}>
                                Selesaikan kursus Anda, dan sertifikat siap diunduh! Anda bisa mendapatkan sertifikat langsung dari halaman kursus yang telah diselesaikan.

                            </div>
                        </div>
                    </div>
                    <div className="card border-0 rounded-0">
                        <div className="card-header faq-shadow" id="faq-3" style={{ cursor: 'pointer', backgroundColor: '#EBF6EF', zIndex: 1 }} data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="true" aria-controls="collapseThree">
                            <h3 className="fw-bold color-primary">Adakah kendala dalam memutarkan video pembelajaran?</h3>
                        </div>

                        <div id="collapseThree" className="collapse faq-shadow" aria-labelledby="faq-3" data-parent="#faq">
                            <div className="card-body color-primary" style={{ backgroundColor: '#EBF6EF', borderBottom: '1px solid #0B7077' }}>
                                Jika ada masalah saat memutar video, pastikan koneksi internet stabil atau coba browser lain. Tim kami siap membantu jika kendala masih berlanjut.

                            </div>
                        </div>
                    </div>
                    <div className="card border-0 rounded-0">
                        <div className="card-header faq-shadow" id="faq-4" style={{ cursor: 'pointer', backgroundColor: '#EBF6EF', zIndex: 1 }} data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="true" aria-controls="collapseFour">
                            <h3 className="fw-bold color-primary">Apakah terdapat mentor untuk bertanya secara langsung?</h3>
                        </div>

                        <div id="collapseFour" className="collapse faq-shadow" aria-labelledby="faq-4" data-parent="#faq">
                            <div className="card-body color-primary" style={{ backgroundColor: '#EBF6EF', borderBottom: '1px solid #0B7077' }}>
                                Ya, setiap kursus dilengkapi dengan fitur forum diskusi. Anda bisa berdiskusi, berbagi pengalaman, dan bertanya kepada sesama pengguna di sana.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default TentangKami;
