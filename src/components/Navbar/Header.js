import React, { useContext } from "react";
import Navbar from "../Navbar/Navbar";
import { Avatar } from "@mui/material";
import { LoginContext } from "../ContextProvider/context";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from "react-router-dom";

const Header = () => {
    const history = useNavigate()
    const {loginData, setLoginData} = useContext(LoginContext)
    
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null)
    };

    const logoutUser =  async() => {
        let token = localStorage.getItem("usersdatatoken");

        const res = await fetch("/logout", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": token,
                Accept: "application/json"
            },
            credentials: "include"
        });

        const data = await res.json();
        // console.log(data)
        
        // Navigate user after checking validation
        if(data.status == !201){
            console.log("error");
        }
        else{
            console.log("User Logged Out");
            localStorage.removeItem("usersdatatoken");
            setLoginData(false)
            history("/")
        }
    }

    return(
        <>
            <div className="avtar">
                {
                    loginData.validUserOne ? 
                    <Avatar style= {{background: "black", fontWeight: "bold", textTransform: "capitalize"}} onClick={handleClick}>{loginData.validUserOne.fname[0].toUpperCase()}</Avatar> : 
                    <Avatar style= {{background: "black"}} onClick={handleClick}/>
                }
                
            </div>

            <Menu 
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby' : 'basic-button',
                }}
            >
                <MenuItem onClick={() => {
                    logoutUser()
                    handleClose()
                }}>Logout</MenuItem>
            </Menu>
        </>
    )
}

export default Header;