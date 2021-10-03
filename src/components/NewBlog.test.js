import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import NewBlog from './NewBlog';

test('<NewBlog /> updates parent state and calls onSubmit', () => {
  const createNewBlog = jest.fn();
  const user = { id: '123', username: 'username', name: 'name' };
  const component = render(
    <NewBlog createNewBlog={createNewBlog} user={user}/>
  );

  const title = component.container.querySelector('#title');
  const author = component.container.querySelector('#author');
  const url = component.container.querySelector('#url');
  const form = component.container.querySelector('form');

  fireEvent.change(title, {
    target: { value: 'testing title' }
  });
  fireEvent.change(author, {
    target: { value: 'testing author' }
  });
  fireEvent.change(url, {
    target: { value: 'testing url' }
  });
  fireEvent.submit(form);
  expect(createNewBlog.mock.calls).toHaveLength(1);
  expect(createNewBlog.mock.calls[0][0].title).toBe('testing title');
  expect(createNewBlog.mock.calls[0][0].author).toBe('testing author');
  expect(createNewBlog.mock.calls[0][0].url).toBe('testing url');
});