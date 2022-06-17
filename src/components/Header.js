import { Link } from 'react-router-dom'

const Header = () => {
  const images = require.context('../../public/images', true);

  return (
    <header>
      <div className="header">
        <Link to={{pathname: "/home", search:"all"}}>
          <img className="logo" alt="Logo" src={images("./logo.png")}/>
          <span className="title">Bookstore</span>
        </Link>
      </div>

      <nav>
        <Link className="header-link" to={{pathname: "/home", search:"biography"}}>biography</Link>
        <Link className="header-link" to={{pathname: "/home", search:"classics"}}>classics</Link>
        <Link className="header-link" to={{pathname: "/home", search:"comics"}}>comics & mangas</Link>
        <Link className="header-link" to={{pathname: "/home", search:"fantasy"}}>fantasy & sci-fi</Link>
        <Link className="header-link" to={{pathname: "/home", search:"humor"}}>humor</Link>
        <Link className="header-link" to={{pathname: "/home", search:"romance"}}>romance</Link>
        <Link to="/user"><img className="profile" alt="User Profile" src={images("./profile.png")}/></Link>
        <Link to="/cart"><img className="cart" alt="Cart Icon" src={images("./cart.png")}/></Link>
      </nav>
    </header>
  )
}

export default Header