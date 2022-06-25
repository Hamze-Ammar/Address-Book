const { Router } = require('express');
const { add, get, removeContact, updateContact, getOne  } = require('./controller/controller');
const router = Router();
const auth = require("../../middleware/auth");


router.post('/add', auth(),  add);

router.get('/getOne', auth() , getOne);
router.get('/getByUserID', auth() , get);


router.delete('/delete', removeContact);
router.put('/update', updateContact);


module.exports = router;