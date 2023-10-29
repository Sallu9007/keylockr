import React, { useContext, useEffect, useState } from 'react';
import Navbar from "../Navbar/Navbar";
import { NavLink } from "react-router-dom"
import Header from '../Navbar/Header';
import { useNavigate } from 'react-router-dom';
import { LoginContext } from '../ContextProvider/context';
import "../Signup/mix.css"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const CryptoJS = require("crypto-js")

const HomePage = () => {
    const {loginData, setLoginData} = useContext(LoginContext)
    const [data,setData]=useState([])
    const [showPasswords, setShowPasswords] = useState([]);

  
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

        const data = await res.json();
        
        // Navigate user after checking validation
        if(data.status == 401 || !data){
            history("*")
        }
        else{
            console.log("User verified");
            setLoginData(data)
            // console.log(data);
            history("/home")
        }
    }

    useEffect(() => {
        HomeValid()
    }, [])

    useEffect(()=>{
        fetch("/getAllPass",{
            method:"GET",
        })
        .then((res)=>res.json())
        .then((data)=>{
            console.log(data, "Passwords");
            setData(data.data)
        })
    },[])
    
    const addpass =()=>{
        history("/generatepass")
    }


    const getDecryptedValue =(index)=>{
        var decrypted = CryptoJS.AES.decrypt(index.password,"hello");
        var plaintext = decrypted.toString(CryptoJS.enc.Utf8)
        return(
            plaintext
        // <>
        // {/* <div>{!passShow? <div className="hidePass">********</div> : <div className='showPass'id={'show'+{i}}>{plaintext}</div>}</div> */}
        // {/* <div>{showPasswords.includes(index) ? plaintext : '***dsfdsf***'}</div> */}
        // </>
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
    )
}

export default HomePage;