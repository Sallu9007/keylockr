import React, { useEffect } from 'react';
import Navbar from "../Navbar/Navbar";
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
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
            history("/home")
        }
    }

    useEffect(() => {
        HomeValid()
    }, [])

    return(
        <>
        <Navbar />
            <div>Home Page</div>
        </>
    )
}

export default HomePage