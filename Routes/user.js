const express = require('express')
const router = express.Router()

var createuser = require('../Controllers/createuser')
var updateuser = require('../Controllers/createuser')



router.get('/createuser',()=> createuser)
router.put('/updateuser/:id',()=> updateuser)

module.exports = router