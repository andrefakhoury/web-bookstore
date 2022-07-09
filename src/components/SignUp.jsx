import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import { verifyPassword, verifyEmail, verifyEqual } from "../utils"
import FormField from "./FormField"

const SignUp = ({ onAdd }) => {
  let navigate = useNavigate();
  // States for each field
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [Password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    
    // Verifies fields and adds new user
    try {
      verifyEmail(email, "Please provide a valid email address.");
      
      verifyPassword(Password, "Invalid password given.");
      verifyEqual(Password, confirmPassword, "Passwords do not match.");

      const password = Password;

      const newUser = {
        name: name,
        address: address,
        password: password,
        phone: phoneNumber,
        email: email,
        admin: false
      };

      onAdd(newUser);
      await Swal.fire({
        title: 'Successfully signed up!',
        html: `Welcome, <b>${name}</b>!`,
        timer: 2000,
        timerProgressBar: true,
        didOpen: () => {
          Swal.showLoading();
        },
        icon: 'success'
      });
      navigate("/");
    } catch(e) {
      await Swal.fire({
        title: 'Oops...',
        text: e,
        icon: 'error'
      });
    }
  }

  return (
    <div className="center">
      <h1>Sign Up</h1>
      <div className="container text-center">
        <form onSubmit={onSubmit}>
          <FormField label="Full Name" value={name} isRequired={true} setText={setName}/>
          <FormField label="Address" value={address} isRequired={true} setText={setAddress}/>
          <FormField label="Email" value={email} isRequired={true} setText={setEmail}/>
          <FormField label="Phone number" value={phoneNumber} isRequired={true} setText={setPhoneNumber}/>
          <FormField label="Password" type="password" isRequired={true} setText={setPassword}/>
          <FormField label="Confirm password" type="password" isRequired={true} setText={setConfirmPassword}/>
          <input type="submit" value="Sign Up"/>
          <p>Already have an account? <Link to="/login">Login</Link> now!</p>
        </form>
      </div>
    </div>
  )
}

export default SignUp