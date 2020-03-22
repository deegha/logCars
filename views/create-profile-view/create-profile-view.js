import { useState } from "react"
import Link from "next/link"
import { Header } from "../../components"
import { validateEmail } from "../../services/helper"

import "./styles.scss"

export const CreateProfileView = ({ handleSubmit }) => {
  const initial = {
    email: "",
    displayName: "",
    password: "",
    passwordConfirm: "",
    image: {
      file: "",
      blob: ""
    }
  };

  const [inputs, setInputs] = useState(initial);
  const [loading, setLoading] = useState(false);

  const [emailError, setEmailError] = useState("");
  const [error, setError] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    if(inputs.email == "" || inputs.password == "")   {
      setError("Email and password are required")
      return
    }

    if(error !== "" || emailError !== "")
      return

    try {
      setLoading(true)
      await handleSubmit(inputs)
      setLoading(false)
    }catch(err) {
      console.log(err)
      setLoading(false)
      setError(err.message)
    }
  }

  const validate = () => {
    if(inputs.email !== "" && !validateEmail(inputs.email))
      setEmailError("Enter a valid email")
    else
      setEmailError("")
  }

  const handleInputChange = (e) => {
    setError("")
    e.persist();
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value
    });

    validate()
  }


  const handleFileChange = (event) => {
    if(event.target.files.length < 1)
      return

    const file = event.target.files[0]
    const blobUrl = URL.createObjectURL(event.target.files[0])

    if(file.type.indexOf("image") === -1) {
      return
    }

    if(file.size > 10485760) {
      return false
    }

    setInputs({
      image:  {
        blobUrl,
        file
      }
    })
  }


  return (
  <div className={"login-container"}>
    <Header />
    <div className={"login-innerWrapper"}>
      <div className={"login-formContainer"} >
        <h2 className={"login-formHeader"} > Create your account</h2>
        {error !== "" &&<p className={"login-errorTextMain"}>{ error}</p>}
      <form onSubmit={onSubmit}>
         <div className={"login-formItem"}>
          <div className={"login-imageUploader"} style={inputs.image && ({ backgroundImage: `url(${inputs.image.blobUrl})` })} >
              <input type="file"  onChange={handleFileChange} />
          </div>
        </div>
        <div className={"login-formItem"}>
          <input
            className={"login-textInput"}
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            onChange={handleInputChange}
            value={inputs.email}
          />
          {emailError !== "" && <p className={"login-errorText"}>{emailError}</p>}
        </div>
        <div className={"login-formItem"}>
          <input
            className={"login-textInput"}
            type="text"
            id="displayName"
            name="displayName"
            placeholder="Display Name"
            onChange={handleInputChange}
            value={inputs.displayName}
          />
        </div>
        <div className={"login-formItem"}>
          <input
          className={"login-textInput"}
            type="password"
            id="password"
            placeholder="Password"
            name="password"
            onChange={handleInputChange}
            value={inputs.password}
          />
        </div>

        <div className={"login-formItem"}>
        {loading ? (
          <div className={"login-loginButtonDissabled"}> <div className={"login-loading"} /> </div>
        ):(
          <button className={"login-loginButton"} type="submit"> Sign Up </button>
        )}
        </div>
      </form>
      </div>
    </div>
  </div>
  )
}
