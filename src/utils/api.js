import axios from 'axios';

function sortData(response) {
  return response.data.sort((a,b) => {
    return b.recent - a.recent;
  });
}

module.exports = {
  fetchTop30: () => {
    return axios.get('https://fcctop100.herokuapp.com/api/fccusers/top/recent')
      .then(sortData);
  },
  fetchTopAllTime: () => {

  }
}
