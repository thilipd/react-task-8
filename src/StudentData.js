import axios from 'axios';
import { useState } from 'react';
import './App.css';
import StudentForm from './StudentForm';
import { Button } from '@mui/material';



const StudentData = (props) => {



    const [toggleState, setToggleState] = useState(false);


    const toggleFunc = (val) => {
        setToggleState(val);

    }


    const [studentsState, setStudentsState] = useState({ id: '' });

    let teacherName = props.teacherData;


    const populateStudentData = (id) => {

        toggleFunc(true);
        setStudentsState({ id: id })

    }



    const handleStudentDelete = async (id) => {

        await axios.delete(
            `https://6240b0909b450ae2743749f4.mockapi.io/student/${id}`
        );
        props.fetchData()

    }




    return (
        <>
            <div className='studentContainer'>

                <div className='studentData'>
                    <h2> Student Data </h2>


                    <table border={1}>
                        <thead>
                            <tr>
                                <td> Id </td>
                                <td> Name </td>
                                <td> Subject </td>
                                <td> grade </td>
                                <td> Assigned Teacher </td>
                                <td> Actions </td>
                            </tr>
                        </thead>
                        <tbody>
                            {props.studentsData.map((data) => (
                                <tr key={data.id}>
                                    <td> {data.id} </td>
                                    <td> {data.name} </td>
                                    <td> {data.subject} </td>
                                    <td> {data.grade} </td>
                                    <td> {data.teacher} </td>
                                    <td>
                                        <Button color='success' onClick={() => populateStudentData(data.id)}>

                                            Update
                                        </Button>
                                        &nbsp;
                                        <Button color='warning' onClick={() => handleStudentDelete(data.id)}>

                                            Delete
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className='studentForm'>

                    <div className='formHead'>
                        <h2>Student Form</h2>
                    </div>
                    <div>
                        <Button variant='contained'
                            color='primary'
                            onClick={() => { setToggleState(true) }}> Create Teacher Data </Button>
                    </div>

                    <div>
                        {(toggleState) ?
                            <>
                                <StudentForm studentsData={props.studentsData}
                                    teacherData={teacherName}
                                    fetchData={props.fetchData}
                                    toggleFunc={toggleFunc}
                                    updateId={studentsState.id}
                                />

                            </> :
                            <></>}
                    </div>
                </div>
            </div>
        </>
    )
}


export default StudentData;