const { Router } = require('express');
const { get, register, login } = require('./controller/user');
const router = Router();

// req -> from postman
// res -> your api response

router.post('/auth/register', register);
router.post('/auth/login', login);
router.post('/get', get);

// localhost:3000/api/user/
// localhost:3000/api/user/auth/register
// localhost:3000/api/user/auth/login

module.exports = router;