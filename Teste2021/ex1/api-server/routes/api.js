var express = require('express');
var router = express.Router();
var axios = require('axios')



var prefixes = `
    prefix : <http://www.di.uminho.pt/prc2021/emds#> 
    prefix owl: <http://www.w3.org/2002/07/owl#> 
    prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> 
    prefix xml: <http://www.w3.org/XML/1998/namespace> 
    prefix xsd: <http://www.w3.org/2001/XMLSchema#> 
    prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#> 
`


router.get('/emd', function(req, res, next) {
  
  if (req.query.res=="OK") {
    var query = `SELECT ?s WHERE { ?s rdf:type :EMD ; :resultado ?r . FILTER regex (str(?r), "True")}`
    var encoded = encodeURIComponent(prefixes+query)
  }
  else {
    var query = `SELECT ?id ?data ?r ?pn ?un WHERE { ?s rdf:type :EMD ; :id ?id ; :data ?data ; :resultado ?r . ?a rdf:type :Atleta . ?s :referenteA ?a . ?a :primeiroNome ?pn ; :ultimoNome ?un .}`
    var encoded = encodeURIComponent(prefixes+query)
  }
  
  axios.get("http://localhost:7200/repositories/EMD?query=" + encoded)
      .then(dados => {
          res.json(dados.data.results.bindings)
      })
      .catch(erro => console.log(erro))
});


router.get('/emd/:id', function(req, res, next) {
  console.log(req.params.id)
  var query = `SELECT * WHERE { ?s rdf:type :EMD . ?s :id "${req.params.id}"}`
  var encoded = encodeURIComponent(prefixes+query)

  axios.get("http://localhost:7200/repositories/EMD?query=" + encoded)
      .then(dados => {
          res.json(dados.data.results.bindings)
      })
      .catch(erro => console.log(erro))
});



router.get('/modalidades', function(req, res, next) {
  var query = `SELECT * WHERE { ?s rdf:type :Modalidade . }`
  var encoded = encodeURIComponent(prefixes+query)

  axios.get("http://localhost:7200/repositories/EMD?query=" + encoded)
      .then(dados => {
          res.json(dados.data.results.bindings)
      })
      .catch(erro => console.log(erro))
});


router.get('/modalidades/:id', function(req, res, next) {
    var query = `SELECT * WHERE { ?s rdf:type :Modalidade . ?s :id "${req.params.id}" }`
    var encoded = encodeURIComponent(prefixes+query)
  
    axios.get("http://localhost:7200/repositories/EMD?query=" + encoded)
        .then(dados => {
            res.json(dados.data.results.bindings)
        })
        .catch(erro => console.log(erro))
  });
  


router.get('/atletas', function(req, res, next) {
    
    if (req.query.gen=="F") {
        var query = `SELECT ?pn WHERE { ?s rdf:type :Atleta ; :primeiroNome ?pn ; :genero ?f . FILTER regex (str(?f), "F")} order by(?pn)`
        var encoded = encodeURIComponent(prefixes+query)
      }
    else if (req.query.clube){
        var clube = req.query.clube
        var query = `SELECT ?pn WHERE { ?a rdf:type :Atleta ; :primeiroNome ?pn ; :pertenceA ?clube . ?clube rdf:type :Clube . FILTER regex (str(?clube), "${clube}")} order by(?pn)`
        var encoded = encodeURIComponent(prefixes+query)
      }

  axios.get("http://localhost:7200/repositories/EMD?query=" + encoded)
      .then(dados => {
          res.json(dados.data.results.bindings)
      })
      .catch(erro => console.log(erro))
});


module.exports = router;
