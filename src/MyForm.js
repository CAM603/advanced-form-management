import React, { useState, useEffect } from 'react';
import { withFormik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const MyForm = ({values, errors, touched, status}) => {

    return (
        <div style={{background: '#BADA22'}}>
            <Form>
                <label htmlFor="name">
                    Name
                </label>
                <Field id="name" type="text" name="name"/>
                {touched.name && errors.name && (
                    <p>{errors.name}</p>
                )}
                <label>
                    Email
                </label>
                <Field id="email" type="text" name="email"/>
                {touched.email && errors.email && (
                    <p>{errors.email}</p>
                )}
                <label>
                    Password
                </label>
                <Field id="password" type="text" name="password"/>
                {touched.password && errors.password && (
                    <p>{errors.password}</p>
                )}
                <label>
                    Username
                </label>
                <Field id="username" type="text" name="username"/>
                {touched.username && errors.username && (
                    <p>{errors.username}</p>
                )}
                <label>
                    Terms and conditions
                </label>
                <Field id="terms" type="checkbox" name="terms" checked={values.terms}/>
                <button type="submit">Submit</button>
            </Form>
        </div>
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