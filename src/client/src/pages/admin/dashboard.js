import React, { useState } from "react";

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';

import AdminSidebar from "../../components/admin_sidebar/admin_sidebar";

function AdminDashboard() {
    return (
        <div style={{ padding: 25 }} className="d-flex position-relative">
            <AdminSidebar />

            <div style={{ paddingLeft: '30px' }} className="col">
                <div className="mb-3">
                    <div className="mb-4">
                        <span className="fs-4 " style={{
                            color: '#028430',
                            fontWeight: 'bold',
                            borderBottom: '3px solid #D1AA00'
                        }}>Beranda</span>
                    </div>
                    <div className="row">
                        <div className="col-lg-4 col-md-6 col-12 mb-3">
                            <div className="p-3 bg-primary rounded-4 py-4">
                                <h3 className="fw-bold text-white text-center">Total Kursus :</h3>
                                <h3 className="fw-bold text-white text-center">5</h3>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 col-12 mb-3">
                            <div className="p-3 bg-primary rounded-4 py-4">
                                <h3 className="fw-bold text-white text-center">Total Kursus :</h3>
                                <h3 className="fw-bold text-white text-center">5</h3>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mb-3">
                    <div className="mb-4">
                        <span className="fs-4 " style={{
                            color: '#028430',
                            fontWeight: 'bold',
                        }}>Tabel Data Kursus</span>
                    </div>
                    <div className="table-responsive">
                        <table className="table" style={{ fontSize: 14 }}>
                            <thead>
                                <tr>
                                    <th>Judul</th>
                                    <th>URL Youtube</th>
                                    <th>File PDF</th>
                                    <th>Kategori</th>
                                    <th>Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr valign="middle">
                                    <td>Bertanam Hidroponik untuk Pemula</td>
                                    <td style={{ wordBreak: 'break-all' }}>https://www.youtube.com/embed/1NnDgJzBAq4?si=fPLqcfJauS2bBbSB</td>
                                    <td style={{ wordBreak: 'break-all' }}>https://www.canva.com/design/DAGVJqO_hPU/Rj8oE0xmcDYbr9k4TKGPdg/view?embed</td>
                                    <td>Hidroponik</td>
                                    <td>
                                        <button className="btn text-white rounded-5 w-100 mx-1 my-1" style={{ backgroundColor: '#028430', }}>Edit</button>
                                        <button className="btn text-white rounded-5 w-100 mx-1 my-1" style={{ backgroundColor: '#CF2B27', }}>Hapus</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="mb-3">
                    <div className="mb-4">
                        <span className="fs-4 " style={{
                            color: '#028430',
                            fontWeight: 'bold',
                        }}>Tabel Data Artikel</span>
                    </div>
                    <div className="table-responsive">
                        <table className="table" style={{ fontSize: 14 }}>
                            <thead>
                                <tr>
                                    <th>Judul</th>
                                    <th>Tanggal Pembuatan</th>
                                    <th>Kategori</th>
                                    <th>Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr valign="middle">
                                    <td>Bertanam Hidroponik untuk Pemula</td>
                                    <td>01 Nov 2024</td>
                                    <td>Hidroponik</td>
                                    <td>
                                        <button className="btn text-white rounded-5 w-100 my-1 mx-1" style={{ backgroundColor: '#028430', }}>Edit</button>
                                        <button className="btn text-white rounded-5 w-100 my-1 mx-1" style={{ backgroundColor: '#CF2B27', }}>Hapus</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div >
    );
}

export default AdminDashboard;
