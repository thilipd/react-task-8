
import axios from 'axios';
import { useState } from 'react';
import './App.css';
import TeacherForm from './TeacherForm';
import { Button } from '@mui/material';

const TeachersData = (props) => {

    let clickState = true;


    const [toggleState, setToggleState] = useState(false);


    const toggleFunc = (val) => {
        setToggleState(val);
    }

    let [teacherState, setTeacherState] = useState({ id: '' });

    const populateTeacherData = (id) => {
        toggleFunc(true);

        setTeacherState({ id: id });


    }


    const handleTeacherDelete = async (id) => {
        await axios.delete(
            `https://6240b0909b450ae2743749f4.mockapi.io/Teacher/${id}`
        );
        props.fetchData();
    }



    return (
        <>
            <div className='teacherContainer'>

                <div className='teachersData'>


                    <div className='teachersDataHead'>
                        <h2> Teachers Data </h2>

                    </div>

                    <table border={1}>
                        <thead>
                            <tr>
                                <td> Id </td>
                                <td> Name </td>
                                <td> Subject </td>
                                <td> Actions </td>
                            </tr>
                        </thead>
                        <tbody>
                            {props.teachersData.map((data) => (
                                <tr key={data.id}>
                                    <td> {data.id} </td>
                                    <td> {data.name} </td>
                                    <td> {data.subject} </td>
                                    <td>
                                        <Button color='success'
                                            onClick={() => populateTeacherData(data.id)}>

                                            Update
                                        </Button>
                                        &nbsp;
                                        <Button color='warning'
                                            onClick={() => handleTeacherDelete(data.id)}>

                                            Delete
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                </div>

                <div className='teachersForm'>
                    <div className='formHead'>
                        <h2>Teachers Form</h2>
                    </div>
                    <div>
                        <Button variant='contained'
                            color='primary'
                            onClick={() => { setToggleState(true) }}> Create Teacher Data </Button>
                    </div>
                    <div>
                        {toggleState ?
                            <>
                                <TeacherForm teachersData={props.teachersData}
                                    fetchData={props.fetchData}
                                    toggleFunc={toggleFunc}
                                    updateId={teacherState.id} />
                            </> :
                            <></>
                        }
                    </div>
                </div>

            </div>
        </>
    )
}


export default TeachersData;