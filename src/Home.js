import './App.css';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import StudentData from './StudentData';
import TeachersData from './TeacherData';
import Header from './Header';
import { Card, Button } from '@mui/material';

// import StudentForm from './StudentForm';
// import TeacherForm from './TeacherForm';


const Home = (props) => {




    let [state, setState] = useState({
        studentsData: [],
        teachersData: [],
    });
    const fetchData = async () => {

        const studentResponse = await axios.get('https://6240b0909b450ae2743749f4.mockapi.io/student');
        const teacherResponse = await axios.get('https://6240b0909b450ae2743749f4.mockapi.io/Teacher');
        await setState({
            studentsData: [...studentResponse.data],
            teachersData: [...teacherResponse.data]
        })

    }

    useEffect(() => fetchData(), []);



    let teacherName = state.teachersData.map((data) => data.name);




    return (
        <>


            {(props.value === 'teacher') ?
                <TeachersData teachersData={state.teachersData} fetchData={fetchData} /> :
                <StudentData studentsData={state.studentsData} teacherData={teacherName} fetchData={fetchData} />
            }




        </>
    )
}


export default Home


