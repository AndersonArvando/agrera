// Sidebar.js
import React, { useEffect, useRef, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './user_sidebar.css';
import { NavLink, useNavigate } from 'react-router-dom';

function UserSidebar() {
    const [isOpen, setIsOpen] = useState(false);


    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const sidebarRef = useRef(null);
  
    // Close sidebar when clicking outside of it
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setIsOpen(false);
      }
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
  
  
    useEffect(() => {
      if (isOpen) {
        // Add event listener when sidebar is open
        document.addEventListener('mousedown', handleClickOutside);
      } else {
        // Remove event listener when sidebar is closed
        document.removeEventListener('mousedown', handleClickOutside);
      }
  
      // Clean up event listener on unmount
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [isOpen]);
  



    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            {/* Toggle button for smaller screens */}
            <div className='mb-4 toggle-btn-open'>
                <svg style={{ cursor: 'pointer', color: '#028430', fill: '#028430' }} onClick={toggleSidebar} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-menu"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
            </div>


            <nav ref={sidebarRef} className={`sidebar ${isOpen ? 'open' : ''}`} style={{ borderRadius: 10, boxShadow: '2px 4px 30px 0 rgba(0,0,0,0.1)' }}>
                <div className='col-12 text-end'>
                    <svg style={{ cursor: 'pointer', color: '#028430', fill: '#028430' }} onClick={toggleSidebar} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-menu toggle-btn-close"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
                </div>
                <div className="sidebar-header">
                    <img src={require('../../image/user_profile.png')} style={{ width: 50, height: 50 }} />
                    <h5 className='color-primary fw-bold'>User0123</h5>
                </div>
                <p className='align-self-start mb-0' style={{ padding: 10 }}>Menu</p>
                <ul className="sidebar-menu">
                    <NavLink to="/user" end >
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
                    <NavLink to="/user/kursus-tersimpan" end>
                        <li className="sidebar-item">
                            <div style={{ padding: 10, backgroundColor: '#028430', borderRadius: 10, width: 48, height: 45, textAlign: 'center' }} className='me-2'>
                                <img src={require('../../image/bookmark_svg.svg')} alt="Logo" />
                            </div>
                            <span className='fw-semibold'>Kursus Tersimpan</span>
                        </li>
                    </NavLink>
                    <NavLink to="/user/kursus" end>
                        <li className="sidebar-item">
                            <div style={{ padding: 10, backgroundColor: '#028430', borderRadius: 10, width: 48, height: 45, textAlign: 'center' }} className='me-2'>
                                <img src={require('../../image/computer_svg.svg')} alt="Logo" />
                            </div>
                            <span className='fw-semibold'>Semua Kursus</span>
                        </li>
                    </NavLink>
                    {/* <NavLink to="/user/sertifikat" end>
                        <li className="sidebar-item">
                            <div style={{ padding: 10, backgroundColor: '#028430', borderRadius: 10, width: 48, height: 45, textAlign: 'center' }} className='me-2'>
                                <img src={require('../../image/certificate_svg.svg')} alt="Logo" />
                            </div>
                            <span className='fw-semibold'>Sertifikat</span>
                        </li>
                    </NavLink> */}
                    <NavLink to="/user/forum" end>
                        <li className="sidebar-item">
                            <div style={{ padding: 10, backgroundColor: '#028430', borderRadius: 10, width: 48, height: 45, textAlign: 'center' }} className='me-2'>
                                <img src={require('../../image/forum_svg.svg')} alt="Logo" />
                            </div>
                            <span className='fw-semibold'>Forum Diskusi</span>
                        </li>
                    </NavLink>
                    <NavLink to="/user/pengaturan" end>
                        <li className="sidebar-item">
                            <div style={{ padding: 10, backgroundColor: '#028430', borderRadius: 10, width: 48, height: 45, textAlign: 'center' }} className='me-2'>
                                <img src={require('../../image/setting_svg.svg')} alt="Logo" />
                            </div>
                            <span className='fw-semibold'>Pengaturan Akun</span>
                        </li>
                    </NavLink>
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

export default UserSidebar;
