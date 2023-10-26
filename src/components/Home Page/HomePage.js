import React, { useContext, useEffect } from 'react';
import Navbar from "../Navbar/Navbar";
import Header from '../Navbar/Header';
import { useNavigate } from 'react-router-dom';
import { LoginContext } from '../ContextProvider/context';

const HomePage = () => {
    const {loginData, setLoginData} = useContext(LoginContext)

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
            history("/home")
        }
    }

    useEffect(() => {
        HomeValid()
    }, [])

    return(
        <>
        <Navbar>
            <div>
                <h2>Home Page</h2>
            </div>
        </Navbar>
        </>
    )
}

export default HomePage;