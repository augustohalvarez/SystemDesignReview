var express = require('express');
var router = express.Router();

// var auth = require('./auth.js');
// var user = require('./users.js');
var userController = require('./controllers/user.js');

// Routes accessible by anyone
// router.post('/login', auth.login);

// Routes that can be accessed only by authenticated users
// router.get('/api/v1/profile', /*UserController.get method*/);
router.get('/api/v1/users', userController.getUsers);
// router.get('/api/v1/fun', questionController.yourmethod);

// Routes that can be accessed only by authenticated & authorized users


module.exports = router;