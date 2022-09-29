import { useState } from 'react'

const Blog = ({ blog, updateBlog, removeBlog, user }) => {

  const [visible, setVisible] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const updateBlogLikes = () => {
    const blogObject = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
      user: blog.user.id,
      id: blog.id
    }
    updateBlog(blog.id, blogObject)
  }

  return (
    <div className='blog'>
      {visible === false &&
        <div style={blogStyle} className='blogWithTitleAndAuthor'>
          {blog.title} {blog.author} <button onClick={() => setVisible(!visible)}>view</button>
        </div>
      }
      {visible === true &&
        <div style={blogStyle} className='blogwithAllContent'>
          {blog.title} {blog.author} <button onClick={() => setVisible(!visible)}>hide</button> <br />
          {blog.url} <br />
          likes {blog.likes} <button onClick={() => updateBlogLikes()}>like</button> <br />
          {blog.user.name} <br />
          {user.id === blog.user.id &&
            <button onClick={() => removeBlog(blog.id)}>remove</button>
          }
        </div>
      }
    </div>
  )

}

export default Blog