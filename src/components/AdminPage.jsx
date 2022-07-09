import { useEffect, useState } from 'react'
import { FaTimes, FaToggleOff, FaToggleOn } from 'react-icons/fa'
import { useNavigate, Link, useSearchParams } from 'react-router-dom'
import { fetchBooks, fetchUsers } from "../utils"

const AdminPage = ({loggedUser, onUpdateAdmin}) => {
  let navigate = useNavigate();
  const [content, setContent] = useState([])
  
  const [searchParams, setSearchParams] = useSearchParams();
  const list = searchParams.get('list')

  useEffect(() => {
    if (!loggedUser || !loggedUser.admin)
      navigate({pathname: "/"});

    const getBooks = async () => {
      const books = await fetchBooks('all');
      setContent(books)
    }
    const getUsers = async () => {
      const users = await fetchUsers();
      setContent(users)
    }
    
    if (list === 'books')
      getBooks()
    else if (list === 'users')
      getUsers()

  }, [loggedUser, list, navigate])

  const toggleAdmin = async (user) => {
    // cannot toggle current user
    if (user._id === loggedUser._id)
      return;
    await onUpdateAdmin(user._id);
    const users = await fetchUsers();
    setContent(users);
  }

  const deleteUser = async(user) => {
    // cannot delete current user
    if (user._id === loggedUser._id)
      return;
    await fetch(`http://localhost:8080/accounts/${user._id}`, {
      method: 'DELETE',
      headers: {'Content-Type': 'application/json'}
    });   
    const users = await fetchUsers();
    setContent(users);
  }

  const deleteBook = async(book) => {
    await fetch(`http://localhost:8080/books/${book._id}`, {
      method: 'DELETE',
      headers: {'Content-Type': 'application/json'}
    });
    const books = await fetchBooks('all');
    setContent(books);
  }
  
  if (list === 'users')
    return (
      <div className="center">
        <h1>Admin Page</h1>
        <div className="container">
          <table className="table table-responsive m-0">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Admin</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {
                content.map((user) => (
                  <tr key={user._id}>
                    <td>{user._id}</td>
                    <td><Link to={{pathname: "/users/update", search:`id=${user._id}`}}>{user.name}</Link></td>
                    <td>{user.email}</td>
                    <td>
                      {user.admin ?
                        <>True <FaToggleOn
                          style={loggedUser._id === user._id ? {color: "gray"} : {cursor: "pointer"}}
                          onClick={async () => await toggleAdmin(user)}
                        /></> :
                        <>False <FaToggleOff 
                          style={{cursor: "pointer"}}
                          onClick={async () => await toggleAdmin(user)}
                        /></> }
                    </td>
                    <td><FaTimes
                      style={loggedUser._id === user._id ? {color: "gray"} : {cursor: "pointer"}}
                      onClick={async () => await deleteUser(user)}
                    /></td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
      </div>
    )

  else if (list === 'books')
    return (
      <div className="center">
        <h1>Admin Page</h1>
        <div className="container">
          <table className="table table-responsive m-0">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Title</th>
                <th scope="col">Author</th>
                <th scope="col">Category</th>
                <th scope="col">Price</th>
                <th scope="col">Stock</th>
                <th scope="col">Sold</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
                <tr>
                  <td></td>
                  <td><Link to={{pathname: "/books/create"}}>[+] Add new book</Link></td>
                  </tr>
              {
                content.map((book) => (
                  <tr key={book._id}>
                    <th scope="row">{book._id}</th>
                    <td><Link to={{pathname: "/books/update", search:`id=${book._id}`}}>{book.title}</Link></td>
                    <td>{book.author}</td>
                    <td>{book.category}</td>
                    <td>{book.price}</td>
                    <td>{book.qttStock}</td>
                    <td>{book.qttSold}</td>
                    <td><FaTimes
                      style={{cursor: "pointer"}}
                      onClick={async () => await deleteBook(book)}/></td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
      </div>
    )
}

export default AdminPage