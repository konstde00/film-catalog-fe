import { reportExport } from "../../api/files";
import React from "react";
import { toast, ToastContainer } from "react-toastify";
import { useForm } from "react-hook-form";
import useToken from "../App/useToken";
import NavBar from "../NavBar/NavBar";

export default function Files() {

  const { token } = useToken();
  const { register, handleSubmit } = useForm();

  const uploadFile = async e => {

    const formData = new FormData();
    formData.append("file", e.file[0]);

    await fetch("http://localhost:8080/api/users/v1/upload", {
        method: "POST",
        body: formData
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

  return(
    <>
      <NavBar/>
      <div>
        <h1 style={{marginTop: "100px"}}>
          Page for operation with files
        </h1>
        <button onClick={reportExport("MOST_ACTIVE_USERS", "XLSX", token)}>
          Report export xslx
        </button>
        <button onClick={reportExport("MOST_ACTIVE_USERS", "DOCX", token)}>
          Report export docx
        </button>
        <div>
          <h2 />
          <h2 />
        </div>
        <form onSubmit={handleSubmit(uploadFile)}>
          <input type="file" {...register("file")} />
          <input type="submit" />
          <ToastContainer />
        </form>
        <div>
          <h2 />
          <h2 />
        </div>
      </div>
    </>
  );
}