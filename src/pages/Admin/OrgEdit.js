import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../styles/Analytics.css';


const OrgEdit = () => {
    const [organization, setOrganization] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const navigate = useNavigate();

    const location = useLocation();
    console.log(location.state.id);
    console.log(location.state.password);

    const id = location.state.id;
    const password = location.state.password;
    const role = location.state.role;

    const getData = async () => {
        try {
            let res = await axios.get(`http://localhost:5000/organization?id=${id}`);
            console.log(res.data);
        }
        catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getData();
    }, [])

    let updatedData = {};
    updatedData.id = id;
    updatedData.role = role;
    updatedData.organization = organization;
    updatedData.email = email;
    updatedData.password = password
    updatedData.address = address;
    updatedData.phone = phone;

    function handleUpdate(e) {
        e.preventDefault();
        axios.put(`http://localhost:5000/organization/${id}`, updatedData);
        alert("Data Updated Successfully");
        navigate('/adminOrg');
    }

    return (
        <>
            <div className='img' style={{ minHeight: '100vh' }}>

                <div className='d-flex w-100  justify-content-center align-items-center'>
                    <div className='w-75 border mt-5  bg-light p-5'>
                        <form>
                            <div>
                                <h1 className='text-center'>Update Your Details</h1>
                            </div>
                            <div className='mt-2'>
                                <label>Organization Name:</label>
                                <input type='text' name="name" className='form-control' value={organization} onChange={(e) => setOrganization(e.target.value)} />
                            </div>
                            <div className='mt-2'>
                                <label>Organization Email:</label>
                                <input type='email' name="email" className='form-control' value={email} onChange={(e) => setEmail(e.target.value)} />
                            </div>
                            <div className='mt-2'>
                                <label>Organization Address:</label>
                                <input type='text' name="address" className='form-control' value={address} onChange={(e) => setAddress(e.target.value)} />
                            </div>
                            <div className='mt-2'>
                                <label>Organization Phone:</label>
                                <input type='number' name="phone" className='form-control' value={phone} onChange={(e) => setPhone(e.target.value)} />
                            </div>
                            <button type='submit' className='btn btn-success mt-2' onClick={handleUpdate}>Submit</button>





                        </form>
                    </div>


                </div>
            </div>
        </>

    )
}

export default OrgEdit
