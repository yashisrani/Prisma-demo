const express = require('express');
const {
  createuser,
  updateuser,
  deleteuser,
  getUserById,
  getUser,
} = require('../Controllers/createuser');

const router = express.Router();

router.post('/users', createuser);
router.put('/users/:id', updateuser);
router.delete('/users/:id', deleteuser);
router.get('/users/:id', getUserById);
router.get('/users', getUser);

module.exports = router;
