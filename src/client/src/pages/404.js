import React, { useState } from "react";
import Carousel from 'react-bootstrap/Carousel';
import Header from "../components/header/header";
import Footer from "../components/footer/footer";
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';

// import "./App.css";

function PageNotFound() {
    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
            flexDirection: 'column'
        }}>
            <Header />
            <div className="m-auto">
                <div className="d-flex flex-wrap col-md-10 col-11 justify-content-center align-items-center m-auto">
                    <div className="col-12 col-md-6">
                        <h2 className="fw-bold">Halaman Tidak Ditemukan</h2>
                        <p className="fs-5">Mohon Maaf, Halaman Yang Anda Minta Tidak Dapat Ditemukan, Silahkan kembali Ke Halaman Beranda</p>
                        <Link to="/">
                            <button className="px-4 py-2 btn text-white" style={{ backgroundColor: '#028430' }}>Kembali Ke Halaman</button>
                        </Link>
                    </div>
                    <div className="d-md-block d-none col-md-6">
                        <img src={require("../image/404.png")} style={{ width: '100%' }} />
                    </div>
                </div>
            </div>
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

export default PageNotFound;
