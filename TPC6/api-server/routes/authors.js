var express = require('express');
var router = express.Router();
var axios = require('axios')


var prefixes = `
    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
    PREFIX owl: <http://www.w3.org/2002/07/owl#>
    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
    PREFIX noInferences: <http://www.ontotext.com/explicit>
    PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
    PREFIX : <http://www.di.uminho.pt/prc2021/a83930/tpc5#>
`

//buscar os authors
router.get('/', function(req, res, next) {
  var link = "http://epl.di.uminho.pt:8738/api/rdf4j/query/A83930-tp5?query=" 
  var query = `SELECT ?s ?name (COUNT(?pub) AS ?total) WHERE { ?s rdf:type :Author . ?s :name ?name. ?s :autora ?pub. } GROUP BY ?s ?name ORDER BY ?s`;
  var encoded = encodeURIComponent(prefixes + query)
  axios.get(link + encoded)
    .then(dados =>res.send(dados.data))
    .catch(err => {
      res.status(500).jsonp(err);
   })
});


//buscar o author com determinado id
router.get('/:id', function(req, res){
  var link = "http://epl.di.uminho.pt:8738/api/rdf4j/query/A83930-tp5?query=" 
  var query = `select * where {: ${req.params.id} ?p ?o}`
  var encoded = encodeURIComponent(prefixes + query)
  axios.get(link + encoded)
    .then(dados => res.send(dados.data))
    .catch(err => {
      res.status(500).jsonp(err);
   })
})


//buscar as pubs de um autor com determinado id
router.get('/:id/pubs', function(req, res, next) {
  var link = "http://epl.di.uminho.pt:8738/api/rdf4j/query/A83930-tp5?query=" 
  var query = `SELECT ?pub ?title ?year ?type WHERE {:${req.params.id} :autora ?pub . ?pub :title ?title . ?pub :year ?year. ?type rdfs:subClassOf :Publicacao . ?pub rdf:type ?type. } ORDER BY (?pub)`
  var encoded = encodeURIComponent(prefixes + query)
  axios.get(link + encoded)  
    .then(dados => res.send(dados.data))
    .catch(err => {
      res.status(500).jsonp(err);
   })
});


//adcionar um novo author
router.post('/', function(req, res){
  var link = "http://epl.di.uminho.pt:8738/api/rdf4j/update/A83930-tp5?query=" 
  var query = `INSERT DATA { ${req.body} }` 
  var encoded = encodeURIComponent(prefixes + query)
  axios.post(link +  encoded)
    .then(dados => res.send(dados.data))
    .catch(err => {
       res.status(500).jsonp(err);
    })
})


//remover um author com determinado id
router.delete('/:id', function(req, res){
  var link = "http://epl.di.uminho.pt:8738/api/rdf4j/update/A83930-tp5?query=" 
  var query = `DELETE DATA { :${req.params.id} a :Author . }`
  var encoded = encodeURIComponent(prefixes + query);
  axios.post(link +  encoded)
    .then(dados => res.send(dados.data))
    .catch(err => {
       res.status(500).jsonp(err);
    })
})


//editar um author com determinado id
router.put('/:id', function(req, res){
  var link = "http://epl.di.uminho.pt:8738/api/rdf4j/update/A83930-tp5?query=" 
  var query = `DELETE DATA { :${req.params.id} a :Author . }`
  var encoded = encodeURIComponent(prefixes + query);
  axios.post(link +  encoded)
    .then(() => {
      var query = `INSERT DATA { ${req.body} }` 
      var encoded = encodeURIComponent(prefixes + query)
      axios.post(link +  encoded)
        .then(dados => res.send(dados.data))
        .catch(err => {
           res.status(500).jsonp(err);
        })
    })
    .catch(err => {
       res.status(500).jsonp(err);
    })
})









module.exports = router;
