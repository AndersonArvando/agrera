import React, { useEffect, useState } from "react";

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';

import AdminSidebar from "../../components/admin_sidebar/admin_sidebar";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { NotificationManager } from "react-notifications";

function AdminKategoriKursus() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const location = useLocation();
    const { success, danger } = location.state || {};

    const navigate = useNavigate(); // To redirect after signup

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Apakah kamu yakin ingin menghapus data ini?");

        if (confirmDelete) {
            try {
                const response = await fetch(`/admin/category/course/delete/${id}`, {
                    method: "POST",
                });

                if (!response.ok) {
                    NotificationManager.success("Gagal Menghapus data", 'Gagal');
                }

                fetchData();
                NotificationManager.success('Kategory berhasil dihapus!', 'Berhasil');
            } catch (err) {
                alert("Error deleting item: " + err.message);
            }
        }
    };

    const fetchData = async () => {
        try {
            const response = await fetch('/admin/category/course');
            const result = await response.json();

            setData(result); // Update state with fetched data
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false); // Stop loading spinner
        }
    };

    useEffect(() => {
        // Fetch data from the Node.js backend

        if (success) {
            NotificationManager.success(success, 'Berhasil');
        }
        if (danger) {
            NotificationManager.success(danger, 'Gagal');
        }

        fetchData();
    }, []);

    return (
        <div style={{ padding: 25 }} className="d-flex position-relative">
            <AdminSidebar />

            <div style={{ paddingLeft: '30px' }} className="col">
                <div className="mb-3">
                    <div className="mb-4 d-flex flex-wrap justify-content-between">
                        <span className="fs-4 " style={{
                            color: '#028430',
                            fontWeight: 'bold',
                        }}>Tabel Data Kategori Kursus</span>
                        <Link to={'/admin/kategori/kursus/add'}>
                            <button className="btn text-white rounded-5 px-5" style={{ backgroundColor: '#028430', }}>Tambah</button>
                        </Link>
                    </div>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>Nama Kategori</th>
                                <th>Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                data.length > 0 ? data.map((item, index) => (
                                    <tr>
                                        <td>{index + 1}</td>
                                        <td>{item.name}</td>
                                        <td>
                                            <Link to={"/admin/kategori/kursus/edit/" + item.id}>
                                                <button className="btn text-white rounded-5 px-4 fw-bold mx-2" style={{ backgroundColor: '#028430', }}>Edit</button>
                                            </Link>
                                            <button onClick={() => handleDelete(item.id)} className="btn text-white rounded-5 px-4 fw-bold mx-2" style={{ backgroundColor: '#CF2B27', }}>Hapus</button>
                                        </td>
                                    </tr>
                                )) :
                                    <tr>
                                        <td colspan="3" align="center" style={{ color: 'grey' }}>Tidak ada data di tabel ini</td>
                                    </tr>
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div >
    );
}

export default AdminKategoriKursus;
