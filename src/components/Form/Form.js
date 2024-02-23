import React, { useState, useContext } from 'react'
import InputType from './InputType'
import { Link, useNavigate } from 'react-router-dom'
import { userLoginContextObj } from '../../Context/userLoginContext';

// In this component we are dealing with reusable form

const Form = ({ formType, submitBtn, formTitle }) => {
    let { handleUserLogin } = useContext(userLoginContextObj);
    let { currentUser } = useContext(userLoginContextObj);
    let { error } = useContext(userLoginContextObj);
    let { userLoginStatus } = useContext(userLoginContextObj);
    let { adminLoginStatus } = useContext(userLoginContextObj);
    let { organizationLoginStatus } = useContext(userLoginContextObj);

    let navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("donar");
    const [name, setName] = useState("");
    const [organization, setOrganization] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");





    let handleSumbit = async (e) => {
        e.preventDefault();
        let userObj = {}
        if (formType === "login") {
            userObj = {
                email: email,
                role: role,
                password: password
            }
        }
        else if (formType === 'register' && role === 'organization') {
            userObj = {
                role: role,
                organization: organization,
                email: email,
                password: password,
                address: address,
                phone: phone,


            }
        }
        else {
            userObj = {
                role: role,
                name: name,
                email: email,
                password: password,
                address: address,
                phone: phone,
            }
        }
        handleUserLogin(userObj, formType);
    }

    return (
        <>
            {(userLoginStatus === false && adminLoginStatus === false && organizationLoginStatus === false) &&
                <div>
                    <form onSubmit={handleSumbit}>
                        <h1 className='text-center'>{formTitle}</h1>
                        <hr />

                        <div className='d-flex mb-3'>

                            {/*Donar Radio */}
                            <div className='form-check'>
                                <input
                                    type="radio"
                                    className='form-check-input'
                                    name="role"
                                    value={'donar'}
                                    id="donarRadio"
                                    onChange={(e) => setRole(e.target.value)} />
                            </div>
                            <label htmlFor="donarRadio" className="form-check-label">Donar</label>

                            {/*admin content*/}
                            <div className='form-check ms-2'>
                                <input
                                    type="radio"
                                    className='form-check-input'
                                    name="role"
                                    value={'admin'}
                                    id="adminRadio"
                                    onChange={(e) => setRole(e.target.value)} />
                            </div>
                            <label htmlFor="adminRadio" className="form-check-label">Admin</label>

                            {/*organization content*/}
                            {/* <Radio labelText='Organization' labelFor='organizationRadio' name='role' type='radio'} className='organization' id='organizationRadio' value={'organization'} onChange={(e)=>setRole(e.target.value)}/> */}
                            <div className='form-check ms-2'>
                                <input
                                    type="radio"
                                    className='form-check-input'
                                    name="role"
                                    value={'organization'}
                                    id="organizationRadio"
                                    onChange={(e) => setRole(e.target.value)} />

                            </div>
                            <label htmlFor="organizationRadio" className="form-check-label">Organization</label>
                        </div>

                        {/* use of switch to differentiate Login and Register page fields */}

                        {
                            (
                                () => {
                                    switch (true) {
                                        case formType === 'login': {
                                            return (
                                                <>
                                                    <InputType
                                                        labelText={'Email'}
                                                        labelFor={'forEmail'}
                                                        inputType={'email'}
                                                        name={'email'}
                                                        value={email}
                                                        onChange={(e) => setEmail(e.target.value)}
                                                    />

                                                    <InputType
                                                        labelText={'Password'}
                                                        labelFor={'forPassword'}
                                                        inputType={'password'}
                                                        name={'password'}
                                                        value={password}
                                                        onChange={(e) => setPassword(e.target.value)}
                                                    />

                                                    {error.length !== 0 && <p className='text-danger'>{error}</p>}
                                                </>
                                            )
                                        }

                                        case formType === 'register': {
                                            return (
                                                <>
                                                    {
                                                        (role === 'admin' || role === 'donar') && (
                                                            <InputType
                                                                labelText={'Name'}
                                                                labelFor={'forName'}
                                                                inputType={'text'}
                                                                name={'name'}
                                                                value={name}
                                                                onChange={(e) => setName(e.target.value)}
                                                            />
                                                        )
                                                    }


                                                    {role === 'organization' && (
                                                        <InputType
                                                            labelText={'Organization Name'}
                                                            labelFor={'forOrganizationName'}
                                                            inputType={'text'}
                                                            name={'organization'}
                                                            value={organization}
                                                            onChange={(e) => setOrganization(e.target.value)}
                                                        />

                                                    )}

                                                    <InputType
                                                        labelText={'Email'}
                                                        labelFor={'forEmail'}
                                                        inputType={'email'}
                                                        name={'email'}
                                                        value={email}
                                                        onChange={(e) => setEmail(e.target.value)}
                                                    />
                                                    <InputType
                                                        labelText={'Password'}
                                                        labelFor={'forPassword'}
                                                        inputType={'password'}
                                                        name={'password'}
                                                        value={password}
                                                        onChange={(e) => setPassword(e.target.value)}
                                                    />

                                                    <InputType
                                                        labelText={'Address'}
                                                        labelFor={'forAddress'}
                                                        inputType={'text'}
                                                        name={'address'}
                                                        value={address}
                                                        onChange={(e) => setAddress(e.target.value)}
                                                    />

                                                    <InputType
                                                        labelText={'Phone'}
                                                        labelFor={'forPhone'}
                                                        inputType={'number'}
                                                        name={'phone'}
                                                        value={phone}
                                                        onChange={(e) => setPhone(e.target.value)}
                                                    />


                                                </>
                                            )
                                        }


                                    }
                                }
                            )()}
                        <div className='d-flex flex-row justify-content-between'>
                            {
                                formType === 'login' ? (
                                    <p>Not Yet Registered ?
                                        Register
                                        <Link to='/register'>Here</Link>
                                    </p>
                                ) : (
                                    <p>Already Registered..! Please
                                        <Link to='/'> Login</Link>
                                    </p>
                                )}
                            <button className='btn btn-primary ms-5' type='submit'>
                                {submitBtn}
                            </button>
                        </div>
                    </form>
                </div >

            }
        </>
    )
}

export default Form
