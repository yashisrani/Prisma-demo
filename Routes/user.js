const express = require('express');
const {
  createuser,
  updateuser,
  deleteuser,
  getUserById,
  getUser,
  batchadduser,
  search,
  filter,
  pagination
} = require('../Controllers/createuser');

const router = express.Router();

router.post('/users', createuser);
router.post('/users/batch', batchadduser);
router.put('/users/:id', updateuser);
router.delete('/users/:id', deleteuser);
router.get('/users/:id', getUserById);
router.get('/users', getUser);
router.get('/users/paginate', pagination)
router.get('/users/search', search)
router.get('/users/filter', filter)

module.exports = router;
