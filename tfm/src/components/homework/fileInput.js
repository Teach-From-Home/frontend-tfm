import React, {useState} from "react";
//import axios from "axios";
//import config from "../config"

//const endpoint = config.apiGateway.URL;

export default function FileInput() {

  const [file, setFile] = useState()

  const onFormSubmit = (e) => {
    e.preventDefault() // Stop form submit
    /*if (file) {
      fileUpload(file).then((response) => {
        console.log(response.data);
      })
    }*/
    console.log(file)
  }

  const onChange = (e) => {
    console.log(e.target.files[0])

    setFile(e.target.files[0]);
  }

  const fileUpload = async (file) => {
    /*return axios.get(`${endpoint}`).then((res) => {
      console.log(res.data);
      const url = res.data.url;
      const config = {
        headers: {
          'content-type': file.type
        }
      }
      return axios.put(url, file, config)
    })*/
  }

  return (
    <form onSubmit={onFormSubmit}>
      <input type="file" onChange={onChange}/>
      <button type="submit">Upload</button>
    </form>
  )
}