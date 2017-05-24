import React from 'react';
import api from '../utils/api';
import PropTypes from 'prop-types';

function Row(props) {
  return (
    <tr style={props.backgroundStyle}>
      <td className='rank'>{props.rank}</td>
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
  allTime: PropTypes.number.isRequired,
  backgroundStyle: PropTypes.object.isRequired
}

Row.defaultProps = {
  backgroundStyle: {
    backgroundColor: '#ccc'
  }
}

class BoardCategories extends React.Component {
  constructor(props) {
    super(props);

    this.loadRecent = this.loadRecent.bind(this);
    this.loadAllTime = this.loadAllTime.bind(this);

    this.state = {
      recentHeaderActive: true,
      allTimeHeaderActive: false
    }
  }
  loadRecent() {
    this.props.loadRows(this.props.recent);
    this.setState({
      recentHeaderActive: true,
      allTimeHeaderActive: false
    });
  }
  loadAllTime() {
    this.props.loadRows(this.props.allTime);
    this.setState({
      recentHeaderActive: false,
      allTimeHeaderActive: true
    });
  }
  render() {
    return (
      <thead className='headers'>
        <tr>
          <th className='rank'>#</th>
          <th>Camper Name</th>
          <th
            id='recent-header'
            onClick={this.loadRecent}
            className={this.state.recentHeaderActive ? 'arrow-down' : ''}
          >
            Points in past 30 days
          </th>
          <th
            id='all-time-header'
            onClick={this.loadAllTime}
            className={this.state.allTimeHeaderActive ? 'arrow-down' : ''}
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
      let greyBackground;
      let rank = index + 1

      if (rank % 2 !== 0) {
        greyBackground = {
          backgroundColor: '#f2f2f2'
        }
      }

      return (
        <Row
          key={obj.username}
          rank={rank}
          img={obj.img}
          username={obj.username}
          recent={obj.recent}
          allTime={obj.alltime}
          backgroundStyle={greyBackground}
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
