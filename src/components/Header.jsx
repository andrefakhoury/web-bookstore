import { Link } from 'react-router-dom'
import { FaCartArrowDown, FaUser } from 'react-icons/fa'

const Header = ({isAdmin}) => {
  const images = require.context('../../public/images', true);

  return (
    <>
    <nav className="navbar navbar-expand-lg navbar-dark justify-content-center" style={{backgroundColor: "#1D91E5"}}>
      {/* Logo */}
      <Link to={{pathname: "/home", search:"genre=all"}}>
        <img width="50" alt="Logo" src={images("./logo.png")}/>
        <span className="title navbar-brand">Bookstore</span>
      </Link>
    </nav>
    <nav className="navbar navbar-expand-lg navbar-light bg-muted" style={{backgroundColor: "#bbd1e0"}}>
      {/* Button to toggle if need more space */}
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      {/* Inner links */}
      <div className="collapse navbar-collapse mx-auto" id="navbarText">
      <ul className="navbar-nav mr-auto">
          <li className="nav-item"><Link className="nav-link" to={{pathname: "/home", search:"genre=biography"}}>biography</Link></li>
          <li className="nav-item"><Link className="nav-link" to={{pathname: "/home", search:"genre=classics"}}>classics</Link></li>
          <li className="nav-item"><Link className="nav-link" to={{pathname: "/home", search:"genre=comics"}}>comics & mangas</Link></li>
          <li className="nav-item"><Link className="nav-link" to={{pathname: "/home", search:"genre=fantasy"}}>fantasy & sci-fi</Link></li>
          <li className="nav-item"><Link className="nav-link" to={{pathname: "/home", search:"genre=humor"}}>humor</Link></li>
          <li className="nav-item"><Link className="nav-link" to={{pathname: "/home", search:"genre=romance"}}>romance</Link></li>
        </ul>
        {/* Cart and User icons */}
        <ul className="navbar-nav mr-right">
          {isAdmin && <li className="nav-item"><Link className="nav-link" to={{pathname: "/admin", search:"list=users"}}>Manage users</Link></li>}
          {isAdmin && <li className="nav-item"><Link className="nav-link" to={{pathname: "/admin", search:"list=books"}}>Manage books</Link></li>}
          <li className="nav-item"><Link className="nav-link" to="/cart"><FaCartArrowDown className="color-change" size={20}/></Link></li>
          <li className="nav-item"><Link className="nav-link" to="/user"><FaUser className="color-change" size={20}/></Link></li>
        </ul>
      </div>
    </nav>    
    </>
  )
}

export default Header