import React, {useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from "../Navbar/Navbar";



const GeneratePass = () => {

    const [passShow, setPassShow] = useState(false);
    const [cpassShow, setCPassShow] = useState(false);
    const history = useNavigate()

    const [inpval, setInpval] = useState({
        webname: "",
        weblink: "",
        password: "",
        cpassword: ""
    });
    const getUserData = async() => {
        // console.log("hkre");
        // console.log(localStorage.getItem('usersdatatoken'));
        let token = localStorage.getItem("usersdatatoken");
    
        const res = await fetch("/validuser", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": token,
            },
        });
    
        const UserDatajs = await res.json();
        const User_id = UserDatajs.validUserOne._id
        return(User_id)
    }

    const setVal = (e) => {
        const { name, value } = e.target;

        setInpval(() => {
            return {
                ...inpval,
                [name]: value
            }
        })
    };

    const addPassworddata = async (e) => {
        e?.preventDefault();
        const UserId = await getUserData()
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

                    UserId,webname, weblink, password, cpassword
                })
            });

            const res = await data.json();



            if (res.status === 201) {
                // toast.success("Password Successfully Added 😃!", {
                //     position: "top-center"
                // });
                setInpval({ ...inpval, webname: "", weblink: "", password: "", cpassword: "" });
            }
            history("/home")
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
        // console.log(genpassword);
        setInpval({...inpval,password: genpassword, cpassword: genpassword})
    }

    return (
        <>
            <Navbar />
            {/* <i className='me-4' onClick={Back}><FontAwesomeIcon icon={ArrowLeft} style={{color:"#4d87ea"}} /></i> */}
            {/* <button className='btn bg-primary text-dark text-center col-2 mt-3 fw-bold'onClick={Back}><FontAwesomeIcon icon={ArrowLeft} style={{color:"#4d87ea"}} /></button> */}
                <section>
                    <div className="form_data">
                        <div className="form_heading">
                            <h1>Password Generator</h1>
                        </div>

                        <form action='/home'>
                            <div className="form_input">
                                <label htmlFor="webname">PassWord Name</label>
                                <input type="text" onChange={setVal} value={inpval.webname} name="webname" id="webname" placeholder='Please Enter PassWord Name  ' />
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
                            {/* <button className='btn' onClick={getUserData}>getdata</button> */}
                            <button className='btn' onClick={genPass}>GeneratePass</button>
                        </form>
                        <ToastContainer />
                    </div>
                </section>
        </>
    );
}


export default GeneratePass
