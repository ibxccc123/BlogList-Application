import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

describe('<BlogForm />', () => {
  const user = {
    id : 100
  }
  const createBlog = jest.fn()


  beforeEach(() => {
    render(
      <BlogForm user={user} addBlog={createBlog} />
    )
  })

  test('checks that the form calls the event handler with right details', async () => {
    const user = userEvent.setup()
    const titleInput = screen.getByPlaceholderText('enter title')
    const authorInput = screen.getByPlaceholderText('enter author')
    const urlInput = screen.getByPlaceholderText('enter url')
    const sendButton = screen.getByText('create')

    await user.type(titleInput, 'test title')
    await user.type(authorInput, 'test author')
    await user.type(urlInput, 'test url')
    await user.click(sendButton)

    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0].title).toBe('test title')
    expect(createBlog.mock.calls[0][0].author).toBe('test author')
    expect(createBlog.mock.calls[0][0].url).toBe('test url')

  })

})