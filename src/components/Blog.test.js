import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import Blog from './Blog';

describe('test <Blog />', () => {
  test('renders content', () => {
    const blog = {
      title: 'test blog title',
      author: 'test blog author',
      url: 'test blog url',
      likes: 10
    };
    const component = render(
      <Blog blog={blog} />
    );
    expect(component.container).toHaveTextContent('test blog title');
    expect(component.container).toHaveTextContent('test blog author');
    expect(component.container).not.toHaveTextContent('test blog url');
    expect(component.container).not.toHaveTextContent('10');
  });

  test('renders url and likes after button clicked', () => {
    const blog = {
      title: 'test blog title',
      author: 'test blog author',
      url: 'test blog url',
      likes: 10
    };
    const component = render(
      <Blog blog={blog} />
    );
    const button = component.getByText('view');
    fireEvent.click(button);
    expect(component.container).toHaveTextContent('test blog url');
    expect(component.container).toHaveTextContent('10');
  });

  test('liked button is cliked twice', () => {
    const mockHandler = jest.fn();
    const user = { id: '123', username: 'username', name: 'name' };
    const blog = {
      user: user,
      title: 'test blog title',
      author: 'test blog author',
      url: 'test blog url',
      likes: 10
    };
    const component = render(
      <Blog blog={blog} updateBlogLikes={mockHandler} user={user}/>
    );
    const button = component.getByText('view');
    fireEvent.click(button);
    const likeButton = component.container.querySelector('.likeButton');
    fireEvent.click(likeButton);
    fireEvent.click(likeButton);
    expect(mockHandler.mock.calls).toHaveLength(2);
  });
});



