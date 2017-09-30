var express = require('express'),
    router = express.Router();

router.use('/api/v1.0', require('./recipe'));

module.exports = router;