const express = require('express');

const router = express.Router();
const User = require('../controllers/User');

router.get('/:id', User.index);
router.post('/', User.create);
router.patch('/:id', User.update);
router.delete('/:id', User.delete);

module.exports = router;
