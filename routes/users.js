var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
	res.send('respond with a resource');
});

router.get('/tamere', function(req, res, next) {
	res.send("yolo");
});

module.exports = router;
