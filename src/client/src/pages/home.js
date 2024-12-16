import React, { useEffect, useState } from "react";
import Carousel from 'react-bootstrap/Carousel';
import Header from "../components/header/header";
import Footer from "../components/footer/footer";
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';

// import "./App.css";

function Home() {
    const [backgroundIndex, setIndex] = useState(0);
    const [tawarkanIndex, setTawarkanIndex] = useState(0);

    const handleSelect = (selectedIndex) => {
        setIndex(selectedIndex);
    };
    const handleTawarkanSelect = (selectedIndex) => {
        setTawarkanIndex(selectedIndex);
    };


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
                <Carousel activeIndex={backgroundIndex} onSelect={handleSelect} style={{ height: '100%' }} indicators={false}>
                    <Carousel.Item>
                        <div className="text-center background-image" style={{
                            backgroundImage: "url(" + require("../image/background.png") + ")",
                            backgroundPosition: 'center',
                            backgroundSize: 'cover',
                            backgroundRepeat: 'no-repeat',
                        }}>
                            <img src={require("../image/logo_white.png")} className="mb-5 col-md-4 col-sm-8 col-12" />
                            <h1 className="fw-bold text-white">Artikel Terkini, Belajar Pertanian dengan Modul, Raih Sertifikat, dan Diskusi di Forum Pertanian Agrera!</h1>
                        </div>
                    </Carousel.Item>
                    <Carousel.Item>
                        <div className="text-center background-image" style={{
                            minHeight: '600px',
                            backgroundImage: "url(" + require("../image/background_2.png") + ")",
                            backgroundPosition: 'center',
                            backgroundSize: 'cover',
                            backgroundRepeat: 'no-repeat'
                        }}>
                            <img src={require("../image/logo_white.png")} className="mb-5 col-md-4 col-sm-8 col-12" />
                            <h1 className="fw-bold text-white">Belajar bertani, panen untung! Dengan modul lengkap dan praktis, Anda bisa menguasai teknik budidaya dari mana saja!!</h1>

                        </div>
                    </Carousel.Item>
                    <Carousel.Item>
                        <div className="text-center background-image" style={{
                            minHeight: '600px',
                            backgroundImage: "url(" + require("../image/background_3.png") + ")",
                            backgroundPosition: 'center',
                            backgroundSize: 'cover',
                            backgroundRepeat: 'no-repeat'
                        }}>
                            <img src={require("../image/logo_white.png")} className="mb-5 col-md-4 col-sm-8 col-12" />
                            <h1 className="fw-bold text-white">Bergabunglah dengan komunitas pertanian Agrera untuk membangun jaringan yang kuat demi memajukan pertanian Indonesia!</h1>

                        </div>
                    </Carousel.Item>
                </Carousel>
            </div>
            <div className="text-center container" style={{ marginBottom: '6rem' }}>
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
            <div className="text-center" style={{
                marginBottom: '6rem',
                backgroundColor: '#EBF6EF',
                paddingTop: '5rem',
                paddingBottom: '5rem',
            }} id="yang-kami-tawarkan-section">
                <h1 className="color-primary fw-bold mb-5">Program Agrera Untuk Memajukan Pertanian Indonesia</h1>
                <div className="row col-sm-12 col-lg-10 mx-auto">
                    <div className="col-4 px-sm-4">
                        <div className="text-center">
                            <div className="px-lg-5 px-3">
                                <div className="mb-4 rounded-circle p-md-5 p-3 bg-primary">
                                    <img src={require("../image/home_people.png")} style={{ aspectRatio: '1', objectFit: 'contain' }} className="col-12" />
                                </div>
                            </div>
                            <h6 className="color-primary fw-bold">Jelajahi ribuan kelas kreatif, dari pemula hingga ahli</h6>
                        </div>
                    </div>
                    <div className="col-4 px-sm-4">
                        <div className="text-center">
                            <div className="px-lg-5 px-3">
                                <div className="mb-4 rounded-circle p-md-5 p-3 bg-primary">
                                    <img src={require("../image/achievement.png")} style={{ aspectRatio: '1', objectFit: 'contain' }} className="col-12" />
                                </div>
                            </div>
                            <h6 className="color-primary fw-bold">Pamerkan pencapaianmu dengan bangga melalui sertifikat kami</h6>
                        </div>
                    </div>
                    <div className="col-4 px-sm-4">
                        <div className="text-center">
                            <div className="px-lg-5 px-3">
                                <div className="mb-4 rounded-circle p-md-5 p-3 bg-primary">
                                    <img src={require("../image/chat.png")} style={{ aspectRatio: '1', objectFit: 'contain' }} className="col-12" />
                                </div>
                            </div>
                            <h6 className="color-primary fw-bold">Komunitas pembelajaran yang semangat untuk berbagi pengetahuan dan ide</h6>
                        </div>
                    </div>

                </div>
            </div>
            <div className="container" style={{ marginBottom: '6rem' }}>
                <div className="row align-items-center">
                    <div className="col-md-6">
                        <h2 className="fw-bold mb-5">Ikuti kursus online dengan <h2 className="color-primary fw-bold">modul praktis, belajar dari pemula hingga ahli, dan raih sertifikat resmi di setiap kursus.</h2></h2>
                        <Link to="/login" className="mx-auto mt-auto">
                            <button className="bg-primary col-8 col-sm-6 mb-3 py-3 fw-bold fs-5 btn btn-primary text-white rounded-4">Selengkapnya</button>
                        </Link>
                    </div>
                    <div className="col-md-6 d-none d-md-block">
                        <img src={require("../image/promosi_kursus.png")} className="w-100 rounded-4" />
                    </div>
                </div>
            </div>
            <div className="text-end container" style={{ marginBottom: '6rem' }}>
                <div className="row align-items-center">
                    <div className="col-md-6 d-none d-md-block">
                        <img src={require("../image/promosi_forum.png")} className="w-100 rounded-4" />
                    </div>
                    <div className="col-md-6">
                        <h2 className="fw-bold mb-5">Diskusi Langsung dengan <h2 className="color-primary fw-bold">para ahli dan petani lainnya untuk menemukan solusi dan cara meningkatkan hasil!</h2></h2>
                        <Link to="/login" className="mx-auto mt-auto">
                            <button className="bg-primary col-8 col-sm-6 mb-3 py-3 fw-bold fs-5 btn btn-primary text-white rounded-4">Selengkapnya</button>
                        </Link>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
        // <div className="App">
        //   <header className="App-header">
        //     <h1>React Node Template</h1>
        //     <p>
        //       <a
        //         className="App-link"
        //         href="https://github.com/mattvukas/react-node-template"
        //         target="_blank"
        //         rel="noopener noreferrer"
        //       >
        //         https://github.com/mattvukas/react-node-template
        //       </a>
        //     </p>
        //     <div className="logo-box">
        //       <img src={logo} className="App-logo" alt="logo" />
        //       <img src={nodejsLogo} className="Node-logo" alt="nodejsLogo" />
        //     </div>
        //     <p>
        //       Edit <code>client/src/App.js</code> and save to reload React app.
        //     </p>
        //     <p>
        //       Edit <code>client/server/routes/api.js</code> and save to reload
        //       Node.js app.
        //     </p>
        //     <br />
        //     <p>
        //       <code>GET /api/users</code>:{" "}
        //       {/* {users.length ? users.join(", ") : "loading..."} */}
        //     </p>
        //     <br />
        //     <p>
        //       Docs:{" "}
        //       <a
        //         className="App-link"
        //         href="https://reactjs.org"
        //         target="_blank"
        //         rel="noopener noreferrer"
        //       >
        //         React
        //       </a>
        //       {" | "}
        //       <a
        //         className="App-link"
        //         href="https://nodejs.org/en/docs/"
        //         target="_blank"
        //         rel="noopener noreferrer"
        //       >
        //         Node.js
        //       </a>
        //       {" | "}
        //       <a
        //         className="App-link"
        //         href="https://expressjs.com/en/4x/api.html"
        //         target="_blank"
        //         rel="noopener noreferrer"
        //       >
        //         Express.js
        //       </a>
        //     </p>
        //   </header>
        // </div>
    );
}

export default Home;
