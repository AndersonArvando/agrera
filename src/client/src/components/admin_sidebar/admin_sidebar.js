// Sidebar.js
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './admin_sidebar.css';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { matchPath } from "react-router";


function AdminSidebar() {
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(false);
    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    const navigate = useNavigate();

    const handleLogout = () => {
      // Clear token from localStorage
      localStorage.removeItem('authToken');
      
      // Optionally clear other user-related state
      // e.g., localStorage.removeItem('userDetails');
  
      // Redirect to the login or home page
      navigate('/login');
    };

    return (
        <>
            {/* Toggle button for smaller screens */}
            <div className='mb-4 toggle-btn-open'>
                <svg style={{ cursor: 'pointer', color: '#028430', fill: '#028430' }} onClick={toggleSidebar} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-menu"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
            </div>


            <nav className={`sidebar ${isOpen ? 'open' : ''}`} style={{ borderRadius: 10, boxShadow: '2px 4px 30px 0 rgba(0,0,0,0.1)' }}>
                <div className='col-12 text-end'>
                    <svg style={{ cursor: 'pointer', color: '#028430', fill: '#028430' }} onClick={toggleSidebar} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-menu toggle-btn-close"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
                </div>
                <div className="sidebar-header">
                    <img src={require('../../image/user_profile.png')} style={{ width: 50, height: 50 }} />
                    <h5 className='color-primary fw-bold'>User0123</h5>
                </div>
                <p className='align-self-start mb-0' style={{ padding: 10 }}>Menu</p>
                <ul className="sidebar-menu">
                    <NavLink to="/admin" end >
                        <li className="sidebar-item">
                            <div style={{ padding: 10, backgroundColor: '#028430', borderRadius: 10, width: 48, height: 45, textAlign: 'center' }} className='me-2'>
                                <svg width="22" height="22" viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect width="12" height="12" rx="2" fill="white" />
                                    <rect x="15" width="12" height="12" rx="2" fill="white" />
                                    <rect y="15" width="12" height="12" rx="2" fill="white" />
                                    <rect x="15" y="15" width="12" height="12" rx="2" fill="white" />
                                </svg>

                            </div>
                            <span className='fw-semibold'>Beranda</span>
                        </li>
                    </NavLink>
                    <NavLink to="/admin/kursus" end>
                        <li className="sidebar-item">
                            <div style={{ padding: 10, backgroundColor: '#028430', borderRadius: 10, width: 48, height: 45, textAlign: 'center' }} className='me-2'>
                                <img src={require('../../image/computer_svg.svg')} alt="Logo" />
                            </div>
                            <span className='fw-semibold'>Kursus</span>
                        </li>
                    </NavLink>
                    <NavLink to="/admin/artikel" end>
                        <li className="sidebar-item">
                            <div style={{ padding: 10, backgroundColor: '#028430', borderRadius: 10, width: 48, height: 45, textAlign: 'center' }} className='me-2'>
                                <img src={require('../../image/certificate_svg.svg')} alt="Logo" />
                            </div>
                            <span className='fw-semibold'>Artikel</span>
                        </li>
                    </NavLink>
                    <NavLink to="javascript:void(0)" data-bs-toggle="collapse" data-bs-target="#category-collapse" end>
                        <li className="sidebar-item">
                            <div style={{ padding: 10, backgroundColor: '#028430', borderRadius: 10, width: 48, height: 45, textAlign: 'center' }} className='me-2'>
                                <img src={require('../../image/forum_svg.svg')} alt="Logo" />
                            </div>
                            <span className='fw-semibold'>Kategori</span>
                        </li>
                    </NavLink>
                    <div class={`collapse ${!!matchPath('/admin/kategori/*', location.pathname) ? 'show' : ''}`} id="category-collapse">
                        <NavLink to="/admin/kategori/kursus" end>
                            <li className="sidebar-item ps-5">
                                <svg width="10" height="15" viewBox="0 0 10 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M0.901244 13.5758C0.900547 13.8147 0.97071 14.0485 1.10286 14.2476C1.23502 14.4467 1.42323 14.6021 1.6437 14.6942C1.86418 14.7863 2.10702 14.811 2.34152 14.7652C2.57603 14.7193 2.79167 14.6049 2.96118 14.4365L9.02174 8.41379C9.24898 8.18791 9.37719 7.88102 9.3782 7.56061C9.3792 7.24021 9.25291 6.93252 9.02709 6.70522L3.00437 0.64466C2.83592 0.475195 2.621 0.359482 2.38678 0.312146C2.15257 0.264809 1.90958 0.287978 1.68853 0.378721C1.46749 0.469463 1.27831 0.623706 1.14491 0.821952C1.01151 1.0202 0.939883 1.25354 0.939084 1.49249L0.901244 13.5758Z" fill="#028430" />
                                </svg>

                                <span className='fw-semibold ms-2'>Kategori Kursus</span>
                            </li>
                        </NavLink>
                        <NavLink to="/admin/kategori/artikel" end>
                            <li className="sidebar-item ps-5">
                                <svg width="10" height="15" viewBox="0 0 10 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M0.901244 13.5758C0.900547 13.8147 0.97071 14.0485 1.10286 14.2476C1.23502 14.4467 1.42323 14.6021 1.6437 14.6942C1.86418 14.7863 2.10702 14.811 2.34152 14.7652C2.57603 14.7193 2.79167 14.6049 2.96118 14.4365L9.02174 8.41379C9.24898 8.18791 9.37719 7.88102 9.3782 7.56061C9.3792 7.24021 9.25291 6.93252 9.02709 6.70522L3.00437 0.64466C2.83592 0.475195 2.621 0.359482 2.38678 0.312146C2.15257 0.264809 1.90958 0.287978 1.68853 0.378721C1.46749 0.469463 1.27831 0.623706 1.14491 0.821952C1.01151 1.0202 0.939883 1.25354 0.939084 1.49249L0.901244 13.5758Z" fill="#028430" />
                                </svg>

                                <span className='fw-semibold ms-2'>Kategori Artikel</span>
                            </li>
                        </NavLink>
                    </div>
                    <NavLink to="javascript:void(0)" onClick={handleLogout} end>
                        <li className="sidebar-item">
                            <div style={{ padding: 10, backgroundColor: '#028430', borderRadius: 10, width: 48, height: 45, textAlign: 'center' }} className='me-2'>
                                <img src={require('../../image/logout_svg.svg')} alt="Logo" />
                            </div>
                            <span className='fw-semibold'>Keluar</span>
                        </li>
                    </NavLink>
                </ul>
                <div className="sidebar-footer w-100">
                    <img src={require('../../image/logo.png')} className="w-100" alt="Logo" /> {/* Replace with your logo */}
                </div>
            </nav>
        </>
    );
}

export default AdminSidebar;
