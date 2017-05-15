import React from 'react';
import PageHeader from './PageHeader';
import Board from './Board';

class App extends React.Component {
  render() {
    return (
      <div className='parent-container'>
        <PageHeader />
        <Board />
      </div>
    )
  }
}

export default App;
