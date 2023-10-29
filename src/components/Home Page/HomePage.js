import React, { useContext, useEffect, useState } from 'react';
import Navbar from "../Navbar/Navbar";
import Header from '../Navbar/Header';
import { useNavigate, NavLink } from 'react-router-dom';
import { LoginContext } from '../ContextProvider/context';
import { CircularProgress, Box } from '@mui/material';
import "../Signup/mix.css"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const CryptoJS = require("crypto-js")

const HomePage = () => {
    const {loginData, setLoginData} = useContext(LoginContext)
    const [ load, setLoad ] = useState(false);
    const [ data, setData] = useState([])
    const [ showPasswords, setShowPasswords ] = useState(false);

    const history = useNavigate()

    const HomeValid = async() => {
        let token = localStorage.getItem("usersdatatoken");

        const res = await fetch("/validuser", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": token,
            },
        });

        const load = await res.json();
        
        // Navigate user after checking validation
        if(load.status == 401 || !load){
            history("*")
        }
        else{
            console.log("User verified");
            setLoginData(load)
            history("/home")
        }
    }

    useEffect(() => {
        setTimeout(() => {
          HomeValid();
          setLoad(true)
        }, 2000)
    }, []);

    useEffect(() => {
        fetch("/getAllPass", {
            method: "GET",
        })
        .then((res) => res.json())
        .then((data) => {
            console.log(data, "Passwords");
            setLoginData(data.data)
        })
    }, [])

    const addpass = () => {
        history("/generatepass")
    }


    const getDecryptedValue =(index)=>{
        var decrypted = CryptoJS.AES.decrypt(index.password,"hello");
        var plaintext = decrypted.toString(CryptoJS.enc.Utf8)
        return(
            plaintext
            )
    }
    const copyToClipboard = (password) => {
        navigator.clipboard.writeText(password)
          .then(() => {
            toast.success("Password copied to clipboard!", {
                position: "top-center"
            });
            // alert('Password copied to clipboard!');
          })
          .catch((error) => {
            console.error('Failed to copy password: ', error);
          });
      };
            // <>
                // {/* <div>{!passShow? <div className="hidePass">********</div> : <div className='showPass'id={'show'+{i}}>{plaintext}</div>}</div> */}
                // {/* <div>{showPasswords.includes(index) ? plaintext : '***dsfdsf***'}</div> */}
            // </>
       

    const togglePasswordVisibility = (index) => {
        setShowPasswords((prevPasswords) => {
          const updatedPasswords = [...prevPasswords];
          const passwordIndex = updatedPasswords.indexOf(index);
    
          if (passwordIndex !== -1) {
            updatedPasswords.splice(passwordIndex, 1);
          } else {
            updatedPasswords.push(index);
          }
    
          return updatedPasswords;
        });
      };
    return(
        <>
        {
            load ?
            (
            <>
            <Navbar />
            <button className='btn'onClick={addpass}>Add Password</button>
            <div className='d-flex justify-content-center'>
                {/* <h2>Home Page</h2> */}
                <table style={{width: 700}}>
                    <tr>
                        <th>Website</th>
                        <th>PassWord</th>
                        <th className='d-flex justify-content-center'>Action</th>
                    </tr>
                    {data?.map((website,index)=>{
                        return(
                            <tr key={index} style={{height: 100}}>
                                <td><a href={website.weblink}>{website.webname}</a></td>
                                <td><div>{showPasswords.includes(index) ? getDecryptedValue(website) : '******'}</div></td>
                                <td><div className='d-flex'><button className='btn bg-primary text-dark text-center ms-auto mt-3 fw-bold' onClick={() => togglePasswordVisibility(index)}>{showPasswords.includes(index) ? 'Hide' : 'Show'}</button>
                                <button className='btn bg-primary text-dark text-center ms-auto mt-3 fw-bold' onClick={() => copyToClipboard(getDecryptedValue(website))}>Copy</button>
                                <button className='btn bg-primary text-dark text-center ms-auto mt-3 fw-bold' onClick={() => copyToClipboard(getDecryptedValue(website))}>Delete</button></div>
                                </td>                               
                            </tr>
                        )
                    })}
                </table>
            </div>
            </>
            ):
            <Box textAlign={"center"} marginTop={35} fontSize={40}>
                Loading... &nbsp;
                <CircularProgress />
            </Box>
        }
        </>
    )
    };

export default HomePage;