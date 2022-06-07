import Book from "./components/Book";
import Books from "./components/Books";
import Footer from "./components/Footer";
import Header from "./components/Header";
import UserProfile from "./components/UserProfile";

function App() {
  return (
    <div id="App">
      <div id="content-wrap">
        <Header/>
        <Books/>
        {/* <Book/> */}
        {/* <UserProfile/> */}
      </div>
      <Footer/>
    </div>
  );
}

export default App;
