var express = require('express');
var router = express.Router();
var passport = require('passport');
var indexAccessDb = require('../../models/index/indexAccessDb');
 
router.post('/search-randomPostShops', function(req, res, next) {
	indexAccessDb.searchRandomPostShops(req.body, function(result, err) {
			if(!err) {
				res.json({
					randomPostShops: result,
				});
			}
			else {
				console.log("erreur");
			}
	});
	
});

router.post('/search-randomNeedShops', function(req, res, next) {
	indexAccessDb.searchRandomNeedShops(req.body, function(result, err) {
			if(!err) {
				res.json({
					randomNeedShops: result,
				});
			}
			else {
				console.log("erreur");
			}
	});
	
});


module.exports = router;