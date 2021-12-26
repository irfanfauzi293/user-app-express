const express = require('express');
const router = express.Router();
const { authenticationsController } = require('./ModuleManager');

router.post('/', authenticationsController.postLoginUser);
router.get('/', authenticationsController.verifyToken);
router.put('/', authenticationsController.putAuthentication);

module.exports = router
