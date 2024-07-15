var express = require('express');
const pool = require('../modules/mdb_module');

var router = express.Router();

router.post('/setio', async function(req, res, next) {
    res.setHeader('Content-Type', 'application/json');
    
    // viene inserita l'entrata nella tabella io
    await pool.query(`INSERT INTO io VALUES (DEFAULT, ${req.body.id}, 'in', NOW());`)
    res.send('{"success" : "Updated Successfully", "status" : 200}');
});

module.exports = router;