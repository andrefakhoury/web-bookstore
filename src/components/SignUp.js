import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { verifyPassword, verifyEmail, verifyEqual } from "../utils"
import FormField from "./FormField"

const SignUp = ({ onAdd }) => {
  let navigate = useNavigate();
  // States for each field
  const [userName, setUserName] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [Password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    
    // Verifies fields and adds new user
    try {
        verifyEmail(email, "Please provide a valid email address.");
        
        verifyPassword(Password, "Invalid password given.");
        verifyEqual(Password, confirmPassword, "Passwords do not match.");

        const password = Password;

        const newUser = {
            userName: userName,
            address: address,
            password: password,
            phone: phoneNumber,
            email: email,
            admin: false
        };

        onAdd(newUser);
        alert("Successfully signed up!");
        navigate("/");
    } catch(e) {
      alert(e);
    }
  }

  return (
    <div className="center">
      <h1>Sign Up</h1>
        <form onSubmit={onSubmit}>
            <FormField label="Full Name" value={userName} isRequired={true} setText={setUserName}/>
            <FormField label="Address" value={address} isRequired={true} setText={setAddress}/>
            <FormField label="Email" value={email} isRequired={true} setText={setEmail}/>
            <FormField label="Phone number" value={phoneNumber} isRequired={true} setText={setPhoneNumber}/>
            <FormField label="Password" type="password" isRequired={true} setText={setPassword}/>
            <FormField label="Confirm password" type="password" isRequired={true} setText={setConfirmPassword}/>
            <input type="submit" value="Sign Up"/>
        </form>
        <p>Already have an account? <Link to="/login">Login</Link> now!</p>
    </div>
  )
}

export default SignUp