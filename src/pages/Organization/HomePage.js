import React, { useContext, useState } from 'react';
import Header from '../../components/Layout/Header';
// import Sidebar from '../components/Layout/Menus/Sidebar';
// import Form from '../components/Form/Form';
// import Layout from '../components/Layout/Layout';
import Modal from '../../components/modal/Modal';
import axios from 'axios';
import moment from 'moment';
import { useEffect } from 'react';
import '../../styles/Admin.css';
import Inventory from './Inventory';
import { userLoginContextObj } from '../../Context/userLoginContext';
// import InventoryCards from './InventoryCards';

// import { userLoginContextObj } from '../Context/userLoginContext';

const HomePage = () => {

    let [data, setData] = useState([])
    let { organizationLoginStatus } = useContext(userLoginContextObj);

    const getBloodRecords = async () => {
        try {
            const res = await axios.get(`http://localhost:5000/Details`)
            setData(res.data)
        }
        catch (error) {
            console.log(error);
        }
    }
    let InData = data.filter((res) => res.inventoryType === 'in')
    console.log(InData)
    let OutData = data.filter((res) => res.inventoryType === 'out');
    console.log(OutData);

    useEffect(() => {
        getBloodRecords();
    }, [])

    return (
        <>
            {(organizationLoginStatus === true) ? (
                <div className='img' style={{ minHeight: "100vh" }}>
                    <div>
                        <Header />
                        <div >

                            <div className='container'>
                                <h4
                                    className='ms-4 text-white'
                                    data-bs-toggle="modal"
                                    data-bs-target="#staticBackdrop"
                                    style={{ cursor: 'pointer' }}

                                >

                                    <i className='fa-solid fa-plus text-success py-4'></i>
                                    Add Inventory
                                </h4>


                                <Inventory data={InData} name='Donar' />
                                <Inventory data={OutData} name='Consumer' />


                                <Modal getBloodRecords={getBloodRecords} />
                            </div>

                        </div>
                    </div>
                </div>) : (<div><h1>404 Error Not Found</h1></div>)
            }
        </>



    )
}

export default HomePage


{/* <div className='d-flex flex-row '>
                        <InventoryCards image="https://cdn.pixabay.com/photo/2015/04/20/21/42/blood-732298_1280.jpg" name="Inventory In" info={<Inventory data={InData} name="Donar" />} />
                        <InventoryCards image="https://cdn.pixabay.com/photo/2019/04/29/16/56/blood-donation-4166552_1280.jpg" name="Inventory Out" info={<Inventory data={OutData} name="Consumer" />} />
                    </div> */}