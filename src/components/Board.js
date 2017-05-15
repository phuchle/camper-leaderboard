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
  render() {
    return (
      <thead className='headers'>
        <tr>
          <th>#</th>
          <th>Camper Name</th>
          <th>Points in past 30 days
            <span>&#9660;</span>
          </th>
          <th>All time points</th>
        </tr>
      </thead>
    )
  }
}

class Board extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      recent: null,
      loading: true,
      error: null
    }
  }

  componentDidMount() {
    api.fetchTop30()
      .then((response) => {
        if (response === null) {
          return this.setState(() => {
            return {
              error: 'Check API is working correctly.',
              loading: false
            }
          });
        }
        this.setState(() => {
          return {
            recent: response,
            loading: false
          }
        });
      });
  }

  render() {
    let loading = this.state.loading;
    let recent = this.state.recent;
    let rows = [];
    if (loading) {
      return (
        <p>Loading</p>
      )
    }

    recent.forEach((obj, index) => {
      rows.push(
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
    return (
      <div className='board'>
        <h1 className='title'>Leaderboard</h1>
        <table>
          <BoardCategories />
          <tbody>{rows}</tbody>
        </table>
      </div>
    )
  }
}

export default Board;
