const axios = require('axios');
const User = require('../models/userSchema');

exports.get_users = function (req, res) {
  User.find({}, function (err, data) {
    if (err) {
      console.log(err);
    } else {
      console.log(data);
      res.render('users/index', { users: data });
    }
  })
}


exports.get_create_user = function (req, res) {
  res.render('users/create');
}

exports.post_create_user = function (req, res) {

  let newUser = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      role: req.body.role
  });
  newUser.password = newUser.generateHash(req.body.password);

  newUser.save(function (err) {
      if (err) {
          // handle error
          console.log(err);
      } else {
          // saved!
          res.redirect('/users');
      }
  });
}


exports.get_update_user = function (req, res) {
  User.findOne({ _id: req.query.id }, function (err, user) {
      if (err) {
          console.log(err);
      } else {
          console.log(user);
          res.render('users/update', { data: user });
      }
  });
};

exports.post_update_user = function (req, res) {

  const updateData = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      role: req.body.role,
  };

  if (req.body.password) {
    let temp = new User();
    updateData.password = temp.generateHash(req.body.password);
  }
  User.findOneAndUpdate({ _id: req.body.id }, updateData, function (err, data) {
      if (err) {
          // handle error
          console.log(err);
      } else {
          res.redirect('/users');
      }
  });
};


exports.get_delete_user = function (req, res) {
  User.findOneAndDelete({ _id: req.query.id }, function (err) {
      if (err) {
          // handle error
          console.log(err);
      } else {
          res.redirect('/users');
      }
  });
};