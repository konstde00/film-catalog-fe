import React, { useEffect, useState } from "react";
import NavBar from "../NavBar/NavBar";
import { toast } from "react-toastify";
import useToken from "../App/useToken";
import { useForm } from "react-hook-form";
import useUser from "../App/useUser";
import axios from "axios";
import instance from "../../api/utils/request";

const UserProfile = () => {

  const { user } = useUser();
  const { token } = useToken();
  const { register, handleSubmit } = useForm();

  const [name, setName] = useState(user.name);
  const [userName, setUserName] = useState(user.userName);

  console.log("User = " + user);

  const formattedRoles = user.roles.map(r => r.toLowerCase()
    .replaceAll("role_", ""));

  const handleNameChange = async (event) => {
    event.preventDefault();
    await axios
      .patch("http://localhost:8080/api/users/v1?userId=" + user.id + "&name=" + name,
        {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
    user.name = name;
    localStorage.setItem("token", JSON.stringify(user));
  };

  const handleUserNameChange = async (event) => {
    event.preventDefault();
    await axios
      .patch("http://localhost:8080/api/users/v1?userId=" + user.id + "&userName=" + userName,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })

    user.userName = userName;
    localStorage.setItem("token", JSON.stringify(user));
  };

  const uploadFile = async e => {

    const formData = new FormData();
    formData.append("photo", e.file[0]);

    await fetch("http://localhost:8080/api/users/v1/upload", {
        method: "POST",
        body: formData,
        headers: new Headers({
          'Authorization': 'Bearer '+ token,
          'Accept': '*/*'
        })
      }
    ).then(res => {
      if(!res.ok) {
        console.log("Error occured")
        return res.text().then(text => { throw new Error(JSON.stringify(text)) })
      }
      else {
        toast.success("Upload completed successfully", {
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
  };

  return (
    <>
      <NavBar/>
      <p style={{marginBottom: "20px"}}>Current role: {formattedRoles}</p>
      <div style={{ display: "inline-block", marginRight: "20px" }} >
        <img height={"220px"} width={"220px"} style={{borderRadius:"30px"}}
             src={user.profileUrl} alt="User Photo" />
      </div>
      <div style={{ display: "inline-block"}}>
        <form onSubmit={handleNameChange}>
          <label>
            Name:
            <input type="text"
                   style={{marginLeft: "15px"}}
                   defaultValue={user.name}
                   onChange={(e) => setName(e.target.value)} />
          </label>
          <button type="submit">Update name</button>
        </form>
        <br/>
        <form onSubmit={handleUserNameChange}>
          <label>
            Username:
            <input type="text"
                   style={{marginLeft: "15px"}}
                   placeholder={"Tap your username here"}
                   onChange={(e) => setUserName(e.target.value)} />
          </label>
          <button type="submit">Update username</button>
        </form>
        <br/>
        <form onSubmit={handleSubmit(uploadFile)}>
          <input type="file" {...register("file")} />
          <input type="submit" />
        </form>
      </div>
    </>
  );
}

export default UserProfile;
