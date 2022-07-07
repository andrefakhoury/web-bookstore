import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import { verifyPassword, verifyEmail, verifyEqual } from "../utils"
import FormField from "./FormField"

const UserProfile = ({user, onUpdate, onLogOut}) => {
  let navigate = useNavigate();
  
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

  const onClickLogout = async (e) => {
    await Swal.fire({
      title: 'Successfully logged out!',
      html: `See you soon, <b>${user.userName}!</b>`,
      timer: 2000,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading();
      },
      icon: 'success'
    });
    onLogOut();
    navigate('/');
  }

  const onSubmit = async (e) => {
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

      await Swal.fire({
        title: 'Successfully updated!',
        html: `<b>${userName}</b> information was successfully updated!`,
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
        <button className="btn btn-lg" style={{width: "100%"}} onClick={onClickLogout}>Log out</button>
      </form>
    </div>
  )
}

export default UserProfile