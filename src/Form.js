import React from 'react';
import { useForm } from 'react-hook-form';

const Form = () => {
    const { register, handleSubmit, watch, errors } = useForm();
    const onSubmit = data => { console.log(data) }

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <h1>Sign up</h1>
                <label>First Name: </label>
                <input name="firstName" defaultValue="First Name" ref={register({ required: true, minLength: 2 })} />
                {errors.firstName && errors.firstName.type === 'required' && (
                    <p>This is required</p>
                )}
                {errors.firstName && errors.firstName.type === 'minLength' && (
                    <p>Minimum length is 2</p>
                )}

                <label>Last Name: </label>
                <input name="lastName" defaultValue="Last Name" ref={register({required: true})} />

                <label>Email</label>
                <input name="email" defaultValue="Email" ref={register({required: true})}/>

                <label>Password</label>
                <input name="password" ref={register({required: true})} />

                <label>Agree Terms</label>
                <input type="checkBox" ref={register({required: true})}/>

                <input type="submit" /> 
            </form>
        </div>
    )
}

export default Form;