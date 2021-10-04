import React from 'react';

const Notification = ({ message }) => {
  if (!message) {
    return null;
  }
  const style={
    color: message.type === 'error' ? 'red' : 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  };
  return (
    <div className='notification' style={style}>
      {message.message}
    </div>
  );
};

export default Notification;