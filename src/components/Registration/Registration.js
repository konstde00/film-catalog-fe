import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Registration.css';
import { fetchRequest } from "../../api/utils/request";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

async function registrateUser(credentials) {
    return fetch("http://localhost:8080/api/users/v1/registration/email", {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(credentials)
      }
    ).then(res => {
        console.log("res = " + res.toString());
        if(!res.ok) {
            console.log("Error occured")
            return res.text().then(text => { throw new Error(JSON.stringify(text)) })
        }
        else {
            toast.success("Registration completed succesfully", {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            })
            return res.json();
        }
    }).catch(err => {
        console.log("Error = " + err)
        toast.error(JSON.parse(JSON.parse(err.message)).message, {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    });
}

export default function Registration({ setToken }) {

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const navigate = useNavigate();

    const handleSubmit = async e => {

        e.preventDefault();
        const token = await registrateUser({
            email,
            password
        });
        if (token) {
            setToken(token);
            navigate("/");
        }
    }

    return(
        <div className="registration-wrapper" style={{ margin: "auto", textAlign: "center" }}>
            <ToastContainer />
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    <p>Email</p>
                    <input type="email" onChange={e => setEmail(e.target.value)} />
                </label>
                <label>
                    <p>Password</p>
                    <input type="password" onChange={e => setPassword(e.target.value)} />
                </label>
                <div>
                    <button type="submit">Submit</button>
                </div>
            </form>
            <div className="my_content_container">
                <a href="http://localhost:3000/login">Go to login</a>
            </div>
        </div>
    )
}

Registration.propTypes = {
    setToken: PropTypes.func.isRequired
};