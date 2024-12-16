import React, { useEffect, useState } from "react";

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import Header from "../../components/header/header";
import Footer from "../../components/footer/footer";
import { Link, useParams } from "react-router-dom";

function ForumDetail() {
    const { id } = useParams(); // Get the item ID from the route
    const [courses, setCourses] = useState([]);
    const [forum, setForum] = useState([]);
    const [loading, setLoading] = useState(true);
    const [replyTo, setReplyTo] = useState(null);
    const [isLikes, setIsLikes] = useState({});
    const [comments, setComments] = useState({});
    const [formData, setFormData] = useState({
        comment: '',
    });
    const [replyText, setReplyText] = useState(''); // Track reply input
    const handleReplyClick = (id) => {
        setReplyTo((prev) => (prev === id ? null : id)); // Toggle reply box
        setReplyText(''); // Clear text when switching comments
    };


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const token = localStorage.getItem('authToken');

    const handleLikeClick = async (comment_id) => {
        console.log(comment_id)
        try {
            const dataResponse = await fetch(`/forum/like/${id}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', Authorization: token },
                body: JSON.stringify({ comment_id })
            });

            const data = await dataResponse.json();
            fetchData();
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false); // Stop loading spinner
        }
    }

    const handleSubmitComment = async (e) => {
        e.preventDefault();
        try {
            const dataResponse = await fetch(`/forum/comment/${id}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', Authorization: token },
                body: JSON.stringify(formData)
            });

            if (dataResponse.ok) {
                setFormData({
                    comment: '',
                });
                setReplyTo(null);
            }

            const data = await dataResponse.json();
            fetchData();
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false); // Stop loading spinner
        }
    }

    const handleSendReply = async (commentId) => {
        if (!replyText.trim()) return; // Prevent empty submissions

        // Prepare the data to send
        const replyData = {
            commentId,
            comment: replyText,
        };

        try {
            const response = await fetch(`/forum/comment/${id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: token
                },
                body: JSON.stringify(replyData),
            });

            if (response.ok) {
                setFormData({
                    comment: '',
                });
                setReplyTo(null);
            }
            fetchData();

        } catch (error) {
            console.error('Error sending reply:', error);
        }
    };

    const fetchData = async () => {
        try {
            const response = await fetch('/admin/category/course');
            const result = await response.json();
            setCourses(result); // Update state with fetched data

            const forum = await fetch('/user/forum/get/' + id, {
                headers: {
                    Authorization: token
                }
            });
            const forumResult = await forum.json();
            console.log(forumResult)
            setForum(forumResult.forum); // Update state with fetched data
            setIsLikes(forumResult.isLikes)
            setComments(forumResult.comments)
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false); // Stop loading spinner
        }
    };

    useEffect(() => {
        fetchData();
    }, [])
    return (
        <div>
            <Header />
            <div className="container d-flex flex-wrap" style={{ paddingTop: '6rem' }}>
                <div className="col-md-12 px-3">
                    <div>
                        <div className="px-4 py-2 rounded-5 mb-2" style={{ border: '1px solid #028430', width: 'fit-content' }}>{forum.category_name}</div>
                        <h3 className="color-primary mb-3" style={{ fontWeight: '800' }}>
                            {forum.title}
                        </h3>
                        <p className="fs-5 mb-4">{forum.username} {forum.createdAt ? new Intl.DateTimeFormat('en-GB', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric',
                        }).format(new Date(forum.createdAt)) : ''}</p>
                    </div>
                    <div>
                        <p style={{ textAlign: 'justify' }} className="mb-4">
                            {forum.question}
                        </p>
                        {localStorage.getItem('authToken') ?
                            isLikes ? <div onClick={() => handleLikeClick()} className="py-2 px-3 rounded-3 mb-4" style={{ border: '2px solid #0B7077', backgroundColor: '#074E53', width: 'fit-content', cursor: 'pointer' }}>
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M20 9C20 8.46957 19.8084 7.96086 19.4675 7.58579C19.1265 7.21071 18.664 7 18.1818 7H12.4364L13.3091 2.43C13.3273 2.33 13.3364 2.22 13.3364 2.11C13.3364 1.7 13.1818 1.32 12.9364 1.05L11.9727 0L5.99091 6.58C5.65455 6.95 5.45455 7.45 5.45455 8V18C5.45455 18.5304 5.6461 19.0391 5.98708 19.4142C6.32805 19.7893 6.79052 20 7.27273 20H15.4545C16.2091 20 16.8545 19.5 17.1273 18.78L19.8727 11.73C19.9545 11.5 20 11.26 20 11V9ZM0 20H3.63636V8H0V20Z" fill="white" />
                                </svg>
                                <span className="ms-2 mb-4 fw-bold" style={{ color: 'white' }}>LIKE ({forum.likes})</span>
                            </div> : <div onClick={() => handleLikeClick()} className="py-2 px-3 rounded-3 mb-4" style={{ border: '2px solid #0B7077', width: 'fit-content', cursor: 'pointer' }}>
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M20 9C20 8.46957 19.8084 7.96086 19.4675 7.58579C19.1265 7.21071 18.664 7 18.1818 7H12.4364L13.3091 2.43C13.3273 2.33 13.3364 2.22 13.3364 2.11C13.3364 1.7 13.1818 1.32 12.9364 1.05L11.9727 0L5.99091 6.58C5.65455 6.95 5.45455 7.45 5.45455 8V18C5.45455 18.5304 5.6461 19.0391 5.98708 19.4142C6.32805 19.7893 6.79052 20 7.27273 20H15.4545C16.2091 20 16.8545 19.5 17.1273 18.78L19.8727 11.73C19.9545 11.5 20 11.26 20 11V9ZM0 20H3.63636V8H0V20Z" fill="#074E53" />
                                </svg>
                                <span className="ms-2 mb-4 fw-bold" style={{ color: '#074E53' }}>LIKE ({forum.likes})</span>
                            </div>

                            :
                            <Link to="/login">
                                <div className="py-2 px-3 rounded-3 mb-4" style={{ border: '2px solid #0B7077', width: 'fit-content', cursor: 'pointer' }}>
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M20 9C20 8.46957 19.8084 7.96086 19.4675 7.58579C19.1265 7.21071 18.664 7 18.1818 7H12.4364L13.3091 2.43C13.3273 2.33 13.3364 2.22 13.3364 2.11C13.3364 1.7 13.1818 1.32 12.9364 1.05L11.9727 0L5.99091 6.58C5.65455 6.95 5.45455 7.45 5.45455 8V18C5.45455 18.5304 5.6461 19.0391 5.98708 19.4142C6.32805 19.7893 6.79052 20 7.27273 20H15.4545C16.2091 20 16.8545 19.5 17.1273 18.78L19.8727 11.73C19.9545 11.5 20 11.26 20 11V9ZM0 20H3.63636V8H0V20Z" fill="#074E53" />
                                    </svg>
                                    <span className="ms-2 mb-4 fw-bold" style={{ color: '#074E53' }}>LIKE ({forum.likes})</span>
                                </div>
                            </Link>
                        }
                        {/* <div style={{ backgroundColor: 'rgba(255, 218, 58, 0.5)' }} className="p-3 fw-bold rounded-2 mb-4"><span className="fw-bold" style={{ opacity: 0.5 }}>Belum ada komentar untuk saat ini</span></div> */}
                        <div style={{ backgroundColor: 'rgba(11, 112, 119, 0.25)' }} className="p-3 fw-bold rounded-2 mb-4"><span className="fw-bold" style={{ color: 'rgba(11, 112, 119, 1)' }}>Ayo gabung dengan forum dan masukan komentarmu</span></div>

                        <div className="container pt-5">
                            <h3 className="fw-bold mb-3">Komentar ({comments.length})</h3>
                            <form onSubmit={handleSubmitComment}>
                                <div className="d-flex mb-3">
                                    <img src={require("../../image/user_profile.png")} style={{ width: 50, height: 50 }} className="me-2" />
                                    <textarea onChange={handleChange} required value={formData.comment} name="comment" placeholder="Berikan komentar kamu mengenai artikel ini" className="rounded-3 border-0 w-100 p-3" style={{ backgroundColor: "#EBF6EF" }}></textarea>
                                </div>
                                <div className="text-end">
                                    {localStorage.getItem('authToken') ?
                                        <button type="submit" style={{ backgroundColor: '#028430', color: 'white', paddingLeft: '4rem', paddingRight: '4rem' }} className="btn rounded-pill py-2">Kirim</button> :
                                        <Link to="/login">
                                            <button type="button" style={{ backgroundColor: '#028430', color: 'white', paddingLeft: '4rem', paddingRight: '4rem' }} className="btn rounded-pill py-2">Kirim</button>
                                        </Link>
                                    }
                                </div>
                            </form>

                            <div>
                                {comments.length > 0 && comments.map((value, index) => (
                                    value.comment_id == null ?
                                        <div className="d-flex flex-wrap mb-3 col-12">
                                            <img src={require("../../image/user_profile.png")} style={{ width: 50, height: 50 }} className="me-2" />
                                            <div className="ms-2 col">
                                                <p className="fw-bold fs-4 mb-3">{value.username}</p>
                                                <p className="mb-3 col-12">{value.comment}</p>
                                                <div className="d-flex flex-wrap mb-3 col-12">
                                                    <span className="text-grey me-4">{new Intl.DateTimeFormat('en-GB', {
                                                        day: 'numeric',
                                                        month: 'long',
                                                        year: 'numeric',
                                                    }).format(new Date(value.createdAt))}</span>
                                                    <div>
                                                        <span className="text-grey mx-2">
                                                            <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path style={{ fill: `${!value.isLike ? 'rgb(148, 148, 148)' : 'black'}` }} d="M9.12417 0.98167C9.18999 0.866597 9.2907 0.775434 9.41173 0.721357C9.53277 0.667279 9.66787 0.653089 9.7975 0.680836L9.90333 0.703336C10.3442 0.797779 10.7604 0.983504 11.1252 1.24855C11.4899 1.5136 11.7952 1.8521 12.0212 2.24225C12.2472 2.63241 12.389 3.06556 12.4374 3.51384C12.4859 3.96211 12.4399 4.41557 12.3025 4.845L11.7725 6.5H12.72C14.9242 6.5 16.4808 8.65917 15.7833 10.75L14.4842 14.6483C14.3044 15.1875 13.9595 15.6565 13.4984 15.9888C13.0373 16.3211 12.4834 16.5 11.915 16.5H7.5075C6.64986 16.5002 5.81808 16.2063 5.15083 15.6675C5.03245 15.9167 4.84582 16.1272 4.61262 16.2745C4.37941 16.4219 4.10919 16.5001 3.83333 16.5H1.95833C1.57156 16.5 1.20063 16.3464 0.927136 16.0729C0.653645 15.7994 0.5 15.4284 0.5 15.0417V7.95834C0.5 7.15334 1.15333 6.5 1.95833 6.5H5.85C5.88672 6.49999 5.92279 6.49027 5.95454 6.47183C5.9863 6.45339 6.01262 6.42689 6.03083 6.395L9.12417 0.98167ZM5.29167 14.1333L5.86083 14.6317C6.3167 15.0304 6.90183 15.2502 7.5075 15.25H11.915C12.2211 15.2499 12.5194 15.1536 12.7677 14.9745C13.016 14.7955 13.2016 14.5429 13.2983 14.2525L14.5975 10.355C14.6967 10.0575 14.7237 9.7407 14.6764 9.4307C14.6291 9.12069 14.5088 8.82636 14.3255 8.57196C14.1421 8.31756 13.901 8.11037 13.6218 7.96746C13.3427 7.82455 13.0336 7.75002 12.72 7.75H10.9167C10.8183 7.74998 10.7212 7.72671 10.6335 7.6821C10.5458 7.63749 10.4698 7.5728 10.4119 7.49328C10.3539 7.41377 10.3155 7.32169 10.2998 7.22453C10.2841 7.12737 10.2916 7.02788 10.3217 6.93417L11.1117 4.46417C11.2641 3.98826 11.2309 3.47229 11.0187 3.01985C10.8065 2.56742 10.4309 2.21202 9.9675 2.025L7.11583 7.015C6.98834 7.23821 6.80411 7.42375 6.58181 7.55282C6.35952 7.6819 6.10705 7.74992 5.85 7.75H5.29167V14.1333ZM4.04167 7.75H1.95833C1.90308 7.75 1.85009 7.77195 1.81102 7.81102C1.77195 7.85009 1.75 7.90308 1.75 7.95834V15.0417C1.75 15.1567 1.84333 15.25 1.95833 15.25H3.83333C3.88859 15.25 3.94158 15.2281 3.98065 15.189C4.01972 15.1499 4.04167 15.0969 4.04167 15.0417V7.75Z" fill="#949494" />
                                                            </svg>
                                                            <span className={`${!value.isLike ? 'text-grey' : 'color-black text-black'} ms-1`} style={{ cursor: 'pointer' }} onClick={() => handleLikeClick(value.id)}>
                                                                {(value.like ?? 0) + ' Suka'}
                                                            </span>
                                                        </span>
                                                        <span className="text-grey mx-2" style={{ cursor: 'pointer' }} onClick={() => handleReplyClick(value.id)}>
                                                            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M8.99997 16.5C10.6358 16.4996 12.2266 15.9645 13.53 14.9761C14.8334 13.9877 15.7779 12.6003 16.2197 11.0253C16.6614 9.45034 16.5761 7.7741 15.9768 6.25208C15.3774 4.73005 14.2969 3.4457 12.8999 2.59474C11.5029 1.74379 9.86598 1.37289 8.23862 1.53858C6.61125 1.70427 5.08268 2.39746 3.88584 3.5125C2.68899 4.62755 1.88951 6.10331 1.60922 7.7149C1.32893 9.32648 1.58321 10.9855 2.33331 12.4392L1.49997 16.5L5.56081 15.6667C6.59081 16.1992 7.76081 16.5 8.99997 16.5Z" stroke="#949494" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                                                <path d="M5.25 9H5.25833V9.00833H5.25V9ZM9 9H9.00833V9.00833H9V9ZM12.75 9H12.7583V9.00833H12.75V9Z" stroke="#949494" stroke-width="2.25" stroke-linejoin="round" />
                                                            </svg>
                                                            <span className="text-grey ms-1">
                                                                Komentar
                                                            </span>
                                                        </span>
                                                    </div>
                                                </div>
                                                {replyTo === value.id && (
                                                    <div className="mb-3 col-12">
                                                        <div className="mb-3">
                                                            <textarea onChange={(e) => setReplyText(e.target.value)} name="comment" placeholder="Berikan komentar kamu mengenai artikel ini" className="rounded-3 border-0 w-100 p-3" style={{ backgroundColor: "#EBF6EF" }}></textarea>
                                                        </div>
                                                        <div className="text-end">
                                                            {localStorage.getItem('authToken') ?
                                                                <button type="button" onClick={() => handleSendReply(value.id)} style={{ backgroundColor: '#028430', color: 'white', paddingLeft: '4rem', paddingRight: '4rem' }} className="btn rounded-pill py-2">Kirim</button> :
                                                                <Link to="/login">
                                                                    <button type="button" style={{ backgroundColor: '#028430', color: 'white', paddingLeft: '4rem', paddingRight: '4rem' }} className="btn rounded-pill py-2">Kirim</button>
                                                                </Link>
                                                            }
                                                        </div>
                                                    </div>
                                                )}
                                                {comments.length > 0 && comments.map((child_commment) => (
                                                    child_commment.comment_id == value.id ?
                                                        <div className="d-flex flex-wrap mb-3 col-12">
                                                            <img src={require("../../image/user_profile.png")} style={{ width: 50, height: 50 }} className="me-2" />
                                                            <div className="ms-2 col">
                                                                <p className="fw-bold fs-4 mb-3">{child_commment.username}</p>
                                                                <p className="mb-3 col-12">{child_commment.comment}</p>
                                                                <div className="d-flex flex-wrap mb-3">
                                                                    <span className="text-grey me-4">{new Intl.DateTimeFormat('en-GB', {
                                                                        day: 'numeric',
                                                                        month: 'long',
                                                                        year: 'numeric',
                                                                    }).format(new Date(child_commment.createdAt))}</span>
                                                                    <div>
                                                                        <span className="text-grey mx-2">
                                                                            <svg width="16" height="17" viewBox="0 0 16 17" fill={!child_commment.isLike ? 'black' : 'none'} xmlns="http://www.w3.org/2000/svg" >
                                                                                <path style={{ fill: `${!child_commment.isLike ? 'rgb(148, 148, 148)' : 'black'}` }} d="M9.12417 0.98167C9.18999 0.866597 9.2907 0.775434 9.41173 0.721357C9.53277 0.667279 9.66787 0.653089 9.7975 0.680836L9.90333 0.703336C10.3442 0.797779 10.7604 0.983504 11.1252 1.24855C11.4899 1.5136 11.7952 1.8521 12.0212 2.24225C12.2472 2.63241 12.389 3.06556 12.4374 3.51384C12.4859 3.96211 12.4399 4.41557 12.3025 4.845L11.7725 6.5H12.72C14.9242 6.5 16.4808 8.65917 15.7833 10.75L14.4842 14.6483C14.3044 15.1875 13.9595 15.6565 13.4984 15.9888C13.0373 16.3211 12.4834 16.5 11.915 16.5H7.5075C6.64986 16.5002 5.81808 16.2063 5.15083 15.6675C5.03245 15.9167 4.84582 16.1272 4.61262 16.2745C4.37941 16.4219 4.10919 16.5001 3.83333 16.5H1.95833C1.57156 16.5 1.20063 16.3464 0.927136 16.0729C0.653645 15.7994 0.5 15.4284 0.5 15.0417V7.95834C0.5 7.15334 1.15333 6.5 1.95833 6.5H5.85C5.88672 6.49999 5.92279 6.49027 5.95454 6.47183C5.9863 6.45339 6.01262 6.42689 6.03083 6.395L9.12417 0.98167ZM5.29167 14.1333L5.86083 14.6317C6.3167 15.0304 6.90183 15.2502 7.5075 15.25H11.915C12.2211 15.2499 12.5194 15.1536 12.7677 14.9745C13.016 14.7955 13.2016 14.5429 13.2983 14.2525L14.5975 10.355C14.6967 10.0575 14.7237 9.7407 14.6764 9.4307C14.6291 9.12069 14.5088 8.82636 14.3255 8.57196C14.1421 8.31756 13.901 8.11037 13.6218 7.96746C13.3427 7.82455 13.0336 7.75002 12.72 7.75H10.9167C10.8183 7.74998 10.7212 7.72671 10.6335 7.6821C10.5458 7.63749 10.4698 7.5728 10.4119 7.49328C10.3539 7.41377 10.3155 7.32169 10.2998 7.22453C10.2841 7.12737 10.2916 7.02788 10.3217 6.93417L11.1117 4.46417C11.2641 3.98826 11.2309 3.47229 11.0187 3.01985C10.8065 2.56742 10.4309 2.21202 9.9675 2.025L7.11583 7.015C6.98834 7.23821 6.80411 7.42375 6.58181 7.55282C6.35952 7.6819 6.10705 7.74992 5.85 7.75H5.29167V14.1333ZM4.04167 7.75H1.95833C1.90308 7.75 1.85009 7.77195 1.81102 7.81102C1.77195 7.85009 1.75 7.90308 1.75 7.95834V15.0417C1.75 15.1567 1.84333 15.25 1.95833 15.25H3.83333C3.88859 15.25 3.94158 15.2281 3.98065 15.189C4.01972 15.1499 4.04167 15.0969 4.04167 15.0417V7.75Z" fill="#949494" />
                                                                            </svg>
                                                                            <span className={`${!child_commment.isLike ? 'text-grey' : 'color-black text-black'} ms-1`} style={{ cursor: 'pointer' }} onClick={() => handleLikeClick(child_commment.id)}>
                                                                                {(child_commment.like ?? 0) + ' Suka'}
                                                                            </span>
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        :
                                                        ''
                                                ))}
                                            </div>
                                        </div>
                                        : ''
                                ))}
                            </div>
                        </div>

                    </div>

                </div>
                {/* <div className="col-md-4 px-3">
                    <div className="py-3 px-4 rounded-2" style={{ border: '1px solid #028430' }}>
                        <div className="d-flex flex-wrap mb-4 align-items-center">
                            <div style={{ width: 15, height: 30, backgroundColor: '#D2E6E4' }} className="me-3"></div>
                            <span className="fw-bold color-primary">Diskusi Terpopuler</span>
                        </div>
                        <div className="row">
                            <div className="col-12 d-flex flex-wrap justify-content-between align-items-center mb-2">
                                <Link to="/forum">
                                    <p className="mb-0">Penanaman</p>
                                </Link>
                                <div className="rounded-circle" style={{ backgroundColor: '#0B7077', width: 30, height: 30, textAlign: 'center', color: 'white', alignContent: 'center' }}>1</div>
                            </div>
                            <div className="col-12 d-flex flex-wrap justify-content-between align-items-center mb-2">
                                <p className="mb-0">Pemumpukan</p>
                                <div className="rounded-circle" style={{ backgroundColor: '#0B7077', width: 30, height: 30, textAlign: 'center', color: 'white', alignContent: 'center' }}>1</div>
                            </div>
                            <div className="col-12 d-flex flex-wrap justify-content-between align-items-center mb-2">
                                <p className="mb-0">Pengelolaan</p>
                                <div className="rounded-circle" style={{ backgroundColor: '#0B7077', width: 30, height: 30, textAlign: 'center', color: 'white', alignContent: 'center' }}>1</div>
                            </div>
                            <div className="col-12 d-flex flex-wrap justify-content-between align-items-center mb-2">
                                <p className="mb-0">Hama</p>
                                <div className="rounded-circle" style={{ backgroundColor: '#0B7077', width: 30, height: 30, textAlign: 'center', color: 'white', alignContent: 'center' }}>1</div>
                            </div>
                        </div>
                    </div>
                </div> */}
            </div>

            <Footer />
        </div>
    );
}

export default ForumDetail;
