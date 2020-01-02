import React from 'react';
import { useForm } from 'react-hook-form';

const Form = () => {
    const { register, handleSubmit, errors } = useForm();
    const onSubmit = data => { console.log(data) }

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <h1>Sign up</h1>
                <label>First Name: </label>
                <input name="firstName" ref={register({ required: true, minLength: 2 })} />
                {errors.firstName && errors.firstName.type === 'required' && (
                    <p>This is required</p>
                )}
                {errors.firstName && errors.firstName.type === 'minLength' && (
                    <p>Minimum length is 2</p>
                )}

                <label>Last Name: </label>
                <input name="lastName" ref={register({required: true})} />
                {errors.lastName && <p>This is required</p>}

                <label>Email</label>
                <input name="email" ref={register({required: true})}/>
                {errors.email && <p>This is required</p>}

                <label>Password</label>
                <input name="password" ref={register({required: true})} />
                {errors.password && <p>This is required</p>}

                <label>Agree Terms</label>
                <input type="checkBox" name="terms" ref={register({required: true})}/>
                {errors.terms && <p>You must agree to the terms</p>}

                <input type="submit" /> 
            </form>
        </div>
    )
}

export default Form;