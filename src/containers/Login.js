import React, {useState} from 'react'
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate, useSearchParams } from 'react-router-dom';
import { AUTH_ID } from '../helpers/constant';

import * as Yup from "yup";
import AuthService from "../services/AuthService";

export default function Login() {
    const [message, setMessage] = useState('');
    let navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const returnUrl = searchParams.get('return');

    const initialValues = { username: '', password: '' };
    const schema = Yup.object({
        username: Yup.string().required('Please Enter Username'),
        password: Yup.string().required('Please Enter Password'),
      });

    return (
        <div className="col-sm-5">
            <h1>Login</h1>
            <Formik
                initialValues={initialValues}
                validationSchema={schema}
                onSubmit={(values, { setSubmitting }) => {
                    AuthService.Login(values).then(res => {
                        if (res.status === 200 && res.data) {
                            const user = res.data;
                            localStorage.setItem(AUTH_ID, JSON.stringify(user));

                            if (returnUrl != null)
                                navigate(`/${returnUrl}`);

                            if (user.roles.indexOf('User') > -1) {
                                navigate('/user');
                            }
                            else if (user.roles.indexOf('Admin') > -1) {
                                navigate('/admin');
                            }
                        }
                        else {
                                setMessage("Username or Password doesn't Exist");
                              }
                    });
                }}>
                <Form>
                    <div className='text-danger mb-2'>
                        {message}
                    </div>
                    <div className="mb-3">
                        <label>Email</label>
                        <Field name="username" type="text" className="form-control" />
                        <ErrorMessage component="label" className="text-danger" name="username" />
                    </div>
                    <div className="mb-3">
                        <label>Password</label>
                        <Field name="password" type="password" className="form-control" />
                        <ErrorMessage component="label" className="text-danger" name="password" />
                    </div>
                    <div className="mb-3">
                        <input type="submit" value="Login" className="btn btn-primary" />
                    </div>
                </Form>
            </Formik>
        </div>
    );
}
