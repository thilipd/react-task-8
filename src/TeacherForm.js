import { Formik } from "formik";
import axios from 'axios';
import './App.css';
import { Button } from '@mui/material';



const TeacherForm = (props) => {

    let initialValues = {
        name: '',
        subject: 'React'
    }

    if (props.updateId !== '') {
        let selectedTeacherData = props.teachersData.filter((data) => data.id === props.updateId)[0];
        initialValues = {
            name: selectedTeacherData.name,
            subject: selectedTeacherData.subject
        }
    }


    const handleTeacherCreate = async (formData) => {

        var response = await axios.post(
            'https://6240b0909b450ae2743749f4.mockapi.io/Teacher',
            {
                name: formData.name,
                subject: formData.subject,

            });

        props.teachersData.push(response.data)
        props.fetchData();

    }

    const handleTeacherUpadte = async (id, formData) => {


        var response = await axios.put(
            `https://6240b0909b450ae2743749f4.mockapi.io/Teacher/${Number(id)}`,
            {
                name: formData.name,
                subject: formData.subject,

            });


        props.fetchData();

    }

    let validate = (formData) => {

        var errors = {};
        if (formData.name === '') errors.name = 'Name is required';


        return errors;
    }

    const handleSubmit = (formData) => {

        props.toggleFunc(false);


        if (props.updateId !== '') {
            handleTeacherUpadte(props.updateId, formData)
        } else {
            handleTeacherCreate(formData);
        }
        props.updateId = '';
    }

    return (
        <>

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
                            <label>Name:</label>
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
                        <div className="formBtn">
                            <Button variant="contained" type="submit"> Submit </Button> &nbsp;
                            <Button variant="contained" type="button"> Reset </Button> &nbsp;
                        </div>
                    </form>

                )}

            </Formik>
        </>
    )
}

export default TeacherForm;





