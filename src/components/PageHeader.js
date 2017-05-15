import React from 'react';

function PageHeader(props) {
  return (
    <div className='header'>
      <div className='logo'>
        <a href='https://www.freecodecamp.com/'>
        <img
          src={'./src/images/freecodecamp_logo.svg'}
          alt='freecodecamp'
        />
      </a>
      </div>
    </div>
  )
}

export default PageHeader;
