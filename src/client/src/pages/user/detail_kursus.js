import React, { useEffect, useState } from "react";

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import Swal from 'sweetalert2';
import UserSidebar from "../../components/user_sidebar/user_sidebar";
import { Link, useAsyncError, useLocation, useNavigate, useParams } from "react-router-dom";
import { NotificationContainer, NotificationManager } from "react-notifications";
import 'react-notifications/lib/notifications.css';
import { toPng } from "html-to-image";
import { saveAs } from 'file-saver';
import certificateImage from '../../image/sertifikat.png';
function DetailKursus() {
    const { id } = useParams(); // Get the item ID from the route
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [course, setCourse] = useState({});
    const [user, setUser] = useState({});
    const [modules, setModules] = useState({});
    const location = useLocation();
    const navigate = useNavigate();
    const { success, danger } = location.state || {};
    const token = localStorage.getItem('authToken');
    {/* <div style={{
                    position: 'relative',
                    width: '1000px',
                    height: '800px',
                }}>
                    <img src={require("../../image/sertifikat.png")} style={{width: '100%'}} />
                    <h1 style={{color: '#028430', position: 'absolute', top: '310px', left: '50%', transform: 'translateX(-50%)'}}>Anderson Arvando</h1>
                    <h3 style={{color: '#028430', position: 'absolute', top: '165px', width: '100%', textAlign: 'center', left: '50%', transform: 'translateX(-50%)'}}>Panduan bertanam Hidroponik untuk pemula</h3>
                </div> */}

    const handleDownload = async () => {
        const certificateHTML = `
            <img src="${certificateImage}" alt="Certificate Background" style="width: 100%;">
            <h1 style="color: #028430; position: absolute; top: 310px; left: 50%; transform: translateX(-50%);">
                ${user.name}
            </h1>
            <h3 style="color: #028430; position: absolute; top: 165px; width: 100%; text-align: center; left: 50%; transform: translateX(-50%);">
                ${course.name}
            </h3>
        `;

        // Create a container for the hidden element
        const container = document.createElement('div');
        container.style.width = '1000px';
        container.style.height = '800px';
        container.style.position = 'relative';
        container.innerHTML = certificateHTML;
        document.body.appendChild(container);
        const img = container.querySelector('img');
        img.onload = async () => {
            try {
                const dataUrl = await toPng(container);  // Convert to PNG
                saveAs(dataUrl, 'certificate.png');      // Save the image
            } catch (error) {
                console.error('Error generating PNG:', error);
            }
            document.body.removeChild(container);  // Clean up
        };

        img.onerror = () => {
            console.error('Image failed to load.');
            document.body.removeChild(container);
        };

        // Use html-to-image or other libraries here to convert container to image
        // Example using html-to-image:
        // const dataUrl = await toPng(container);
        // saveAs(dataUrl, 'certificate.png');

        // document.body.removeChild(container); // Clean up

    };

    const handleStartCourseClick = () => {
        Swal.fire({
            title: 'Apakah anda ingin memulai kursus ini?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: 'rgb(2, 132, 48)',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Iya, mulai kursus!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const dataResponse = await fetch(`/user/start/course/${id}`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: token,
                        },
                    });
                    if (dataResponse.ok) {
                        fetchData();
                        NotificationManager.success(success, 'Berhasil');
                    }
                } catch (error) {
                    console.error('Error fetching data:', error);
                } finally {
                    setLoading(false); // Stop loading spinner
                }
            }
        });
    };


    const fetchData = async () => {
        try {
            const dataResponse = await fetch(`/admin/course/edit/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: token,
                },
            });

            const data = await dataResponse.json();
            
            setCourse(data)
            setModules(data.modules)
            setUser(data.user[0])
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false); // Stop loading spinner
        }
    };

    useEffect(() => {
        window.scrollTo(0, 0)
        // Fetch data from the Node.js backend
        if (success) {
            NotificationManager.success(success, 'Berhasil');
        }
        if (danger) {
            NotificationManager.success(danger, 'Gagal');
        }
        fetchData();
    }, [id]);
    return (
        <div style={{ padding: 25 }} className="d-flex flex-wrap position-relative">
            <UserSidebar />

            <div style={{ paddingLeft: '30px' }} className="col">
                <div className="p-3 mb-4 rounded-4" style={{
                    backgroundImage: "url(" + require("../../image/detail_kursus_bg.png") + ")",
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat'
                }}>
                    <h1 className="text-center fw-bold color-primary" style={{ fontSize: 'calc(1.375rem + 2vw)' }}>{course.name}</h1>
                    <div className="px-3 py-1 rounded-5 color-primary fw-bold" style={{ fontSize: 14, backgroundColor: 'white', border: '1px solid #028430', width: 'fit-content' }}>{course.category ? course.category_name : ''}</div>
                </div>
                <h5 className="fw-bold color-primary mb-2">Tentang Kursus</h5>
                <p className="color-grey mb-5" style={{ textAlign: 'justify' }}>{course.description}.</p>
                <div className="row align-items-start mb-4">
                    <div className="col-lg-5 col-md-6 col-12">
                        <div className="mb-4">
                            <iframe
                                style={{ width: '100%', aspectRatio: '3/2' }}
                                src={course.youtube_url}
                                title="YouTube video player"
                                frameBorder={0}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                referrerPolicy="strict-origin-when-cross-origin"
                                allowFullScreen=""
                            />
                        </div>
                        <div>
                            <>
                                <div
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
                                        src={course.canva_url}
                                        allowFullScreen="allowfullscreen"
                                        allow="fullscreen"
                                    ></iframe>
                                </div>
                            </>
                        </div>
                    </div>
                    <div className="col-lg-7 col-md-6 col-12">
                        {modules.length > 0 && modules.map((module, index) => (
                            course.isStartedCourses && course.isStartedCourses.length > 0 && course.isStartedCourses[0].step >= index ?
                                <Link to={"/user/kursus/materi/" + module.id}>
                                    <div className="d-flex justify-content-between align-items-center p-3 rounded-4 mb-4" style={{ backgroundColor: '#EBF6EF', boxShadow: '0 4px 4px 0 rgba(0,0,0, 0.25)' }}>
                                        <div>

                                            {course.isStartedCourses[0].step > index ? <img src={require('../../image/check.png')} style={{ height: 20 }} className="me-3" /> : ''}

                                            <span className="color-primary fw-bold">Bagian {index + 1} : {module.title}</span>
                                        </div>
                                        <img src={require('../../image/chevron_right.png')} style={{ height: 20 }} />
                                    </div>

                                </Link> :
                                <div className="d-flex justify-content-between align-items-center p-3 rounded-4 mb-4" style={{ backgroundColor: '#EBF6EF', boxShadow: '0 4px 4px 0 rgba(0,0,0, 0.25)' }}>
                                    <div>
                                        {/* <img src={require('../../image/check.png')} style={{ height: 20 }} className="me-3" /> */}
                                        <span className="color-primary fw-bold">Bagian {index + 1} : {module.title}</span>
                                    </div>
                                    <img src={require('../../image/chevron_right.png')} style={{ height: 20 }} />
                                </div>
                        ))}
                        {
                            course.isStartedCourses && course.isStartedCourses.length > 0 && course.isStartedCourses[0].step >= modules.length ?
                                <Link to={"/user/kursus/rangkuman/" + course.id}>
                                    <div className="d-flex justify-content-between align-items-center p-3 rounded-4 mb-4" style={{ backgroundColor: '#EBF6EF', boxShadow: '0 4px 4px 0 rgba(0,0,0, 0.25)' }}>
                                        <div>
                                            {course.isStartedCourses[0].step > modules.length ? <img src={require('../../image/check.png')} style={{ height: 20 }} className="me-3" /> : ''}
                                            <span className="color-primary fw-bold">Rangkuman</span>
                                        </div>
                                        <img src={require('../../image/chevron_right.png')} style={{ height: 20 }} />
                                    </div>

                                </Link> :
                                <div className="d-flex justify-content-between align-items-center p-3 rounded-4 mb-4" style={{ backgroundColor: '#EBF6EF', boxShadow: '0 4px 4px 0 rgba(0,0,0, 0.25)' }}>
                                    <div>
                                        <span className="color-primary fw-bold">Rangkuman</span>
                                    </div>
                                    <img src={require('../../image/chevron_right.png')} style={{ height: 20 }} />
                                </div>
                        }
                        {
                            course.isStartedCourses && course.isStartedCourses.length > 0 && course.isStartedCourses[0].step >= modules.length + 1 ?
                                course.isStartedCourses[0].step == modules.length + 1 ? <Link to={"/user/quiz/" + course.id}>
                                    <div className="d-flex justify-content-between align-items-center p-3 rounded-4 mb-4" style={{ backgroundColor: '#EBF6EF', boxShadow: '0 4px 4px 0 rgba(0,0,0, 0.25)' }}>
                                        <div>
                                            {course.isStartedCourses[0].step > modules.length + 1 ? <img src={require('../../image/check.png')} style={{ height: 20 }} className="me-3" /> : ''}
                                            <span className="color-primary fw-bold">Quiz</span>
                                        </div>
                                        <img src={require('../../image/chevron_right.png')} style={{ height: 20 }} />
                                    </div>

                                </Link> : <Link to={"/user/quiz/hasil/" + course.id}>
                                    <div className="d-flex justify-content-between align-items-center p-3 rounded-4 mb-4" style={{ backgroundColor: '#EBF6EF', boxShadow: '0 4px 4px 0 rgba(0,0,0, 0.25)' }}>
                                        <div>
                                            {course.isStartedCourses[0].step > modules.length + 1 ? <img src={require('../../image/check.png')} style={{ height: 20 }} className="me-3" /> : ''}
                                            <span className="color-primary fw-bold">Quiz</span>
                                        </div>
                                        <img src={require('../../image/chevron_right.png')} style={{ height: 20 }} />
                                    </div>

                                </Link>
                                :
                                <div className="d-flex justify-content-between align-items-center p-3 rounded-4 mb-4" style={{ backgroundColor: '#EBF6EF', boxShadow: '0 4px 4px 0 rgba(0,0,0, 0.25)' }}>
                                    <div>
                                        {/* <img src={require('../../image/check.png')} style={{ height: 20 }} className="me-3" /> */}
                                        <span className="color-primary fw-bold">Quiz</span>
                                    </div>
                                    <img src={require('../../image/chevron_right.png')} style={{ height: 20 }} />
                                </div>
                        }
                    </div>
                </div>
                {course.isStartedCourses && course.isStartedCourses.length > 0 ?
                    <div className="row align-items-start">
                        <div className="col-lg-5 col-md-6 col-12">
                            {course.isStartedCourses[0].step > modules.length + 1 ? <div onClick={handleDownload}>
                                <img src={require('../../image/download_certificate.png')} style={{ height: 40 }} className="me-2" />
                                <span className="text-decoration-underline" style={{ cursor: 'pointer' }}>Unduh sertifikat kamu disini</span>
                            </div>
                                : ''
                            }
                        </div>
                        <div className="col-lg-7 col-md-6 col-12 text-end">
                            <Link to="/user/kursus">
                                <button className="btn rounded-5 px-4 fw-bold mx-2 color-primary" style={{ backgroundColor: 'white', border: '1px solid #028430', }}>Kembali</button>
                            </Link>
                            {/* <button className="btn rounded-5 px-4 fw-bold mx-2" style={{ backgroundColor: '#028430', color: '#FFDA3A' }}>Mulai</button> */}

                        </div>
                    </div> : <div className="row align-items-center justify-content-center">
                        <div className="col-12 text-end">
                            <button onClick={handleStartCourseClick} className="btn rounded-5 px-4 fw-bold mx-2" style={{ backgroundColor: '#028430', color: '#FFDA3A' }}>Mulai</button>
                        </div>
                    </div>
                }

            </div>


            <NotificationContainer />
        </div >
    );
}

export default DetailKursus;
