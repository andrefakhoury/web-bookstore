import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { fetchUserbyEmail, verifyPassword, verifyEmail, verifyEqual, verifyNotEmpty } from "../utils"
import FormField from "./FormField"

const Login = ({ logUser }) => {
  let navigate = useNavigate();
  // States for each field
  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [Password, setPassword] = useState("");

  useEffect(() => {
    const getUser = async () => {
        const user_mail = await fetchUserbyEmail(email)
        setUser(user_mail)
      }
    getUser()
  }, [email])

  const onSubmit = (e) => {
    e.preventDefault();
    
    // Verifies fields and adds new user
    try {
        verifyEmail(email, "Please provide a valid email address.");
        
        verifyPassword(Password, "Invalid password given.");

        verifyNotEmpty(user, "There's no user with the given email, check for typos or sign up!")
        verifyEqual(user[0].password, Password, "Wrong Password")

        alert("Successfully logged in!");
        logUser(user[0]);
        navigate("/");
    } catch(e) {
      alert(e);
    }
    
  }

  return (
    <div className="center">
      <h1>Login</h1>
        <form onSubmit={onSubmit}>
            <FormField label="Email" value={email} isRequired={true} setText={setEmail}/>
            <FormField label="Password" type="password" isRequired={true} setText={setPassword}/>
            <input type="submit" value="Login"/>
        </form>
        <p>Don't have an account? <Link to="/login">Sign Up</Link> now!</p>
    </div>
  )
}

export default Login