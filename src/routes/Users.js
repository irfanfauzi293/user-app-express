const express = require('express');
const router = express.Router();
const { usersController, authenticationsController } = require('./ModuleManager');

router.post('/', authenticationsController.verifyToken, usersController.postUser);
router.put('/:id', authenticationsController.verifyToken, usersController.putUser);
router.delete('/:id', authenticationsController.verifyToken, usersController.deleteUser);
router.get('/', authenticationsController.verifyToken, usersController.getUser);

module.exports = router;
