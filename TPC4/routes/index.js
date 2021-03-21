var express = require('express');
var axios = require('axios')
var router = express.Router();

var rep = "prc2021-tpc4"
var pre = "PREFIX : <http://www.daml.org/2003/01/periodictable/PeriodicTable#>"


router.get('/', function(req, res, next) {
  res.render('index', { title: 'Repositorio Tabela Periodica' });
}); 


router.get('/repositorio', function(req, res, next) {  
  var titulo = "Tabela Periodica"
  res.render('repositorio', {tit: titulo }) 
})


router.get('/repositorio/elementos', function(req, res, next) {  
  var getLink = "http://localhost:7200/repositories/"+rep+"?query=" 
  var query = `select * where {?s a :Element}`
  var encoded = encodeURIComponent(pre+query)

  axios.get(getLink + encoded)
    .then(dados => {
      res.render('elementos', {elementos: dados.data.results.bindings}) 
    })    
    .catch(e => res.render('error', {error: e}))  
})


router.get('/repositorio/elemento/:id', function(req, res, next) {  
  var getLink = "http://localhost:7200/repositories/"+rep+"?query=" 
  var query = `select * where {:`+req.params.id+`?p ?o}`
  var encoded = encodeURIComponent(pre+query)

  axios.get(getLink + encoded)
    .then(dados => {
        res.render('elemento', {lista: dados.data.results.bindings, id: req.params.id}) 
    })    
    .catch(e => res.render('error', {error: e}))  
})


router.get('/repositorio/grupos', function(req, res, next) {  
  var getLink = "http://localhost:7200/repositories/"+rep+"?query=" 
  var query = `select * where {?s a :Group}`
  var encoded = encodeURIComponent(pre+query)

  axios.get(getLink + encoded)
    .then(dados => {
      res.render('grupos', {grupos: dados.data.results.bindings}) 
    })    
    .catch(e => res.render('error', {error: e}))  
})


router.get('/repositorio/grupo/:id', function(req, res, next) {  
  var getLink = "http://localhost:7200/repositories/"+rep+"?query=" 
  var query = `select * where {:`+req.params.id+`?p ?o}`
  var encoded = encodeURIComponent(pre+query)

  axios.get(getLink + encoded)
    .then(dados => {
        res.render('grupo', {lista: dados.data.results.bindings, id: req.params.id}) 
    })    
    .catch(e => res.render('error', {error: e}))  
})



router.get('/repositorio/periodos', function(req, res, next) {  
  var getLink = "http://localhost:7200/repositories/"+rep+"?query=" 
  var query = `select * where {?s a :Period}`
  var encoded = encodeURIComponent(pre+query)

  axios.get(getLink + encoded)
    .then(dados => {
      res.render('periodos', {periodos: dados.data.results.bindings}) 
    })    
    .catch(e => res.render('error', {error: e}))  
})


router.get('/repositorio/periodo/:id', function(req, res, next) {  
  var getLink = "http://localhost:7200/repositories/"+rep+"?query=" 
  var query = `select * where {:`+req.params.id+`?p ?o}`
  var encoded = encodeURIComponent(pre+query)

  axios.get(getLink + encoded)
    .then(dados => {
        res.render('periodo', {lista: dados.data.results.bindings, id: req.params.id}) 
    })    
    .catch(e => res.render('error', {error: e}))  
})










module.exports = router;
