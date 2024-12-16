import React, { useEffect, useState } from "react";

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';

import UserSidebar from "../../components/user_sidebar/user_sidebar";
import { Link, useParams } from "react-router-dom";

function DetailMateri() {
    const { id } = useParams(); // Get the item ID from the route
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [course, setCourse] = useState({});
    const [module, setModule] = useState({});
    const token = localStorage.getItem('authToken');

    const fetchData = async () => {
        try {
            const dataResponse = await fetch(`/admin/course/module/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: token,
                },
            });

            const data = await dataResponse.json();
            setCourse(data)
            setModule(data.module)
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false); // Stop loading spinner
        }
    };

    useEffect(() => {
        fetchData();
        window.scrollTo(0, 0)
    }, [id]);

    return (
        <div style={{ padding: 25 }} className="d-flex position-relative">
            <UserSidebar />

            <div style={{ paddingLeft: '30px' }} className="col">
                <div className="p-3 mb-4 rounded-4" style={{
                    backgroundImage: "url(" + require("../../image/detail_kursus_bg.png") + ")",
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat'
                }}>
                    <h1 className="text-center fw-bold color-primary" style={{ fontSize: 'calc(1.375rem + 2vw)' }}>{module.course_name}</h1>
                    <div className="px-3 py-1 rounded-5 color-primary fw-bold" style={{ fontSize: 14, backgroundColor: 'white', border: '1px solid #028430', width: 'fit-content' }}>{module.category_name}</div>
                </div>
                <h4 className="fw-bold color-primary mb-2">{module.title}</h4>
                <p className="mb-3" style={{ textAlign: 'justify' }}>{module.description}</p>
                <div className="mb-3"
                    style={{
                        position: "relative",
                        width: "100%",
                        height: 0,
                        paddingTop: "56.2500%",
                        paddingBottom: 0,
                        boxShadow: "0 2px 8px 0 rgba(63,69,81,0.16)",
                        marginTop: "1.6em",
                        marginBottom: "0.9em",
                        overflow: "hidden",
                        borderRadius: 8,
                        willChange: "transform"
                    }}
                >
                    <iframe
                        loading="lazy"
                        style={{
                            position: "absolute",
                            width: "100%",
                            height: "100%",
                            top: 0,
                            left: 0,
                            border: "none",
                            padding: 0,
                            margin: 0
                        }}
                        src="https://www.canva.com/design/DAGVJqO_hPU/Rj8oE0xmcDYbr9k4TKGPdg/view?embed"
                        allowFullScreen="allowfullscreen"
                        allow="fullscreen"
                    ></iframe>
                </div>
                <div className="text-end">
                    <Link to={"/user/kursus/detail/" + module.course_id}>
                        <button className="btn rounded-5 col-lg-2 col-md-3 col-sm-6 col-8 mb-3 mx-2 color-primary" style={{ backgroundColor: 'white', border: '1px solid #028430' }}>Kembali</button>
                    </Link>
                    <Link to={module.next_course_id ? "/user/kursus/materi/" + module.next_course_id : "/user/kursus/rangkuman/" + module.course_id}>
                        <button className="btn rounded-5 col-lg-2 col-md-3 col-sm-6 col-8 mb-3 mx-2 text-white" style={{ backgroundColor: '#028430' }}>Selanjutnya</button>
                    </Link>

                </div>


            </div>
        </div >
    );
}

export default DetailMateri;
