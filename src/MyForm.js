import React, { useState, useEffect } from 'react';
import { withFormik, Form, Field, ErrorMessage } from 'formik';
import { Button, FormText } from 'reactstrap';
import * as Yup from 'yup';
import axios from 'axios';

const MyForm = ({values, errors, touched, status}) => {
    const [signUp, setSignUp] = useState([]);
    useEffect(() => {
        console.log("Status has changed", status);
        status && setSignUp(signUp =>  [...signUp, status]);
    }, [status]);
    return (    
        <>
            <div className="formContainer">
                <Form>
                        <div className="form">
                            <label htmlFor="name">
                                Name
                            </label>
                            <Field id="name" type="text" name="name"/>
                            {touched.name && errors.name && (
                                <FormText>{errors.name}</FormText>
                            )}
                        </div>
                        <div className="form">
                            <label>
                                Email
                            </label>
                            <Field id="email" type="text" name="email"/>
                            {touched.email && errors.email && (
                                <FormText>{errors.email}</FormText>
                            )}
                        </div>
                        <div className="form">
                            <label>
                                Password
                            </label>
                            <Field id="password" type="text" name="password"/>
                            {touched.password && errors.password && (
                                <FormText>{errors.password}</FormText>
                            )}
                        </div>
                        <div className="form">
                            <label>
                                Username
                            </label>
                            <Field id="username" type="text" name="username"/>
                            {touched.username && errors.username && (
                                <FormText>{errors.username}</FormText>
                            )}
                        </div>
                        <div className="form">
                            <label>
                                Agree to terms and conditions
                            </label>
                            <Field id="terms" type="checkbox" name="terms" checked={values.terms}/>
                            {touched.terms && errors.terms && (
                                <FormText>{errors.terms}</FormText>
                            )}
                        </div>
                        <div className="buttonContainer">
                            <Button color="primary" type="submit">Submit</Button>
                        </div>
                    </Form>
            </div>
                {signUp.map(el => (
                    <div className="member" key={el.id}>
                        <p>Name: {el.name}</p>
                        <p>Email: {el.email}</p>
                        <p>Password: {el.password}</p>
                        <p>Username: {el.username}</p>
                    </div>
                ))}
        </>
    )
}

const FormikLoginForm = withFormik({
    mapPropsToValues({ name, email, password, username, terms }) {
        return {
            name: name || "",
            email: email || "",
            password: password || "",
            username: username || "",
            terms: terms || false
        }
    },
    validationSchema: Yup.object().shape({
        name: Yup.string().required(),
        email: Yup.string().required(),
        password: Yup.string().required(),
        username: Yup.string().required(),
        terms: Yup.bool().required()
    }),
    handleSubmit(values, { setStatus, resetForm }) {
        console.log(values)
        axios
        .post("https://reqres.in/api/users/", values)
        .then(res => {
            console.log("Success!", res)
            setStatus(res.data);
            resetForm();
        })
        .catch(err => console.log(err))
    }
})(MyForm);

export default FormikLoginForm;