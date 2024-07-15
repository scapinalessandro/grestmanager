var express = require('express');
var router = express.Router();

const pool = require('../modules/mdb_module')

/* GET home page. */
router.get('/', async function(req, res, next) {
  res.render('index', { title: 'Gestione Grest', respname: 'Rossi Mario'});
});

module.exports = router;