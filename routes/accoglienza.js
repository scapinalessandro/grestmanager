var express = require('express');
var router = express.Router();

const pool = require('../modules/mdb_module')

var bambini;

router.get('/', async function(req, res, next) {
  res.render('accoglienza', { title: 'Menù accoglienza'});
});

/* GET home page. */
router.get('/entrata', async function(req, res, next) {
  var squ = await pool.query("SELECT * FROM squadre");
  var d = [];
  let reqdate = new Date();

  if(req.query.date){
    reqdate = new Date(req.query.date);
  }

  for(const i in squ) {
    var bam = await pool.query(`SELECT bambini.id,  bambini.nome, bambini.cognome, bambini.squadra, bambini.data_di_nascita FROM bambini LEFT JOIN io ON io.id_bambino = bambini.id AND DATE(io.dataora) = DATE(?) AND io.inout_acc="in" WHERE io.dataora IS NULL AND bambini.squadra = ${squ[i].id} ORDER BY cognome, nome`, [reqdate]);
    d.push([squ[i], bam]);
  }
  res.render('accoglienzaio', { title: 'Entrata bambini', data: d, currentdate: reqdate.toLocaleDateString("en-CA")});
});

router.get('/uscita', async function(req, res, next) {
  var squ = await pool.query("SELECT * FROM squadre");
  var d = [];
  let reqdate = new Date();

  if(req.query.date){
    reqdate = new Date(req.query.date);
  }

  for(const i in squ) {
    var bam = await pool.query(`SELECT bambini.id,  bambini.nome, bambini.cognome, bambini.squadra, bambini.data_di_nascita FROM bambini LEFT JOIN io ON io.id_bambino = bambini.id WHERE io.dataora IS NOT NULL AND bambini.squadra = ${squ[i].id} AND DATE(io.dataora) = DATE(?) AND io.inout_acc="in" ORDER BY cognome, nome`, [reqdate]);
    d.push([squ[i], bam]);
  }
  res.render('accoglienzaio', { title: 'Entrata bambini', data: d, currentdate: reqdate.toLocaleDateString("en-CA")});
});
  

module.exports = router;
