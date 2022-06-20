import { useEffect, useState } from 'react'
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom'
import { verifyPassword, verifyEmail, verifyEqual, fetchUser } from "../utils"
import FormField from "./FormField"

const UserProfile = ({user, onUpdate}) => {
  let navigate = useNavigate();
  
  const [searchParams, setSearchParams] = useSearchParams();
  
  // States for each field
  const [userName, setUserName] = useState(user.userName);
  const [address, setAddress] = useState(user.address);
  const [email, setEmail] = useState(user.email);
  const [phoneNumber, setPhoneNumber] = useState(user.phone);
  const [oldPassword, setOldPassword] = useState();
  const [newPassword, setNewPassword] = useState();
  const [confirmNewPassword, setConfirmNewPassword] = useState();

  // Check if user is invalid
  useEffect(() => {
    if (!user.id)
      navigate({pathname: "/login"}, {replace: true});
  }, [user, navigate])

  const onSubmit = (e) => {
    e.preventDefault();
    
    // Verifies fields and update
    try {
      verifyPassword(oldPassword, "Please verify your old password before updating your information.");
      verifyEmail(email, "Please provide a valid email address.");
      verifyEqual(oldPassword, user.password, "Invalid password given.");

      let password = oldPassword;

      // Check new password in case it wants to be changed
      if (newPassword) {
        verifyPassword(newPassword, "Invalid new password");
        verifyEqual(newPassword, confirmNewPassword, "New passwords do not match.");
        password = newPassword;
      }

      const updatedUser = {
        userName: userName,
        address: address,
        password: password,
        phone: phoneNumber
      };

      onUpdate(user.id, updatedUser);
      alert("Successfully updated!");
      navigate("/");
    } catch(e) {
      alert(e);
    }
  }

  return (
    <div className="center">
      <h1>User profile</h1>
      <form onSubmit={onSubmit}>
        <FormField label="Name" value={userName} isRequired={true} setText={setUserName}/>
        <FormField label="Address" value={address} isRequired={true} setText={setAddress}/>
        <FormField label="Email" value={email} isDisabled={true} isRequired={true} setText={setEmail}/>
        <FormField label="Phone number" value={phoneNumber} isRequired={true} setText={setPhoneNumber}/>
        <FormField label="Old password" type="password" isRequired={true} setText={setOldPassword}/>
        <FormField label="New password" type="password" setText={setNewPassword}/>
        <FormField label="Confirm new password" type="password" setText={setConfirmNewPassword}/>
        <input type="submit" value="Update information"/>
      </form>
    </div>
  )
}

export default UserProfile