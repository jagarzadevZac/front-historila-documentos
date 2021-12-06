import React, { useEffect, useState,useRef } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Password } from 'primereact/password';
import { classNames } from 'primereact/utils';
import { UserServiceData } from '../service/UserService';
import useAuthentication from '../hooks/useAuthentication';
import { Toast } from 'primereact/toast';
import { ActionUserButton } from './ActionsUser';
import { useHistory } from "react-router-dom";
import { Redirect } from "react-router";

import '../login.css';

export const LoginForm = () => {

    let history = useHistory();
    const { login, isAuthenticated} = useAuthentication();
    const userServiceData = new UserServiceData();
    const [isDesktop, setisDesktop] = useState(false);
    const [formData, setFormData] = useState({});
    const toast = useRef();
    const defaultValues = {
        email: '',
        password: '',
    }


    useEffect(() => {
        if(window.innerWidth  >= 992){
            setisDesktop(true);
        }else{
            setisDesktop(false);
        }

    }, []);

    const { control, formState: { errors }, handleSubmit, reset } = useForm({ defaultValues });

    const onSubmit =async (data) => {
        setFormData(data);
        let fecha =new Date().toISOString().slice(0, 19).replace('T', ' ');

        try {

            let loginResponse = await login(data);

            if(loginResponse.id > 0){
                toast.current.show({severity: 'success', summary: 'successful log in', detail: 'Log in  ok'});
                reset();
                let registerSessionUser =await userServiceData.sessionUserHistory({ "id":loginResponse.id,"date":fecha});
                console.log(registerSessionUser);
                setTimeout(() => {
                    history.push("/list");
                    window.location.reload();
                }, 2000);

            }else{
                toast.current.show({severity: 'error', summary: 'Message error', detail: 'Invalid email or password'});
            }

        } catch (error) {
            console.log("error->",error);
            toast.current.show({severity: 'error', summary: 'Message error', detail: 'Internal error'});
        }
    };

    const getFormErrorMessage = (name) => {
        return errors[name] && <small className="p-error">{errors[name].message}</small>
    };


    return (
        <>
        {isAuthenticated() && <Redirect to="/list" />}
        {!isAuthenticated() &&
            <div className="form-demo" style={{ marginRight:(isDesktop ? "300px" :"0px")}}>
                <Toast ref={toast} ></Toast>
                <div className="p-d-flex p-jc-center">
                    <div className="card">
                        <h5 className="p-text-center">Log In</h5>
                        <form onSubmit={handleSubmit(onSubmit)} className="p-fluid">
                            <div className="p-field">
                                <span className="p-float-label p-input-icon-right">
                                    <i className="pi pi-envelope" />
                                    <Controller name="email" control={control}
                                        rules={{ required: 'Email is required.', pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, message: 'Invalid email address. E.g. example@email.com' }}}
                                        render={({ field, fieldState }) => (
                                            <InputText id={field.name} {...field} className={classNames({ 'p-invalid': fieldState.invalid })} />
                                    )} />
                                    <label htmlFor="email" className={classNames({ 'p-error': !!errors.email })}>Email*</label>
                                </span>
                                {getFormErrorMessage('email')}
                            </div><br/>
                            <div className="p-field">
                                <span className="p-float-label">
                                    <Controller name="password" control={control} rules={{ required: 'Password is required.' }} render={({ field, fieldState }) => (
                                        <Password id={field.name} {...field} toggleMask className={classNames({ 'p-invalid': fieldState.invalid })} />
                                    )} />
                                    <label htmlFor="password" className={classNames({ 'p-error': errors.password })}>Password*</label>
                                </span>
                                {getFormErrorMessage('password')}
                            </div><br/>
                            <Button type="submit" label="Submit" className="p-mt-2" />
                        </form>
                        <ActionUserButton page={"Log In"} />
                    </div>
                </div>
            </div>
        }
        </>
    );
}
