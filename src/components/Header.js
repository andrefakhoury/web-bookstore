import cart from "../img/cart.png"
import logo from "../img/logo.png"

const Header = () => {
  return (
    <header>
      <div className="header">
        <img className="logo" src={logo}/>
        <span className="title">Bookstore</span>
      </div>

      <nav>
        <a href="">biography</a>
        <a href="">classics</a>
        <a href="">comics & mangas</a>
        <a href="">fantasy & sci-fi</a>
        <a href="">humor</a>
        <a href="">romance</a>
        <img className="cart" src={cart}/>
      </nav>
    </header>
  )
}

export default Header