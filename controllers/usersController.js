const axios = require('axios');

exports.get_users = function(req, res) {
  axios.get('https://jsonplaceholder.typicode.com/users').then(function(response) {
    res.render('users/index', {users: response.data});
  });
}