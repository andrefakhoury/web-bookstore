import { useEffect, useState } from 'react'
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom'
import Swal from 'sweetalert2'
import { fetchBook } from "../utils"
import FormField from "./FormField"

const UpdateBookInfo = ({loggedUser, onUpdate}) => {
  let navigate = useNavigate();
  
  const [searchParams, setSearchParams] = useSearchParams();
  const bookId = searchParams.get('id')
  
  // States for each field
  const [book, setBook] = useState({})
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [coverImage, setCoverImage] = useState("book_cover.png");

  // Check if user is invalid
  useEffect(() => {
    if (!loggedUser || !loggedUser.admin || !bookId)
      navigate({pathname: "/home"}, {replace: true});

    const getBook = async () => {
      const book = await fetchBook(bookId);
      setBook(book);
      setTitle(book.title);
      setAuthor(book.author);
      setDescription(book.description);
      setCategory(book.category);
      setPrice(book.price);
      setCoverImage(book.img);
    } 
    getBook();

  }, [loggedUser, navigate, bookId])

  const onSubmit = async (e) => {
    e.preventDefault();

    // Verifies fields and update
    try {
      const updatedBook = {
        title: title,
        author: author,
        description: description,
        category: category,
        price: price,
        img: coverImage.replace(/^.*\\/, "")
      };

      onUpdate(book._id, updatedBook);
      await Swal.fire({
        title: 'Successfully updated!',
        html: `<b>${title}</b> information was successfully updated!`,
        timer: 2000,
        timerProgressBar: true,
        didOpen: () => {
          Swal.showLoading();
        },
        icon: 'success'
      });
      navigate("/admin?list=books");
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
      <h1>Update book information</h1>
      <form onSubmit={onSubmit}>
        <FormField label="Title" value={title} isRequired={true} setText={setTitle}/>
        <FormField label="Author" value={author} isRequired={true} setText={setAuthor}/>
        <FormField label="Category" value={category} isRequired={true} setText={setCategory}/>
        <FormField label="Description" value={description} isRequired={true} setText={setDescription}/>
        <FormField label="Price" value={price} isRequired={true} setText={setPrice}/>
        <FormField type="file" setText={setCoverImage} />
        <input type="submit" value="Update information"/>
      </form>
    </div>
  )
}

export default UpdateBookInfo