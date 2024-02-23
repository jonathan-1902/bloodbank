import React, { useState } from 'react'
import { userLoginContextObj } from './userLoginContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
const UserLoginStore = ({ children }) => {

    let navigate = useNavigate();
    let [userLoginStatus, setUserLoginStatus] = useState(false);
    let [adminLoginStatus, setAdminLoginStatus] = useState(false);
    let [organizationLoginStatus, setOrganizationLoginStatus] = useState(false);

    let [currentUser, setCurrentUser] = useState({});
    let [error, setError] = useState('');

    const handleUserLogout = async () => {
        localStorage.clear();
        setUserLoginStatus(false);
        setAdminLoginStatus(false);
        setOrganizationLoginStatus(false);
        alert("Logout Successfully");
        navigate('/');
    }


    const handleUserLogin = async (userObj, formType) => {

        let email = userObj.email;
        let password = userObj.password;
        let role = userObj.role;
        try {

            if (formType === "login") {
                if (role === 'donar') {
                    let res = await axios.get(`http://localhost:5000/donar`);
                    let userData = res.data.filter((ele) => ele.email === email && ele.password === password);
                    console.log(userData);

                    if (email.length === 0 && password.length === 0) {

                        // alert("No user Found.Please Enter valid Details");
                        setError('No user Found.Please Enter valid Details');


                    }
                    else if (password.length === 0) {
                        // alert("Incorrect Password..Please Enter correct Password");
                        setError('Incorrect Password..Please Try again');
                    }
                    else if (userData[0].password === password) {
                        setCurrentUser(userData[0]);
                        setUserLoginStatus(true);
                        alert("Login Successful");
                        setError('');
                        navigate('/about');
                    }


                }
                else if (role === 'admin') {
                    let res1 = await axios.get(`http://localhost:5000/admin?email=admin@admin.com`)
                    let userData = res1.data[0];
                    if (email.length === 0 && password.length === 0) {

                        // alert("Please Enter  Details ");
                        setError('No user Found.Please Enter valid Details');
                    }
                    else if (password !== 'Joel*apr19') {
                        // alert("Incorrect Password...Password should be greater than or equal to 8 characters and less than 12 characters");
                        setError('Incorrect Password...Please Try again')
                    }
                    else if (password === 'Joel*apr19') {
                        setCurrentUser(userData);
                        setAdminLoginStatus(true);
                        alert("Login Successful");
                        setError('');
                        navigate('/admindonar');
                    }

                }
                else if (role === 'organization') {
                    let res2 = await axios.get(`http://localhost:5000/organization`);

                    let userData = res2.data[0];
                    // console.log(userData)
                    if (email.length === 0 && password.length === 0) {

                        // alert("Please Enter  Details ");
                        setError('No user Found.Please Enter valid Details');
                    }
                    else if (password !== '1234') {
                        // alert("Incorrect Password...Password should be greater than or equal to 8 characters and less than 12 characters");
                        setError('Incorrect Password...Please Try again')
                    }
                    else if (password === '1234') {
                        setCurrentUser(userData);
                        setOrganizationLoginStatus(true);
                        setError('');
                        alert('Login Successful')
                        navigate('/donar');
                    }


                }
            }
            else if (formType === 'register') {
                let organizationData = {};
                try {
                    if (role === "donar") {
                        let res = axios.post("http://localhost:5000/donar", userObj);
                        alert("Registered Succesfully");
                        console.log(res);
                    }

                    else if (role === 'organization') {
                        console.log(organizationData);

                        let res = axios.post("http://localhost:5000/organization", userObj);
                        alert("Registered Succesfully");
                        console.log(res);
                    }
                }
                catch (error) {
                    console.log(error);
                }

            }
        }
        catch (error) {
            console.log(error);
        }
    }

    return (
        <userLoginContextObj.Provider value={{ handleUserLogout, userLoginStatus, adminLoginStatus, organizationLoginStatus, currentUser, error, handleUserLogin }}>{children}</userLoginContextObj.Provider>
    )
}

export default UserLoginStore
