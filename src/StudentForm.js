import { Button } from '@mui/material';
import axios from 'axios';
import { Formik } from "formik";
import './App.css';




const StudentForm = (props) => {



    let students = [...props.studentsData];


    let initialValues = {
        students: [...props.studentsData],
        name: '',
        grade: '',
        teacher: 'Dianna Berge',
        subject: 'react'
    }


    if (props.updateId !== '') {
        let selectedStudentData = props.studentsData.filter((data) => data.id === props.updateId)[0];
        initialValues = {
            students: [...props.studentsData],
            name: selectedStudentData.name,
            grade: selectedStudentData.grade,
            teacher: selectedStudentData.teacher,
            subject: selectedStudentData.subject
        }
    }

    const handleStudentCreate = async (formData) => {

        var response = await axios.post(
            'https://6240b0909b450ae2743749f4.mockapi.io/student',
            {
                name: formData.name,
                grade: formData.grade,
                subject: formData.subject,
                teacher: formData.teacher

            });
        students.push(response.data);
        props.fetchData()
    }


    let validate = (formData) => {
        var errors = {};
        if (formData.name === '') errors.name = 'Name is required';
        if (formData.grade === '') errors.grade = 'Grade is required';


        return errors;
    }

    const handleStudentUpdate = async (id, formData) => {

        var response = await axios.put(
            `https://6240b0909b450ae2743749f4.mockapi.io/student/${id}`,
            {
                name: formData.name,
                grade: formData.grade,
                subject: formData.subject,
                teacher: formData.teacher,
            }
        );
        let index = students.findIndex(
            (user) => user.id === response.data.id
        );

        students[index] = response.data;
        props.fetchData();

    }


    const handleSubmit = (formData) => {

        props.toggleFunc(false);


        if (props.updateId !== '') {
            handleStudentUpdate(props.updateId, formData)
        } else {
            handleStudentCreate(formData)
        }

        props.updateId = '';


    }

    return (
        <>

            {<div className="formContainer">

                <hr />

                <Formik

                    initialValues={initialValues}
                    validate={(formData) => validate(formData)}
                    onSubmit={(formData) => handleSubmit(formData)}

                >

                    {({
                        values,
                        errors,
                        touched,
                        handleChange,
                        handleBlur,
                        handleSubmit
                    }) => (
                        <form onSubmit={(e) => handleSubmit(e)}>
                            <div>
                                <label> Name: </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={values.name}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                <br />
                                <span style={{ color: 'red' }}>
                                    {touched.name && errors.name}
                                </span>
                            </div>
                            <br />
                            <div>
                                <label> Subject: </label>
                                <select
                                    name="subject"
                                    value={values.subject}
                                    onChange={handleChange}
                                >
                                    <option value="react"> React </option>
                                    <option value="node"> Node </option>
                                    <option value="mysql"> MySQL </option>
                                    <option value="mongo"> Mongo </option>
                                </select>
                            </div>

                            <br />
                            <div>
                                <label> Grade: </label>
                                <input
                                    type="text"
                                    name="grade"
                                    value={values.grade}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                <br />
                                <span style={{ color: 'red' }}>
                                    {touched.grade && errors.grade}
                                </span>
                                <br />
                            </div>
                            <br />
                            <div>
                                <label> Assign Teacher: </label>
                                <select
                                    name="teacher"
                                    value={values.teacher}
                                    onChange={handleChange}
                                >
                                    {props.teacherData.map((data) => {
                                        return (
                                            < option value={data} > {data} </option>
                                        );
                                    })}
                                </select>

                            </div>


                            <br />
                            <div className="formBtn">
                                <Button variant="contained" type="submit"> Submit </Button> &nbsp;
                                <Button variant="contained" type="button"> Reset </Button> &nbsp;
                            </div>
                        </form>
                    )}
                </Formik>
            </div >}
        </>
    )
}


export default StudentForm;