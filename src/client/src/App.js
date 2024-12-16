import React, { useEffect, useState } from "react";
import Carousel from 'react-bootstrap/Carousel';
import Header from "./components/header/header";
import Footer from "./components/footer/footer";
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';

import TentangKami from "./pages/tentang_kami/tentang_kami";
import Artikel from "./pages/artikel/artikel";
import Home from "./pages/home";
import DetailArtikel from "./pages/artikel/detail_artikel";
import Forum from "./pages/forum/forum";
import ForumDetail from "./pages/forum/detail_forum";
import Edukasi from "./pages/edukasi/edukasi";
import Login from "./pages/auth/login";
import Signup from "./pages/auth/signup";
import UserDashboard from "./pages/user/dashboard";
import KursusTersimpan from "./pages/user/kursus_tersimpan";
import Kursus from "./pages/user/kursus";
import Sertifikat from "./pages/user/sertifikat";
import DetailKursus from "./pages/user/detail_kursus";
import DetailMateri from "./pages/user/detail_materi";
import UserForum from "./pages/user/forum";
import AdminDashboard from "./pages/admin/dashboard";
import AdminKategoriKursus from "./pages/admin/kategori_kursus";
import AdminKursus from "./pages/admin/kursus";
import AdminArtikel from "./pages/admin/artikel";
import AdminKategoriArtikel from "./pages/admin/kategori_artikel";
import AdminKategoriKursusTambah from "./pages/admin/artikel_add";
import AdminKategoriArtikelTambah from "./pages/admin/artikel_add";
import AdminArtikelAdd from "./pages/admin/artikel_add";
import AdminKategoriArtikelAdd from "./pages/admin/kategori_artikel_add";
import AdminKursusAdd from "./pages/admin/kursus_add";
import AdminKategoriKursusAdd from "./pages/admin/kategori_kursus_add";
import UserPengaturan from "./pages/user/pengaturan";
import UserQuiz from "./pages/user/quiz";
import "./App.css";
import UserHasilQuiz from "./pages/user/quiz_hasil";
import PageNotFound from "./pages/404";
import AuthRoute from "./middleware/AuthRoute";
import NonAuthRoute from "./middleware/NonAuthRoute";
import UserRoute from "./middleware/UserRoute";
import AdminRoute from "./middleware/AdminRoute";
import AdminKategoriArtikelEdit from "./pages/admin/kategori_artikel_edit";
import AdminKategoriKursusEdit from "./pages/admin/kategori_kursus_edit";
import AdminArtikelEdit from "./pages/admin/artikel_edit";
import AdminKursusEdit from "./pages/admin/kursus_edit";
import DetailMateriRangkuman from "./pages/user/detail_materi_rangkuman";

function App() {
  const [backgroundIndex, setIndex] = useState(0);
  const [tawarkanIndex, setTawarkanIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };
  const handleTawarkanSelect = (selectedIndex) => {
    setTawarkanIndex(selectedIndex);
  };
  
  return (
    <BrowserRouter>

      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/tentang-kami" element={<TentangKami />} />
        <Route path="/artikel" element={<Artikel />} />
        <Route path="/artikel/detail/:id" element={<DetailArtikel />} />
        <Route path="/forum" element={<Forum />} />
        <Route path="/forum/detail/:id" element={<ForumDetail />} />
        <Route path="/edukasi" element={<Edukasi />} />
        <Route element={<NonAuthRoute  />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Signup />} />
        </Route>


        <Route element={<AuthRoute />}>
          <Route element={<UserRoute />}>
            <Route path="/user/" element={<UserDashboard />} />
            <Route path="/user/kursus-tersimpan" element={<KursusTersimpan />} />
            <Route path="/user/kursus" element={<Kursus />} />
            <Route path="/user/kursus/detail/:id" element={<DetailKursus />} />
            <Route path="/user/kursus/materi/:id" element={<DetailMateri />} />
            <Route path="/user/kursus/rangkuman/:id" element={<DetailMateriRangkuman />} />
            <Route path="/user/forum" element={<UserForum />} />
            <Route path="/user/sertifikat" element={<Sertifikat />} />
            <Route path="/user/pengaturan" element={<UserPengaturan />} />
            <Route path="/user/quiz/:id" element={<UserQuiz />} />
            <Route path="/user/quiz/hasil/:id" element={<UserHasilQuiz />} />
          </Route>

          <Route element={<AdminRoute />}>
            <Route path="/admin/" element={<AdminDashboard />} />
            <Route path="/admin/kategori/kursus" element={<AdminKategoriKursus />} />
            <Route path="/admin/kategori/kursus/add" element={<AdminKategoriKursusAdd />} />
            <Route path="/admin/kategori/kursus/edit/:id" element={<AdminKategoriKursusEdit />} />
            <Route path="/admin/kategori/artikel" element={<AdminKategoriArtikel />} />
            <Route path="/admin/kategori/artikel/add" element={<AdminKategoriArtikelAdd />} />
            <Route path="/admin/kategori/artikel/edit/:id" element={<AdminKategoriArtikelEdit />} />
            <Route path="/admin/kursus" element={<AdminKursus />} />
            <Route path="/admin/kursus/add" element={<AdminKursusAdd />} />
            <Route path="/admin/kursus/edit/:id" element={<AdminKursusEdit />} />
            <Route path="/admin/artikel/edit/:id" element={<AdminArtikelEdit />} />
            <Route path="/admin/artikel" element={<AdminArtikel />} />
            <Route path="/admin/artikel/add" element={<AdminArtikelAdd />} />
          </Route>
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
