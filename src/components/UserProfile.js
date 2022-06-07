const UserProfile = () => {
  return (
    <div class="center">
      <h1>User profile</h1>
      <form method="post">
        <div class="txt_field">
          <input type="text" required/>
          <span></span>
          <label>Name</label>
        </div>
        <div class="txt_field">
          <input type="text" required/>
          <span></span>
          <label>Address</label>
        </div>
        <div class="txt_field">
          <input type="text" required/>
          <span></span>
          <label>Email</label>
        </div>
        <div class="txt_field">
          <input type="text" required/>
          <span></span>
          <label>Phone number</label>
        </div>
        <div class="txt_field">
          <input type="password" required/>
          <span></span>
          <label>Old password</label>
        </div>
        <div class="txt_field">
          <input type="password" required/>
          <span></span>
          <label>New password</label>
        </div>
        <input type="submit" value="Update information"/>
      </form>
    </div>
  )
}

export default UserProfile