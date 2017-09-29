var express = require('express'),
    router = express.Router();

router.use('/recipe', require('./recipe'));

module.exports = router;