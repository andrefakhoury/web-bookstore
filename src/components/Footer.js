import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <>
      {/* Clear all floats/left identations */}
      <div className="pre-footer"></div>
      {/* Footer to show all map links */}
      <footer className="footer">
        <span>Quick links:</span>
        <div className="quick-links">
          <Link to="/">home</Link>&nbsp;|&nbsp; 
          <Link to="/cart">cart</Link>&nbsp;|&nbsp;
          <Link to="/user">user profile</Link>
        </div>
      </footer>
    </>
  )
}

export default Footer