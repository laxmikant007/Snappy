import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Logo from "../assets/logo.svg";
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import "react-toastify/dist/ReactToastify.css";
import { registerRoute } from "../utils/APIRoutes";
function Register() {
    const navigate = useNavigate();
    const [values, setValues] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",

    });
    const toastOptions = {
        position: "bottom-right",
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
    };
    useEffect(() => {
        if (localStorage.getItem('chat-app-user')) {
            navigate("/");
        }
    }, []);



    const handleSubmit = async (event) => {
        event.preventDefault();
        // alert('You clicked submit.');
        console.log('submit');
        if (handleValidation()) {
            console.log('validation passed', registerRoute);
            const { username, email, password } = values;
            const { data } = await axios.post(registerRoute, {
                username, email, password
            });
            if (data.status === false) {
                toast.error(data.msg, toastOptions);
            }
            if (data.status === true) {
                // toast.success(data.msg, toastOptions);
                localStorage.setItem('chat-app-user', JSON.stringify(data.user));

            }
            navigate('/');

        }




    };
    const handleValidation = () => {
        const { password, confirmPassword, username, email } = values;
        if (password !== confirmPassword) {
            toast.error("Password and confirm password should be same.", toastOptions);
            return false;

        } else if (username.length < 3) {
            toast.error("Username should be greater than 3 characters.", toastOptions);
            return false;
        } else if (password.length < 8) {
            toast.error("Password should be equal or greater than 8 characters.", toastOptions);
            return false;
        } else if (email === "") {
            toast.error("Email is required.", toastOptions);
            return false;
        }
        else {
            console.log('success');
            return true;
        }
    };


    const handleChange = (event) => {
        // console.log(event.target.value);
        setValues({ ...values, [event.target.name]: event.target.value });
    };
    return (
        <>
            <FormContainer>
                <form onSubmit={(event) => handleSubmit(event)}>
                    {/* <h1>Register</h1> */}
                    <div className="brand">
                        <img src={Logo} alt="logo" />
                        <h1>Snappy</h1>
                    </div>
                    <input
                        type="text"
                        placeholder="Username"
                        name="username"
                        onChange={(e) => handleChange(e)}
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        name="email"
                        onChange={(e) => handleChange(e)}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        onChange={(e) => handleChange(e)}
                    />
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        name="confirmPassword"
                        onChange={(e) => handleChange(e)}
                    />
                    <button type="submit">Create User</button>
                    <span>
                        Already have an account? <Link to="/login">Login.</Link>
                    </span>
                </form>

            </FormContainer>
            <ToastContainer />




        </>

    )
}





const FormContainer = styled.div`
height : 100vh;
width : 100vw;
display : flex;
flex-direction :column;
justify-content : center;
gap : 1rem;
align-items : center;
background-color :#131324;

.brand{
    display : flex;
    align-items : center;
    gap : 1rem;
    justify-content : center;
    img {
    height : 5rem;
    }
    h1{
        color : white;
        text-transform : uppercase;
    }

}
form{
    display : flex;
    flex-direction : column;
    gap : 2rem;
    background-color :#00000076;
    padding : 3rem 5rem;
    border-radius : 2rem;
    input{
        padding : 1rem;
        background-color : transparent;
        border : 0.1rem solid #4e0eff;
        border-radius : 0.5rem;
        color : white;
        width : 100%;
        font-size :1.2rem;
        &:focus{
            border : 0.1rem solid #997af0;
            outline : none;
        }

        
    }
    button{
        background-color :#997af0;
        color : white;
        padding : 1rem 2rem;
        border : none;
        fon-weight :bold;
        cursor : pointer;
        border-radius : 0.5rem;
        font-size : 1.2rem;
        text-transform : uppercase;
        transition :  0.4s ease-in-out;
        &:hover{
            background-color : #4e0eff;
        }

    }
    span{
        color : white;
        font-size : 1.2rem;
        text-transform : uppercase;
        a{
            color : #997af0;
            text-decoration : none;
            font-weight : bold;
        }
    }
}



`;

export default Register