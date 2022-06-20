import { useEffect, useState } from 'react'
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom'
import { fetchBook } from "../utils"
import FormField from "./FormField"

const UpdateBookInfo = ({loggedUser, onUpdate}) => {
  let navigate = useNavigate();
  
  const [searchParams, setSearchParams] = useSearchParams();
  const bookId = searchParams.get('id')
  
  // States for each field
  const [book, setBook] = useState({})
  const [title, setTitle] = useState();
  const [author, setAuthor] = useState();
  const [description, setDescription] = useState();
  const [category, setCategory] = useState();
  const [price, setPrice] = useState();

  // Check if user is invalid
  useEffect(() => {
    if (loggedUser.admin == false || !bookId)
      navigate({pathname: "/home"}, {replace: true});

    const getBook = async () => {
      const book = await fetchBook(bookId);
      setBook(book);
      setTitle(book.title);
      setAuthor(book.author);
      setDescription(book.description);
      setCategory(book.category);
      setPrice(book.price)
    } 
    getBook();

  }, [loggedUser, navigate, bookId])

  const onSubmit = (e) => {
    e.preventDefault();
    
    // Verifies fields and update
    try {
      const updatedBook = {
        title: title,
        author: author,
        description: description,
        category: category,
        price: price
      };

      onUpdate(book.id, updatedBook);
      alert("Book successfully updated!");
      navigate("/");
    } catch(e) {
      alert(e);
    }
  }

  return (
    <div className="center">
      <h1>Update book information</h1>
      <form onSubmit={onSubmit}>
        <FormField label="Title" value={title} isRequired={true} setText={setTitle}/>
        <FormField label="Author" value={author} isRequired={true} setText={setAuthor}/>
        <FormField label="Category" value={category} isRequired={true} setText={setCategory}/>
        <FormField label="Description" value={description} isRequired={true} setText={setDescription}/>
        <FormField label="Price" value={price} isRequired={true} setText={setPrice}/>
        <input type="submit" value="Update information"/>
      </form>
    </div>
  )
}

export default UpdateBookInfo