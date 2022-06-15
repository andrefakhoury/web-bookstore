import { useState } from 'react'
import { verifyPassword, verifyEmail } from "../utils"
import FormField from "./FormField"

const UserProfile = ({user}) => {
  const [userName, setUserName] = useState(user.userName);
  const [address, setAddress] = useState(user.address);
  const [email, setEmail] = useState(user.email);
  const [phoneNumber, setPhoneNumber] = useState(user.phone);
  const [oldPassword, setOldPassword] = useState();
  const [newPassword, setNewPassword] = useState();

  const onSubmit = (e) => {
    e.preventDefault();

    if (!verifyPassword(oldPassword)) {
      alert("Please verify your password before updating your information.")
      return;
    }

    if (!verifyEmail(email)) {
      alert("Please provide a valid email address.")
      return;
    }

    if (oldPassword !== user.password) {
      alert("Invalid password... Try again later.");
      return;
    }

    console.log(`Updated user information of user ${userName}`);
    // ... update here ...
  }

  return (
    <div className="center">
      <h1>User profile</h1>
      <form onSubmit={onSubmit}>
        <FormField label="Name" value={userName} isRequired={true} setText={setUserName}/>
        <FormField label="Address" value={address} isRequired={true} setText={setAddress}/>
        <FormField label="Email" value={email} isDisabled={true} isRequired={true} setText={setEmail} verifyField={verifyEmail}/>
        <FormField label="Phone number" value={phoneNumber} isRequired={true} setText={setPhoneNumber}/>
        <FormField
          label="Old password" type="password" isRequired={true}
          setText={setOldPassword} verifyField={verifyPassword}
        />
        <FormField
          label="New password" type="password"
          setText={setNewPassword} verifyField={verifyPassword}
        />
        <input type="submit" value="Update information"/>
      </form>
    </div>
  )
}

export default UserProfile