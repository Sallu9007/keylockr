import React, { useEffect } from 'react';
import Navbar from "../Navbar/Navbar";

const HomePage = () => {
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
        console.log(data);
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