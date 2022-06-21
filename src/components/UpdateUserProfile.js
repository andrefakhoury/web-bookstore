import { useEffect, useState } from 'react'
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom'
import { verifyPassword, verifyEmail, verifyEqual, fetchUser } from "../utils"
import FormField from "./FormField"

const UpdateUserProfile = ({loggedUser, onUpdate}) => {
  let navigate = useNavigate();
  
  const [searchParams, setSearchParams] = useSearchParams();
  const userId = searchParams.get('id')
  console.log(loggedUser)
  
  // States for each field
  const [user, setUser] = useState({})
  const [userName, setUserName] = useState();
  const [address, setAddress] = useState();
  const [email, setEmail] = useState();
  const [phoneNumber, setPhoneNumber] = useState();

  // Check if user is invalid
  useEffect(() => {
    // if (!loggedUser || !loggedUser.admin || !userId)
    //   navigate({pathname: "/"});

    const getUser = async () => {
      const user = await fetchUser(userId);
      setUser(user);
      setUserName(user.userName);
      setAddress(user.address);
      setEmail(user.email);
      setPhoneNumber(user.phone);
    } 
    getUser();

  }, [loggedUser, navigate, userId])

  const onSubmit = (e) => {
    e.preventDefault();
    
    // Verifies fields and update
    try {
      const updatedUser = {
        userName: userName,
        address: address,
        password: user.password,
        phone: phoneNumber
      };

      onUpdate(user.id, updatedUser);
      alert("Successfully updated!");
      navigate("/admin?list=users");
    } catch(e) {
      alert(e);
    }
  }

  return (
    <div className="center">
      <h1>Update user profile</h1>
      <form onSubmit={onSubmit}>
        <FormField label="Name" value={userName} isRequired={true} setText={setUserName}/>
        <FormField label="Address" value={address} isRequired={true} setText={setAddress}/>
        <FormField label="Email" value={email} isRequired={true} setText={setEmail}/>
        <FormField label="Phone number" value={phoneNumber} isRequired={true} setText={setPhoneNumber}/>
        <input type="submit" value="Update information"/>
      </form>
    </div>
  )
}

export default UpdateUserProfile