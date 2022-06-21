import { useEffect, useState } from 'react'
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom'
import { fetchBook } from "../utils"
import FormField from "./FormField"

const CreateBook = ({loggedUser, onAdd}) => {
  let navigate = useNavigate();
  
  // States for each field
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);
  const [coverImage, setCoverImage] = useState("book_cover.png");

  // Check if user is invalid
  useEffect(() => {
    if (!loggedUser || !loggedUser.admin)
      navigate({pathname: "/home"}, {replace: true});

  }, [loggedUser, navigate])

  const onSubmit = (e) => {
    e.preventDefault();

    // Verifies fields and update
    try {
      const newBook = {
        title: title,
        author: author,
        description: description,
        category: category,
        qttStock: parseInt(stock),
        qttSold: 0,
        price: parseFloat(price),
        img: coverImage.replace(/^.*\\/, "")
      };

      onAdd(newBook);
      alert("Book successfully created!");
      navigate("/admin?list=books");
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
        <FormField label="Price" type="number" value={price} isRequired={true} setText={setPrice}/>
        <FormField label="Stock" type="number" value={stock} isRequired={true} setText={setStock}/>
        <FormField type="file" setText={setCoverImage} />
        <input type="submit" value="Update information"/>
      </form>
    </div>
  )
}

export default CreateBook