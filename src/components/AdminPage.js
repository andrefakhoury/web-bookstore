import { useEffect, useState } from 'react'
import { useNavigate, Link, useSearchParams } from 'react-router-dom'
import { fetchBooks, fetchUsers } from "../utils"
import FormField from "./FormField"

const AdminPage = ({loggedUser}) => {
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
    
    if (list == 'books')
      getBooks()
    else if (list == 'users')
      getUsers()

  }, [list])
  
  if (list == 'users')
    return (
      <div className="center">
        <h1>Admin Page</h1>
        <div>
          <table className="table table-responsive m-0" style={{width: "100%"}}>
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Username</th>
                <th scope="col">Email</th>
                <th scope="col">Admin</th>
              </tr>
            </thead>
            <tbody>
              {
                content.map((user) => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td><Link to={{pathname: "/users/update", search:`id=${user.id}`}}>{user.userName}</Link></td>
                    <td>{user.email}</td>
                    <td>{user.admin ? 'True' : 'False'}</td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
      </div>
    )

  else if (list == 'books')
    return (
      <div className="center">
        <h1>Admin Page</h1>
        <div>
          <table className="table table-responsive m-0" style={{width: "100%"}}>
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Title</th>
                <th scope="col">Author</th>
                <th scope="col">Category</th>
                <th scope="col">Price</th>
                <th scope="col">Stock</th>
                <th scope="col">Sold</th>
              </tr>
            </thead>
            <tbody>
                <tr>
                  <td></td>
                  <td><Link to={{pathname: "/books/create"}}>[+] Add new book</Link></td>
                  </tr>
              {
                content.map((book) => (
                  <tr>
                    <td>{book.id}</td>
                    <td><Link to={{pathname: "/books/update", search:`id=${book.id}`}}>{book.title}</Link></td>
                    <td>{book.author}</td>
                    <td>{book.category}</td>
                    <td>{book.price}</td>
                    <td>{book.qttStock}</td>
                    <td>{book.qttSold}</td>
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