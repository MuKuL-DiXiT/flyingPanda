const express = require('express');
const router = express.Router();
const controller = require('../controllers/alertsController');

router.get('/', controller.getAlerts);
router.post('/', controller.createAlert);
router.put('/:id', controller.updateAlert);
router.delete('/:id', controller.deleteAlert);

module.exports = router;
