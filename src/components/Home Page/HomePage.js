import React, { useContext, useEffect, useState } from 'react';
import Navbar from "../Navbar/Navbar";
import { NavLink } from "react-router-dom"
import Header from '../Navbar/Header';
import { useNavigate } from 'react-router-dom';
import { LoginContext } from '../ContextProvider/context';
import "../Signup/mix.css"
const CryptoJS = require("crypto-js")

const HomePage = () => {
    const {loginData, setLoginData} = useContext(LoginContext)
    const [data,setData]=useState([])
    const [passShow, setPassShow] = useState(false);

  
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


    const getDecryptedValue =(i)=>{
        var decrypted = CryptoJS.AES.decrypt(i.password,"hello");
        var plaintext = decrypted.toString(CryptoJS.enc.Utf8)
        return(
        <>
        <form>

            <input type={!passShow ? "password" : "text"} value={plaintext} readOnly></input>
            <div className="showpass" onClick={() => setPassShow(!passShow)}>
                                    {!passShow ? "Show" : "Hide"}
                                </div>
        </form>
        </>
            )
    }
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
                    </tr>
                    {data?.map((i)=>{
                        return(
                            <tr style={{height: 100}}>
                                <td><a href={i.weblink}>{i.webname}</a></td>
                                {/* <td>{i.weblink}</td> */}
                                
                                <td>{getDecryptedValue(i)}</td>
                               
                            </tr>
                        )
                    })}
                </table>
            </div>
        </>
    )
}

export default HomePage;