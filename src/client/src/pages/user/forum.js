import React, { useEffect, useState } from "react";

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';

import UserSidebar from "../../components/user_sidebar/user_sidebar";
import { Link } from "react-router-dom";

function UserForum() {
    const [image, setImage] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null); // To store the preview URL
    const [courses, setCourses] = useState([]);
    const [forums, setForums] = useState([]);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        description: '',
        category_id: '',
        title: '',
    });
    const token = localStorage.getItem('authToken');


    // Handle file selection
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
        const url = URL.createObjectURL(file); // Create a temporary URL for preview
        setPreviewUrl(url);
    };
    // Initialize state with visibility status for each card
    const [visibleStates, setVisibleStates] = useState([false]); // Assuming there are 3 cards

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const MouseOver = (index) => {
        // setVisibleStates((prevStates) =>
        //     prevStates.map((visible, i) => (i === index ? true : visible))
        // );
    };
    const MouseLeave = (index) => {
        // setVisibleStates((prevStates) =>
        //     prevStates.map((visible, i) => (i === index ? false : visible))
        // );
    };

    const fetchData = async () => {
        try {
            const response = await fetch('/admin/category/course');
            const result = await response.json();
            setCourses(result); // Update state with fetched data

            const forums = await fetch('/user/forums');
            const forumResult = await forums.json();

            setForums(forumResult); // Update state with fetched data
            setVisibleStates(Array(forumResult.length).fill(false));
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false); // Stop loading spinner
        }
    };

    const handleForumSubmit = async (e) => {
        e.preventDefault();

        try {
            const submissionData = new FormData();
            submissionData.append('question', formData.question);
            submissionData.append('category_id', formData.category_id);
            submissionData.append('title', formData.title);
            if (image) submissionData.append('image', image); // Add the image file

            const response = await fetch('/user/post/forum', {
                method: 'POST',
                headers: {
                    Authorization: token,
                },
                body: submissionData
            });
            const result = await response.json();

            setFormData({
                title: '',
                question: '',
                category_id: '',
            })
            setImage(null)
            setPreviewUrl(null)
            fetchData()
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false); // Stop loading spinner
        }
    }

    useEffect(() => {
        fetchData();
    }, [])
    return (
        <div style={{ padding: 25 }} className="d-flex position-relative">
            <UserSidebar />

            <div style={{ paddingLeft: '30px' }} className="col">
                <div className="row">
                    <div className="col-lg-8 mb-3 col-12 card shadow-sm rounded-4 p-0 overflow-hidden" style={{ border: '2px solid #028430' }}>
                        <form onSubmit={handleForumSubmit}>
                            <div className="card-header p-3 d-flex align-items-center" style={{ backgroundColor: '#028430' }}>
                                <img src={require('../../image/user_profile_white.png')} style={{ height: 40 }} className="me-2" />
                                <span className="text-white fw-semibold fs-5">User0123</span>
                            </div>
                            <div className="card-body" style={{ borderBottom: '1px solid #028430' }}>
                                <input type="text" className="form-control" name="title" value={formData.title} required onChange={handleChange} placeholder="Judul" style={{ border: 0 }} />
                            </div>
                            <div className="card-body p-0">
                                <textarea name="question" required onChange={handleChange} value={formData.question} style={{ border: 0, outline: "none", resize: "vertical", }} placeholder="Isi pertanyaanmu ..." className="p-3 w-100"></textarea>
                                <div className="p-3 pb-0 d-flex flex-wrap justify-content-between">
                                    <div className="d-flex align-items-center col flex-wrap mb-3">
                                        <label for="forum-image">
                                            <div className="d-flex align-items-center py-2 px-3 rounded-5 mx-2 mb-3" style={{ border: '1px solid #028430', cursor: 'pointer' }}>
                                                <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M20 14V18C20 18.5304 19.7893 19.0391 19.4142 19.4142C19.0391 19.7893 18.5304 20 18 20H4C3.46957 20 2.96086 19.7893 2.58579 19.4142C2.21071 19.0391 2 18.5304 2 18V14M16 7L11 2M11 2L6 7M11 2V14" stroke="#028430" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
                                                </svg>
                                                <span className="fw-semibold ms-2 color-primary">Unggah</span>
                                            </div>
                                            <input type="file" style={{ display: 'none' }} accept="image/*" name="forum-image" id="forum-image" onChange={handleFileChange} />
                                        </label>
                                        <div className="input-group mx-2 mb-3" style={{ width: 'fit-content' }}>
                                            <span class="input-group-text py-2" style={{ borderRadius: '50rem', borderRight: '0', borderTopRightRadius: '0', borderBottomRightRadius: '0', backgroundColor: 'white', borderColor: '#028430' }} >
                                                <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M7.32197 0.19873H1.34273C1.07843 0.19873 0.824959 0.303723 0.638071 0.49061C0.451184 0.677498 0.346191 0.930972 0.346191 1.19527V7.17451C0.346191 7.43881 0.451184 7.69228 0.638071 7.87917C0.824959 8.06606 1.07843 8.17105 1.34273 8.17105H7.32197C7.58627 8.17105 7.83974 8.06606 8.02663 7.87917C8.21352 7.69228 8.31851 7.43881 8.31851 7.17451V1.19527C8.31851 0.930972 8.21352 0.677498 8.02663 0.49061C7.83974 0.303723 7.58627 0.19873 7.32197 0.19873ZM17.2874 0.19873H11.3081C11.0438 0.19873 10.7904 0.303723 10.6035 0.49061C10.4166 0.677498 10.3116 0.930972 10.3116 1.19527V7.17451C10.3116 7.43881 10.4166 7.69228 10.6035 7.87917C10.7904 8.06606 11.0438 8.17105 11.3081 8.17105H17.2874C17.5517 8.17105 17.8051 8.06606 17.992 7.87917C18.1789 7.69228 18.2839 7.43881 18.2839 7.17451V1.19527C18.2839 0.930972 18.1789 0.677498 17.992 0.49061C17.8051 0.303723 17.5517 0.19873 17.2874 0.19873ZM7.32197 10.1641H1.34273C1.07843 10.1641 0.824959 10.2691 0.638071 10.456C0.451184 10.6429 0.346191 10.8964 0.346191 11.1607V17.1399C0.346191 17.4042 0.451184 17.6577 0.638071 17.8446C0.824959 18.0315 1.07843 18.1364 1.34273 18.1364H7.32197C7.58627 18.1364 7.83974 18.0315 8.02663 17.8446C8.21352 17.6577 8.31851 17.4042 8.31851 17.1399V11.1607C8.31851 10.8964 8.21352 10.6429 8.02663 10.456C7.83974 10.2691 7.58627 10.1641 7.32197 10.1641ZM14.2977 10.1641C15.0776 10.1641 15.8404 10.3929 16.4916 10.8221C17.1427 11.2514 17.6537 11.8622 17.9611 12.5789C18.2686 13.2957 18.359 14.0869 18.2212 14.8545C18.0834 15.6221 17.7235 16.3325 17.186 16.8976C16.6485 17.4627 15.957 17.8577 15.1972 18.0336C14.4374 18.2096 13.6427 18.1589 12.9115 17.8876C12.1803 17.6164 11.5447 17.1367 11.0834 16.5078C10.6222 15.8789 10.3556 15.1285 10.3166 14.3496L10.3116 14.1503L10.3166 13.951C10.3677 12.9296 10.8095 11.9669 11.5505 11.262C12.2915 10.5572 13.2751 10.1641 14.2977 10.1641Z" fill="#028430" />
                                                </svg>
                                            </span>
                                            <select name="category_id" required onChange={handleChange} value={formData.category_id} className="form-control form-select py-2" style={{ borderRadius: '50rem', borderRightColor: '#028430', borderTopLeftRadius: '0', borderBottomLeftRadius: '0', borderColor: '#028430', color: '#028430', boxShadow: 'none', borderLeft: '0', paddingLeft: '0' }}>
                                                <option value="">Pilih Kategori</option>
                                                {
                                                    courses.length > 0 ? courses.map((item, index) => (
                                                        <option value={item.id}>{item.name}</option>
                                                    )) : <></>
                                                }
                                            </select>
                                        </div>
                                    </div>
                                    <div>
                                        <button className="px-5 py-2 fw-bold text-white btn rounded-5 mb-3" style={{ backgroundColor: '#028430' }}>Kirim</button>
                                    </div>
                                    {previewUrl && (
                                        <div className="col-12 mb-3">
                                            <img
                                                src={previewUrl}
                                                alt="Preview"
                                                style={{ width: '300px', marginTop: '10px' }}
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="col-lg-4 mb-3 col-12">
                        <div className="col-12 mb-3">
                            <div className="input-group">
                                <span class="input-group-text py-2" style={{ borderRadius: '50rem', borderTopRightRadius: '0', borderBottomRightRadius: '0', backgroundColor: 'white', borderColor: '#028430' }} >
                                    <svg width="25" height="23" viewBox="0 0 25 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M17.4361 14.1323H16.3558L15.9729 13.7855C17.3594 12.2747 18.1214 10.3458 18.1198 8.35098C18.1198 6.69934 17.5985 5.08479 16.6218 3.7115C15.6451 2.3382 14.2569 1.26785 12.6328 0.635797C11.0086 0.00374035 9.22144 -0.161634 7.49723 0.160585C5.77303 0.482805 4.18925 1.27815 2.94616 2.44604C1.70308 3.61392 0.856533 5.1019 0.513568 6.72181C0.170602 8.34172 0.346625 10.0208 1.01938 11.5467C1.69213 13.0726 2.83139 14.3769 4.2931 15.2945C5.75481 16.2121 7.47331 16.7018 9.2313 16.7018C11.4329 16.7018 13.4568 15.9438 15.0157 14.6848L15.3849 15.0445V16.0595L22.2222 22.4704L24.2597 20.5561L17.4361 14.1323ZM9.2313 14.1323C5.82631 14.1323 3.07771 11.55 3.07771 8.35098C3.07771 5.15196 5.82631 2.56962 9.2313 2.56962C12.6363 2.56962 15.3849 5.15196 15.3849 8.35098C15.3849 11.55 12.6363 14.1323 9.2313 14.1323Z" fill="#028430" />
                                    </svg>
                                </span>
                                <input type="text" className="form-control search-artikel" style={{ borderRadius: '50rem', borderTopLeftRadius: '0', borderBottomLeftRadius: '0', borderColor: '#028430', boxShadow: 'none', borderLeft: '0', paddingLeft: '0' }} placeholder="Cari Artikel..." />
                            </div>
                        </div>
                        <div className="col-12 mb-3">
                            <div className="input-group">
                                <span class="input-group-text py-2" style={{ borderRadius: '50rem', borderRight: '0', borderTopRightRadius: '0', borderBottomRightRadius: '0', backgroundColor: 'white', borderColor: '#028430' }} >
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
                        <div className="col-12 mb-3">
                            <button type="button" className="btn btn-success w-100 rounded-pill py-2">
                                Mencari
                            </button>
                        </div>
                        <div className="col-12 mb-3">
                            <button type="button" className="btn btn-warning w-100 rounded-pill py-2">
                                Reset
                            </button>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-12 mb-3 col-12 p-0">
                        <h4 className="fw-bold color-primary mb-3">Diskusi Terbaru</h4>
                        {/* {forums.map((forum, index) => {
                            <Link to="/forum/detail">
                                <div className="card overflow-hidden rounded-4 p-3 pb-0 shadow" style={{ border: '1px solid #949494', cursor: 'pointer' }} onMouseOver={() => MouseOver(index)} onMouseLeave={() => MouseLeave(index)}>
                                    <div className="d-flex justify-content-between align-items-center flex-wrap">
                                        <div className="mb-3 d-flex align-items-center flex-wrap">
                                            <img src={require('../../image/user_profile.png')} style={{ height: 40 }} className="me-2" />
                                            <span className="fw-semibold fs-4 text-body">Joko</span>
                                        </div>
                                        <div className="mb-3">
                                            <span className="fs-6 text-body">26/10/24</span>
                                        </div>
                                    </div>
                                    <p>Bagaimana cara mengatasi hama ulat yang menyerang tanaman cabai tanpa menggunakan pestisida kimia?</p>
                                    <div className="d-flex flex-wrap justify-content-between align-items-center">
                                        <div className="px-3 py-1 rounded-5 text-white fw-bold mb-3" style={{ fontSize: 14, backgroundColor: '#028430', border: '1px solid #028430', width: 'fit-content' }}>Hidroponik</div>
                                        <div className="mb-3 fs-6">Komentar : 1</div>
                                    </div>
                                    <div style={{
                                        opacity: !visibleStates[index] ? "0" : "1",
                                        transition: "all .5s",
                                        visibility: !visibleStates[index] ? "hidden" : "visible",
                                        maxHeight: !visibleStates[index] ? "0" : "100%",
                                        // display: !isVisible ? "none" : "block",
                                    }}>
                                        <div style={{
                                            borderTop: '1px solid #949494',
                                            // display: !isVisible ? "none" : "block",
                                        }} className="py-3">
                                            <div className="d-flex">
                                                <img src={require('../../image/user_profile.png')} style={{ height: 40 }} className="me-2" />
                                                <div style={{ backgroundColor: '#EBF6EF' }} className="rounded-4 p-2">
                                                    <span style={{ fontSize: 14 }} className="text-body">Untuk mengatasi ulat pada tanaman cabai tanpa pestisida kimia, semprotkan larutan alami seperti bawang putih atau cabai yang diblender dengan air, atau gunakan minyak neem yang aman bagi tanaman. Anda juga bisa mengundang serangga predator alami seperti kepik dan laba-laba atau mengumpulkan ulat secara manual agar hama terkendali.</span>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </Link>

                        })} */}
                        {forums.length > 0 && forums.map((forum, index) => (
                            <Link to={"/forum/detail/" + forum.id}>
                                <div className="card overflow-hidden rounded-4 p-3 pb-0 shadow mb-3" style={{ border: '1px solid #949494', cursor: 'pointer' }} onMouseOver={() => MouseOver(index)} onMouseLeave={() => MouseLeave(index)}>
                                    <div className="d-flex justify-content-between align-items-center flex-wrap">
                                        <div className="mb-3 d-flex align-items-center flex-wrap">
                                            <img src={require('../../image/user_profile.png')} style={{ height: 40 }} className="me-2" />
                                            <span className="fw-semibold fs-4 text-body">{forum.username}</span>
                                        </div>
                                        <div className="mb-3">
                                            <span className="fs-6 text-body">{new Intl.DateTimeFormat('en-GB', {
                                                day: 'numeric',
                                                month: 'long',
                                                year: 'numeric',
                                            }).format(new Date(forum.createdAt))}</span>
                                        </div>
                                    </div>
                                    <p>{forum.question}</p>
                                    <div className="d-flex flex-wrap justify-content-between align-items-center">
                                        <div className="px-3 py-1 rounded-5 text-white fw-bold mb-3" style={{ fontSize: 14, backgroundColor: '#028430', border: '1px solid #028430', width: 'fit-content' }}>{forum.category_name}</div>
                                        <div className="mb-3 fs-6">Komentar : {forum.comments}</div>
                                    </div>
                                    <div style={{
                                        opacity: !visibleStates[index] ? "0" : "1",
                                        transition: "all .5s",
                                        visibility: !visibleStates[index] ? "hidden" : "visible",
                                        maxHeight: !visibleStates[index] ? "0" : "100%",
                                        // display: !isVisible ? "none" : "block",
                                    }}>
                                        <div style={{
                                            borderTop: '1px solid #949494',
                                            // display: !isVisible ? "none" : "block",
                                        }} className="py-3">
                                            <div className="d-flex">
                                                <img src={require('../../image/user_profile.png')} style={{ height: 40 }} className="me-2" />
                                                <div style={{ backgroundColor: '#EBF6EF' }} className="rounded-4 p-2">
                                                    <span style={{ fontSize: 14 }} className="text-body">Untuk mengatasi ulat pada tanaman cabai tanpa pestisida kimia, semprotkan larutan alami seperti bawang putih atau cabai yang diblender dengan air, atau gunakan minyak neem yang aman bagi tanaman. Anda juga bisa mengundang serangga predator alami seperti kepik dan laba-laba atau mengumpulkan ulat secara manual agar hama terkendali.</span>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                    {/* <div className="col-lg-4 mb-3 col-12">
                        <div className="card shadow-sm rounded-4 p-0 overflow-hidden">
                            <div className="card-header py-4" style={{ backgroundColor: '#028430' }}>
                                <h4 className="fw-bold text-white text-center">Riwayat  Diskusi</h4>
                            </div>
                            <div className="card-body p-3">
                                <div className="mb-3">
                                    <div className="d-flex align-items-center px-3 py-2 rounded-4" style={{ backgroundColor: '#EBF6EF' }}>
                                        <img src={require('../../image/ring.png')} style={{ height: 25 }} className="me-2" />
                                        <span style={{ fontSize: 14 }}>Joko mengomentari diskusi kamu! “Bagaimana cara menghindari....”</span>
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <div className="d-flex align-items-center px-3 py-2 rounded-4" style={{ backgroundColor: '#EBF6EF' }}>
                                        <img src={require('../../image/ring.png')} style={{ height: 25 }} className="me-2" />
                                        <span style={{ fontSize: 14 }}>Joko mengomentari diskusi kamu! “Bagaimana cara menghindari....”</span>
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <div className="d-flex align-items-center px-3 py-2 rounded-4" style={{ backgroundColor: '#EBF6EF' }}>
                                        <img src={require('../../image/ring.png')} style={{ height: 25 }} className="me-2" />
                                        <span style={{ fontSize: 14 }}>Joko mengomentari diskusi kamu! “Bagaimana cara menghindari....”</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> */}
                </div>
            </div>
        </div >
    );
}

export default UserForum;
