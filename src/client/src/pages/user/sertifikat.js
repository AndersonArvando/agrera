import React, { useState } from "react";

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';

import UserSidebar from "../../components/user_sidebar/user_sidebar";

function Sertifikat() {
    return (
        <div style={{ padding: 25 }} className="d-flex position-relative">
            <UserSidebar />

            <div style={{ paddingLeft: '30px' }} className="col">
                <div className="mb-4">
                    <span className="fs-4 " style={{
                        color: '#028430',
                        fontWeight: 'bold',
                        borderBottom: '3px solid #D1AA00'
                    }}>Sertifikat</span>
                </div>
                <div className="d-flex flex-wrap align-items-stretch rounded-4 overflow-hidden" style={{ backgroundColor: '#EBF6EF' }}>
                    <div className="col-lg-4 col-12">
                        <img src={require('../../image/kursus_tersimpan.png')} className="w-100 rounded-4" />
                    </div>
                    <div className="col-lg-8 col-12 p-3">
                        <div className="d-flex flex-wrap flex-column justify-content-between h-100">
                            <div>
                                <h1 className="fw-bold color-primary text-decoration-underline">
                                    Bertanam Hidroponik Untuk Pemula
                                </h1>
                            </div>
                            <div className="d-flex flex-wrap justify-content-between align-items-end">
                                <div className="px-3 py-1 rounded-5 color-primary fw-bold" style={{ fontSize: 14, backgroundColor: 'white', border: '1px solid #028430', width: 'fit-content' }}>Hidroponik</div>
                                <div>
                                    <button className="btn rounded-5 px-4 fw-bold mx-2" style={{ backgroundColor: '#028430', fontSize: 20, color: '#FFDA3A' }}>Download Sertifikat</button>
                                </div>
                            </div>


                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}

export default Sertifikat;
