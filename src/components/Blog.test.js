import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import Blog from './Blog';

describe('test <Blog />', () => {
  let component;

  beforeEach(() => {
    const blog = {
      title: 'test blog title',
      author: 'test blog author',
      url: 'test blog url',
      likes: 10
    };
    component = render(
      <Blog blog={blog} />
    );
  });

  test('renders content', () => {
    expect(component.container).toHaveTextContent('test blog title');
    expect(component.container).toHaveTextContent('test blog author');
    expect(component.container).not.toHaveTextContent('test blog url');
    expect(component.container).not.toHaveTextContent('10');
  });

  test('renders url and likes after button clicked', () => {
    const button = component.getByText('view');
    fireEvent.click(button);
    expect(component.container).toHaveTextContent('test blog url');
    expect(component.container).toHaveTextContent('10');
  });

});



