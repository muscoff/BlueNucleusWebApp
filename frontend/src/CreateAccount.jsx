import { useState } from "react";
import { auth } from "./FirebaseApp";
import { NavLink, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { db } from "./FirebaseApp";
import { collection, addDoc } from "firebase/firestore";

function CreateAccount() {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [github, setGithub] = useState("")
  const [hours, setHours] = useState("") // TODO: Make hours work correctly
  const [password, setPassword] = useState("")
  const [accessKey, setAccessKey] = useState("")

  const [errors, setErrors] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      // Signed in
      const user = userCredential.user;
      console.log(db);
      await addDoc(collection(db, "userInfo"), {
        firstName: firstName,
        lastName: lastName,
        email: email,
        github: github,
      });
      navigate("/login");
    } catch (error) {
      console.error("Error: ", error);
    }
    setPassword("")
  };

  return (
    <>
      <h1 className="MyTitle">Create An Account</h1>
      <form onSubmit={handleSubmit} className="FormContainer">
        <div className="InputContainer">
          <label>First Name</label>
          <input
            className="create-account-input"
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>

        <div className="InputContainer">
          <label>Last Name</label>
          <input
            className="create-account-input"
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>

        <div className="InputContainer">
          <label>Email</label>
          <input
            className="create-account-input"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="InputContainer">
          <label>Github Account</label>
          <input
            className="create-account-input"
            type="text"
            value={github}
            onChange={(e) => setGithub(e.target.value)}
            required
          />
        </div>

        <div className="InputContainer">
          <label>Password</label>
          <input
            className="create-account-input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button className="submit-button" type="submit">Create Account</button>
      </form>
    </>
  )
}

export default CreateAccount;
