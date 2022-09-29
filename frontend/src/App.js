import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Togglable from './components/Togglable'
import SuccessNotification from './components/SuccessNotification'
import ErrorNotification from './components/ErrorNotification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'

const App = () => {
  const [user, setUser] = useState(null)
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const addBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility()
    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setSuccessMessage(`a new blog ${returnedBlog.title} added`)
        setTimeout(() => {
          setSuccessMessage(null)
        }, 5000)
      })
  }

  const updateBlog = async (id, blogObject) => {
    const foundBlog = blogs.filter(blog => blog.id === id)[0]
    const returnedBlog = await blogService.update(foundBlog.id, blogObject)
    setBlogs(blogs.map(blog => blog.id !== returnedBlog.id ? blog : returnedBlog))
  }

  const removeBlog = async (id) => {
    const deletedBlogName = blogs.filter(blog => blog.id === id)[0].title
    if (window.confirm(`Delete ${deletedBlogName} ?`)) {
      const foundBlog = blogs.filter(blog => blog.id === id)[0]
      await blogService.deleteBlog(foundBlog.id)
      setBlogs(blogs.filter(blog => blog.id !== id))
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()

    window.localStorage.removeItem(
      'loggedBlogappUser'
    )
    setUser(null)
  }

  const blogFormRef = useRef()

  const sortByLikes = (a, b) => {
    if ( a.likes < b.likes ){
      return 1
    }
    if ( a.likes > b.likes ){
      return -1
    }
    return 0
  }

  return (
    <div>

      <SuccessNotification message={successMessage} />
      <ErrorNotification message={errorMessage} />

      {user === null &&
        <LoginForm
          blogService={blogService}
          setUser={setUser}
          setErrorMessage={setErrorMessage}
        />
      }

      {user !== null &&
        <div>
          <h1>blogs</h1>
          <p>{`${user.name} logged in`} <button onClick={handleLogout}>logout</button></p>
          <Togglable buttonLabel="new blog" buttonClassName="blog-button" ref={blogFormRef}>
            <BlogForm
              user={user}
              addBlog={addBlog}
            />
          </Togglable>
          {blogs.sort(sortByLikes).map(blog =>
            <Blog
              key={blog.id}
              blog={blog}
              updateBlog={updateBlog}
              removeBlog={removeBlog}
              user={user}
            />
          )}
        </div>
      }

    </div>
  )
}

export default App
