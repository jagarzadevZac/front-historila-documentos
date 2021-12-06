import React, { useEffect, useState,useRef } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { Password } from 'primereact/password';
import { Divider } from 'primereact/divider';
import { classNames } from 'primereact/utils';
import { DateLocaleMexico } from '../service/Date';
import { UserServiceData } from '../service/UserService';
import useAuthentication from '../hooks/useAuthentication';
import { Toast } from 'primereact/toast';
import { useHistory } from "react-router-dom";
import { ActionUserButton } from './ActionsUser';
import { Redirect } from "react-router";

import '../login.css';

export const RegisterForm = () => {

    let history = useHistory();
    const { login , isAuthenticated} = useAuthentication();
    const dateLocaleMexico = new DateLocaleMexico();
    const userServiceData = new UserServiceData();
    let dateMexico = dateLocaleMexico.getDateLocale();
    const [isDesktop, setisDesktop] = useState(false);
    const [formData, setFormData] = useState({});
    const toast = useRef();
    const defaultValues = {
        name: '',
        email: '',
        password: '',
        roll:'Public',
        date:dateMexico
    }

    const roll = [
        {name: 'Admin', code: 'Admin'},
        {name: 'Public', code: 'Public'},
    ];

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

        try {
            let res =await userServiceData.regsiterUser(data);

            if(res === "Registration successful"){
                toast.current.show({severity: 'success', summary: 'successful log in', detail: 'Log in  ok'});
                let loginResponse = await login(data);
                if(loginResponse.id > 0){
                    reset();
                    setTimeout(() => {
                        history.push("/list");
                        window.location.reload();
                    }, 3000);
                }
            }
        } catch (error) {
            console.log("error->",error);
            toast.current.show({severity: 'error', summary: 'Message error', detail: 'Email already exist,try with one direferent'});
        }
    };

    const getFormErrorMessage = (name) => {
        return errors[name] && <small className="p-error">{errors[name].message}</small>
    };

    const passwordHeader = <h6>Pick a password</h6>;
    const passwordFooter = (
        <React.Fragment>
            <Divider />
            <p className="p-mt-2">Suggestions</p>
            <ul className="p-pl-2 p-ml-2 p-mt-0" style={{ lineHeight: '1.5' }}>
                <li>At least one lowercase</li>
                <li>At least one uppercase</li>
                <li>At least one numeric</li>
                <li>Minimum 8 characters</li>
            </ul>
        </React.Fragment>
    );

    console.log(isDesktop);

    return (
        <>
        {isAuthenticated() && <Redirect to="/list" />}
        {!isAuthenticated() &&
            <div className="form-demo" style={{ marginRight:(isDesktop ? "300px" :"0px")}}>
                <Toast ref={toast} ></Toast>
                <div className="p-d-flex p-jc-center">
                    <div className="card">
                        <h5 className="p-text-center">Register</h5>
                        <form onSubmit={handleSubmit(onSubmit)} className="p-fluid">
                            <div className="p-field">
                                <span className="p-float-label">
                                    <Controller name="name" control={control} rules={{ required: 'Name is required.' }} render={({ field, fieldState }) => (
                                        <InputText id={field.name} {...field} autoFocus className={classNames({ 'p-invalid': fieldState.invalid })} />
                                    )} />
                                    <label htmlFor="name" className={classNames({ 'p-error': errors.name })}>Name*</label>
                                </span>
                                {getFormErrorMessage('name')}
                            </div><br/>
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
                                        <Password id={field.name} {...field} toggleMask className={classNames({ 'p-invalid': fieldState.invalid })} header={passwordHeader} footer={passwordFooter} />
                                    )} />
                                    <label htmlFor="password" className={classNames({ 'p-error': errors.password })}>Password*</label>
                                </span>
                                {getFormErrorMessage('password')}
                            </div><br/>
                            <div className="p-field">
                                <span className="p-float-label">
                                    <Controller name="roll" control={control} render={({ field }) => (
                                        <Dropdown id={field.name} value={field.value} onChange={(e) => field.onChange(e.value)} options={roll} optionLabel="name" />
                                    )} />
                                    <label htmlFor="roll">Roll</label>
                                </span>
                            </div>

                            <Button type="submit" label="Submit" className="p-mt-2" />
                        </form>
                        <ActionUserButton page={"Register"} />
                    </div>
                </div>
            </div>
        }
        </>
    );
}
