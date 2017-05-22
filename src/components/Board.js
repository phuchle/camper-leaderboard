import React from 'react';
import api from '../utils/api';
import PropTypes from 'prop-types';

function Row(props) {
  return (
    <tr>
      <td>{props.rank}</td>
      <td>
        <a
          href={'https://freecodecamp.com/' + props.username}
        >
         <img
           className='profile-picture'
           src={props.img}
           alt={props.username}
         />
         {' ' + props.username}
        </a>
      </td>
      <td>{props.recent}</td>
      <td>{props.allTime}</td>
    </tr>
  )
}

Row.propTypes = {
  rank: PropTypes.number.isRequired,
  img: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  recent: PropTypes.number.isRequired,
  allTime: PropTypes.number.isRequired
}

class BoardCategories extends React.Component {
  constructor(props) {
    super(props);

    this.loadRecent = this.loadRecent.bind(this);
    this.loadAllTime = this.loadAllTime.bind(this);
  }
  loadRecent() {
    this.props.loadRows(this.props.recent);
  }
  loadAllTime() {
    this.props.loadRows(this.props.allTime);
  }
  render() {
    return (
      <thead className='headers'>
        <tr>
          <th>#</th>
          <th>Camper Name</th>
          <th
            id='recent-header'
            onClick={this.loadRecent}
            className='clickable'
          >
            Points in past 30 days
            <span>&#9660;</span>
          </th>
          <th
            id='all-time-header'
            onClick={this.loadAllTime}
            className='clickable'
          >
            All time points
          </th>
        </tr>
      </thead>
    )
  }
}

BoardCategories.propTypes = {
  loadRows: PropTypes.func.isRequired,
  recent: PropTypes.array.isRequired,
  allTime: PropTypes.array.isRequired
}
class Board extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      recent: null,
      allTime: null,
      loading: true,
      error: null,
      rows: []
    }
    this.makeRows = this.makeRows.bind(this);
    this.setRows = this.setRows.bind(this);
  }

  setRows(userArr) {
    let rows = this.makeRows(userArr);

    this.setState({
      rows: rows
    });
  }
  makeRows(userArr) {
    return userArr.map((obj, index) => {
      return (
        <Row
          key={obj.username}
          rank={index + 1}
          img={obj.img}
          username={obj.username}
          recent={obj.recent}
          allTime={obj.alltime}
        />
      )
    });
  }
  componentDidMount() {
    api.fetchTopRecentlyAndAllTime().then((results) => {
      if (results === null) {
        return this.setState({
          error: 'Check API responses.',
          loading: false
        });
      }
      this.setState({
        recent: results[0],
        allTime: results[1],
        rows: this.makeRows(results[0]),
        loading: false,
        error: null
      });
    });
  }

  render() {
    let loading = this.state.loading;
    if (loading) {
      return (
        <h1>Loading</h1>
      )
    }

    return (
      <div className='board'>
        <h1 className='title'>Leaderboard</h1>
        <table>
          <BoardCategories
            loadRows={this.setRows}
            recent={this.state.recent}
            allTime={this.state.allTime}
          />
          <tbody>{this.state.rows}</tbody>
        </table>
      </div>
    )
  }
}

export default Board;
