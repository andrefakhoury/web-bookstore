import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import Swal from 'sweetalert2'
import { fetchUser } from "../utils"
import FormField from "./FormField"

const UpdateUserProfile = ({loggedUser, onUpdate}) => {
  let navigate = useNavigate();
  
  const [searchParams, setSearchParams] = useSearchParams();
  const userId = searchParams.get('id')
  
  // States for each field
  const [user, setUser] = useState({})
  const [name, setName] = useState();
  const [address, setAddress] = useState();
  const [email, setEmail] = useState();
  const [phoneNumber, setPhoneNumber] = useState();

  // Check if user is invalid
  useEffect(() => {
    if (!loggedUser || !loggedUser.admin || !userId)
      navigate({pathname: "/"});

    const getUser = async () => {
      const user = await fetchUser(userId);
      setUser(user);
      setName(user.name);
      setAddress(user.address);
      setEmail(user.email);
      setPhoneNumber(user.phone);
    } 
    getUser();

  }, [loggedUser, navigate, userId])

  const onSubmit = async (e) => {
    e.preventDefault();
    
    // Verifies fields and update
    try {
      const updatedUser = {
        name: name,
        address: address,
        password: user.password,
        phone: phoneNumber
      };

      onUpdate(user._id, updatedUser, false);
      
      await Swal.fire({
        title: 'Successfully updated!',
        html: `<b>${name}</b> information was successfully updated!`,
        timer: 2000,
        timerProgressBar: true,
        didOpen: () => {
          Swal.showLoading();
        },
        icon: 'success'
      });

      navigate("/admin?list=users");
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
      <h1>Update user profile</h1>
      <form onSubmit={onSubmit}>
        <FormField label="Name" value={name} isRequired={true} setText={setName}/>
        <FormField label="Address" value={address} isRequired={true} setText={setAddress}/>
        <FormField label="Email" value={email} isRequired={true} setText={setEmail}/>
        <FormField label="Phone number" value={phoneNumber} isRequired={true} setText={setPhoneNumber}/>
        <input type="submit" value="Update information"/>
      </form>
    </div>
  )
}

export default UpdateUserProfile