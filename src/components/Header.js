const Header = () => {
  const images = require.context('../../public/images', true);

  return (
    <header>
      <div className="header">
        <img className="logo" alt="Logo" src={images("./logo.png")}/>
        <span className="title">Bookstore</span>
      </div>

      <nav>
        <a href="">biography</a>
        <a href="">classics</a>
        <a href="">comics & mangas</a>
        <a href="">fantasy & sci-fi</a>
        <a href="">humor</a>
        <a href="">romance</a>
        <img className="cart" alt="Cart Icon" src={images("./cart.png")}/>
      </nav>
    </header>
  )
}

export default Header