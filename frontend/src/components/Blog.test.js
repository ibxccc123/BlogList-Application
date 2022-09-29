import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('<Blog />', () => {
  let container
  const blog = {
    title: 'component testing title',
    author: 'component testing author',
    url: 'component url',
    likes: 0,
    user: {
      name: 'superuser',
      username: 'root',
      id: 100
    }
  }
  const user = {
    id : 100
  }
  const mockHandler = jest.fn()


  beforeEach(() => {
    container = render(
      <Blog blog={blog} user={user} updateBlog={mockHandler} />
    ).container
  })

  test('renders content', () => {
    const element = screen.getByText('component testing title component testing author')
    expect(element).toBeDefined()
  })

  test('title and author are displayed', () => {
    const divWithTitleAndAuthor = container.querySelector('.blogWithTitleAndAuthor')
    expect(divWithTitleAndAuthor).toHaveTextContent('component testing title component testing author')
  })

  test('url and likes are not in the document by default', () => {
    const divWithAllContent = container.querySelector('.blogwithAllContent')
    expect(divWithAllContent).not.toBeInTheDocument()
  })

  test('url and likes are shown when the button is clicked', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)
    const divWithAllContent = container.querySelector('.blogwithAllContent')
    expect(divWithAllContent).toHaveTextContent('component url likes 0')
  })

  test('url and likes are shown when the button is clicked', async () => {
    const user = userEvent.setup()
    const viewButton = screen.getByText('view')
    await user.click(viewButton)
    const likeButton = screen.getByText('like')
    await user.click(likeButton)
    await user.click(likeButton)
    expect(mockHandler.mock.calls).toHaveLength(2)
  })

})