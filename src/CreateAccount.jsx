import { useState } from "react";
import "./CreateAccount.css"

function CreateAccount() {
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [github, setGithub] = useState("")
  const [hours, setHours] = useState("") // TODO: Make hours work correctly
  const [password, setPassword] = useState("")
  const [accessKey, setAccessKey] = useState("")

  const [errors, setErrors] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // TODO: Handle submit
    console.log({
      firstName,
      lastName,
      email,
      github,
      hours,
      password,
      accessKey,
    });
    setPassword("")
  };

  return (
    <>

      <h1 className="MyTitle">Create An Account</h1>
      <form onSubmit={handleSubmit} className="FormContainer">
        <div className="InputContainer">
          <label>First Name: </label>
          <input

            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>

        <div className="InputContainer">
          <label>Last Name: </label>
          <input

            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>

        <div className="InputContainer">
          <label>Github Account: </label>
          <input

            type="text"
            value={github}
            onChange={(e) => setGithub(e.target.value)}
            required
          />
        </div>

        <div className="InputContainer">
          <label>Email: </label>
          <input

            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="InputContainer">
          <label>Password: </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit">Create Account</button>
      </form>
    </>
  )
}

export default CreateAccount;
