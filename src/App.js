import "./App.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import Dashboard from "./components/Landing Page/Dashboard";
import Register from "./components/Signup/Register";
import Login from "./components/Signup/Login";
import HomePage from "./components/Home Page/HomePage";
import GeneratePass from "./components/generatePassword/GeneratePass";
import Error from "./components/Error/error";
import CircularProgress  from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { LoginContext } from "./components/ContextProvider/context";
import { useContext, useEffect, useState } from "react";

function App() {
  const [ load, setsLoad ] = useState(false);
  const { loginData, setLoginData } = useContext(LoginContext);
  const history = useNavigate();

  const HomeValid = async () => {
    let token = localStorage.getItem("usersdatatoken");

    const res = await fetch("/validuser", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });

    const sdata = await res.json();

    // Navigate user after checking validation
    if (sdata.status == 401 || !sdata) {
      console.log("User not valid")
    } else {
      console.log("User verified");
      setLoginData(load);
      history("/home");
    }
  };

  useEffect(() => {
    setTimeout(() => {
      HomeValid();
      setsLoad(true)
    }, 2000)
  }, []);

  return (
    <>
    {
      load ? 
      (
        <>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/generatepass" element={<GeneratePass />} />
            <Route path="*" element={<Error />} />
          </Routes>
        </>
      )
      : 
      <Box textAlign={"center"} marginTop={35} fontSize={40}>
        Loading... &nbsp;
        <CircularProgress />
      </Box>
    }
    </>
  );
}

export default App;
