import { useState } from "react"
import Link from "next/link"
import { Header, Google } from "../../components"
import { validateEmail } from "../../services/helper"

import  "./styles.scss"

export const LoginView = ({ handleSubmit }) => {
  const initial = {
    email: "",
    password: ""
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
      await handleSubmit(inputs.email, inputs.password)
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
  };

  return (
  <>
  <Header />
  <div className={"login-container"}>
    <div className={"login-innerWrapper"}>
      <div className={"login-formContainer"} >
        <h2 className={"login-formHeader"} >Login and continue</h2>
        {error !== "" &&<p className={"login-errorTextMain"}>{ error}</p>}

        <div className={"login-formItem"}>
          <Google />
        </div>

        <div className={"login-formItem"} />
      <form onSubmit={onSubmit}>
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
          <button className={"login-loginButton"} type="submit"> log in </button>
        )}

        </div>
        <p className={"login-createAcnText-area"}>
        {"or "}
          <Link href="/signup">
            <a className={"login-createAcnText"}>create an account</a>
          </Link>
        </p>
      </form>
      </div>
    </div>
  </div>
  </>
  )
}
