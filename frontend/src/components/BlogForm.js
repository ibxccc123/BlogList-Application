import { useState } from 'react'

const BlogForm = ({ user, addBlog }) => {

  const [title, setTitle] = useState([])
  const [author, setAuthor] = useState([])
  const [url, setURL] = useState([])

  const createBlog = (event) => {
    event.preventDefault()
    const blogObject = {
      title: title,
      author: author,
      url: url,
      likes: 0,
      user: user.id
    }
    setTitle('')
    setAuthor('')
    setURL('')
    addBlog(blogObject)
  }

  return (
    <div>
      <h1>create new</h1>
      <form onSubmit={createBlog}>
        <div>
          title:
          <input
            type="text"
            value={title}
            name="Title"
            id="title"
            onChange={({ target }) => setTitle(target.value)}
            placeholder='enter title'
          />
        </div>
        <div>
          author:
          <input
            type="text"
            value={author}
            name="Author"
            id="author"
            onChange={({ target }) => setAuthor(target.value)}
            placeholder='enter author'
          />
        </div>
        <div>
          url:
          <input
            type="text"
            value={url}
            name="URL"
            id="url"
            onChange={({ target }) => setURL(target.value)}
            placeholder='enter url'
          />
        </div>
        <button type="submit" id="submit-button">create</button>
      </form>
    </div>
  )

}

export default BlogForm