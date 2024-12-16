import React, { useEffect, useState } from "react";

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';

import UserSidebar from "../../components/user_sidebar/user_sidebar";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { NotificationContainer, NotificationManager } from "react-notifications";
import 'react-notifications/lib/notifications.css';
import Swal from "sweetalert2";

function UserHasilQuiz() {
    const { id } = useParams(); // Get the item ID from the route
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [course, setCourse] = useState({});
    const [modules, setModules] = useState({});
    const [soals, setSoals] = useState([]);
    const [selectedChoices, setSelectedChoices] = useState({});
    const navigate = useNavigate();
    const token = localStorage.getItem('authToken');
    const location = useLocation();
    const { success, danger } = location.state || {};
    // Handle radio button change
    const handleSelect = (questionIndex, choiceIndex) => {
        setSelectedChoices({
            ...selectedChoices,
            [questionIndex]: choiceIndex,
        });
    };

    // Handle clearing the selection
    const handleClearSelection = (questionIndex) => {
        setSelectedChoices({
            ...selectedChoices,
            [questionIndex]: null, // Reset the selected choice for this question
        });
    };
    const fetchData = async () => {
        try {
            const dataResponse = await fetch(`/admin/course/edit/${id}`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            });

            const data = await dataResponse.json();
            setCourse(data)
            setSoals(data.quizzes)

            
            const hasil = await fetch(`/user/quiz/hasil/${id}`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json', Authorization: token },
            });
            const hasilResponse = await hasil.json();
            var choices = [];
            var answers = hasilResponse.map((value, index) => {
                choices[index] = value.answer;
            })
            setSelectedChoices(choices);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false); // Stop loading spinner
        }
    };

    useEffect(() => {
        if (success) {
            NotificationManager.success(success, 'Berhasil');
        }
        if (danger) {
            NotificationManager.success(danger, 'Gagal');
        }

        fetchData();
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
                    <h1 className="text-center fw-bold color-primary" style={{ fontSize: 'calc(1.375rem + 2vw)' }}>Bertanam Hidroponik untuk Pemula</h1>
                    <div className="px-3 py-1 rounded-5 color-primary fw-bold" style={{ fontSize: 14, backgroundColor: 'white', border: '1px solid #028430', width: 'fit-content' }}>Hidroponik</div>
                </div>
                {
                    soals.length > 0 ? soals.map((data, soal_i) => (
                        <div className="row mb-4">
                            <div className="d-sm-block d-none text-center" style={{ width: '10%' }}>
                                <div className="py-2 fs-1 rounded-3" style={{ border: '1px solid #028430', backgroundColor: '#EBF6EF' }}>{soal_i + 1}</div>
                            </div>
                            <div className="col">
                                <div className="p-3 color-primary" style={{ border: '1px solid #028430', backgroundColor: '#EBF6EF' }}>
                                    <p className="color-primary">{data.question}</p>
                                    <p className="text-grey mb-2" style={{ fontSize: 14 }}>Pilih salah satu</p>
                                    {JSON.parse(data.choices).map((pilihan, pilihan_i) => (
                                        <div className="form-check">
                                            <input type="radio" required
                                                id={`${soal_i}_${pilihan_i}`}
                                                name={`soal_${soal_i}`}
                                                className="me-2"
                                                disabled
                                                checked={selectedChoices[soal_i] === pilihan_i} // Check the radio button if it matches the selected choice
                                                onChange={() => handleSelect(soal_i, pilihan_i)} // Handle selection
                                            />
                                            <label for={soal_i + "_" + pilihan_i} className="form-check-label">
                                                {pilihan}
                                            </label>
                                            {data.answer == pilihan_i ? <img src={require("../../image/check.png")} className="mx-3" style={{width: 20}}/> : '' }
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )) : ''
                }

                <div className="text-center">
                    <Link to={"/user/kursus/detail/" + course.id}>
                        <button className="btn rounded-5 px-4 py-2 text-white" style={{ backgroundColor: '#028430' }}>Kembali</button>
                    </Link>
                </div>

            </div>
            <NotificationContainer />
        </div >
    );
}

export default UserHasilQuiz;
