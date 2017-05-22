import axios from 'axios';

// const sortData = (response, category) => {
//   return response.data.sort((a,b) => {
//     return b[category] - a[category];
//   });
// }

const fetchTopRecent = () => {
  return axios.get('https://fcctop100.herokuapp.com/api/fccusers/top/recent')
  .then((response) => {
    return response.data;
  });
}

const fetchTopAllTime = () => {
  return axios.get('https://fcctop100.herokuapp.com/api/fccusers/top/alltime')
    .then((response) => {
      return response.data;
    });
}

module.exports = {
  fetchTopRecentlyAndAllTime: () => {
    return axios.all([fetchTopRecent(), fetchTopAllTime()]);
  }
}
