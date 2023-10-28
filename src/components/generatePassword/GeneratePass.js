import React, { useState } from 'react'
// import { NavLink } from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from "../Navbar/Navbar";


const GeneratePass = () => {

    const [passShow, setPassShow] = useState(false);
    const [cpassShow, setCPassShow] = useState(false);

    const [inpval, setInpval] = useState({
        webname: "",
        weblink: "",
        password: "",
        cpassword: ""
    });


    const setVal = (e) => {
        // console.log(e.target.value);
        const { name, value } = e.target;

        setInpval(() => {
            return {
                ...inpval,
                [name]: value
            }
        })
    };

    const addPassworddata = async (e) => {
        e.preventDefault();
        // console.log("here");
        // const userId = req.userId;
        const { webname, weblink, password, cpassword } = inpval;
        
        if (webname === "") {
            toast.warning("Website Name is required!", {
                position: "top-center"
            });
        } else if (weblink === "") {
            toast.error("Website Link is required!", {
                position: "top-center"
            });
        } else if (password === "") {
            toast.error("password is required!", {
                position: "top-center"
            });
        } else if (password.length < 6) {
            toast.error("password must be more than 6 Characters!", {
                position: "top-center"
            });
        } else if (cpassword === "") {
            toast.error("Please Confirm your password!", {
                position: "top-center"
            });
        }
        else if (cpassword.length < 6) {
            toast.error("confirm password must be more than 6 Characters!", {
                position: "top-center"
            });
        } else if (password !== cpassword) {
            toast.error("Password and Confirm Password does not Match!", {
                position: "top-center"
            });
        } else {
            // console.log("user registration succesfully done");
            // console.log("hedsfsdre");

            const data = await fetch("/generatepass", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    webname, weblink, password, cpassword
                })
            });

            const res = await data.json();
            console.log(data);
            console.log(res);

            if (res.status === 201) {
                toast.success("Password Successfully Added 😃!", {
                    position: "top-center"
                });
                setInpval({ ...inpval, webname: "", weblink: "", password: "", cpassword: "" });
            }
        }
    }

    function genPass(e){
    e.preventDefault();
    // const randomPass = document.getElementById("password")
    const length = 16
    
    const upperCase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    const lowerCase = "abcdefghijklmnopqrstuvwxyz"
    const number = "0123456789"
    const symbols = "~@#$%^&*()_+|}{<>[]/"
    const allChars = upperCase+lowerCase+symbols+number
    let genpassword = ""
    // password += upperCase[Math.floor(Math.random()* upperCase.length)]
    // password += lowerCase[Math.floor(Math.random()* lowerCase.length)]
    // password += number[Math.floor(Math.random()* number.length)]
    // password += symbols[Math.floor(Math.random()* symbols.length)]
    
    while(length > genpassword.length){
        genpassword += allChars[Math.floor(Math.random()* allChars.length)]
    }
    console.log(genpassword);
    setInpval({...inpval,password: genpassword, cpassword: genpassword})
}

return (
      <>
        <Navbar />
            <section>
                <div className="form_data">
                    <div className="form_heading">
                        <h1>Password Generator</h1>
                    </div>

                    <form>
                        <div className="form_input">
                            <label htmlFor="webname">Website Name</label>
                            <input type="text" onChange={setVal} value={inpval.webname} name="webname" id="webname" placeholder='Please Enter the Website name to save the PassWord ' />
                        </div>
                        <div className="form_input">
                            <label htmlFor="weblink">Website Link</label>
                            <input type="weblink" onChange={setVal} value={inpval.weblink} name="weblink" id="weblink" placeholder='Enter Your weblink' />
                        </div>
                        <div className="form_input">
                            <label htmlFor="password">Password</label>
                            <div className="two">
                                <input type={!passShow ? "password" : "text"} value={inpval.password} onChange={setVal} name="password" id="password" placeholder='Enter Your password' />
                                <div className="showpass" onClick={() => setPassShow(!passShow)}>
                                    {!passShow ? "Show" : "Hide"}
                                </div>
                            </div>
                        </div>

                        <div className="form_input">
                            <label htmlFor="password">Confirm Password</label>
                            <div className="two">
                                <input type={!cpassShow ? "password" : "text"} value={inpval.cpassword} onChange={setVal} name="cpassword" id="cpassword" placeholder='Confirm password' />
                                <div className="showpass" onClick={() => setCPassShow(!cpassShow)}>
                                    {!cpassShow ? "Show" : "Hide"}
                                </div>
                            </div>
                        </div>
                        <button className='btn' onClick={addPassworddata}>Save</button>
                        <button className='btn' onClick={genPass}>GeneratePass</button>
                    </form>
                    <ToastContainer />
                </div>
            </section>
      </>
    );
  }


export default GeneratePass