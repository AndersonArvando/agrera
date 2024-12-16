import React, { useEffect, useState } from "react";

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';

import UserSidebar from "../../components/user_sidebar/user_sidebar";
import { Link, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

function UserQuiz() {
    const { id } = useParams(); // Get the item ID from the route
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [course, setCourse] = useState({});
    const [modules, setModules] = useState({});
    const [soals, setSoals] = useState([]);
    const [selectedChoices, setSelectedChoices] = useState({});
    const navigate = useNavigate();
    const token = localStorage.getItem('authToken');
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

    const handleSaveQuizClick = (e) => {
        e.preventDefault();
        Swal.fire({
            title: 'Apakah anda ingin menyelesaikan quiz ini?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: 'rgb(2, 132, 48)',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Iya!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const submissionData = new FormData();
                    submissionData.append('selectedChoices', selectedChoices);

                    const dataResponse = await fetch(`/user/quiz/complete/${id}`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: token,
                        },
                        body: JSON.stringify({ answer: selectedChoices })
                    });

                    if(dataResponse.ok) {
                        navigate('/user/quiz/hasil/' + id, { state: { success: 'Jawaban berhasil disimpan!' } })
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
                headers: { 'Content-Type': 'application/json' },
            });

            const data = await dataResponse.json();
            setCourse(data)
            setSoals(data.quizzes)
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false); // Stop loading spinner
        }
    };

    useEffect(() => {
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
                    <h1 className="text-center fw-bold color-primary" style={{ fontSize: 'calc(1.375rem + 2vw)' }}>{course.name}</h1>
                    <div className="px-3 py-1 rounded-5 color-primary fw-bold" style={{ fontSize: 14, backgroundColor: 'white', border: '1px solid #028430', width: 'fit-content' }}>{course.category_name}</div>
                </div>
                <form onSubmit={handleSaveQuizClick}>
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
                                                    checked={selectedChoices[soal_i] === pilihan_i} // Check the radio button if it matches the selected choice
                                                    onChange={() => handleSelect(soal_i, pilihan_i)} // Handle selection
                                                />
                                                <label for={soal_i + "_" + pilihan_i} className="form-check-label">
                                                    {pilihan}
                                                </label>
                                            </div>
                                        ))}
                                        {selectedChoices[soal_i] !== undefined && selectedChoices[soal_i] !== null && (
                                            <h5
                                                className="px-3 my-2 fw-bold text-grey"
                                                style={{ cursor: 'pointer' }}
                                                onClick={() => handleClearSelection(soal_i)} // Clear selection on click
                                            >
                                                Hapus Pilihan Saya
                                            </h5>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )) : ''
                    }
                    <div className="text-center">
                        <button type="submit" className="btn rounded-5 px-4 py-2 text-white" style={{ backgroundColor: '#028430' }}>Simpan Jawaban</button>
                    </div>
                </form>

            </div>
        </div >
    );
}

export default UserQuiz;
