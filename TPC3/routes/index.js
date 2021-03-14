var express = require('express');
var axios = require('axios')
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Repositorios GraphDB' });
}); 


router.get('/repositorios', function(req, res, next) {  
  axios.get("http://localhost:7200/rest/repositories")
    .then(dados => { 
        repos = dados.data.map( r => {    
            return({
                id: r.id,
                tit: r.title,
                uri: r.uri
            })
        })
        res.render('repositorios', {lista: repos})  
    })
    .catch(e => res.render('error', {error: e}))
})


router.get('/repositorio/:id', function(req, res, next) {  
  var getLink = "http://localhost:7200/repositories/" + req.params.id + "?query=" 
  var query = `select * where {?s rdf:type owl:Class}`
  var encoded = encodeURIComponent(query)

  axios.get(getLink + encoded)
    .then(dados => {
      res.render('repositorio', {rep: dados.data.results.bindings, id: req.params.id}) 
    })    
    .catch(e => res.render('error', {error: e}))  
})


router.get('/repositorio/:id/:classe', function(req, res, next) {  
  var getLink = "http://localhost:7200/repositories/" + req.params.id + "?query=" 
  var query = `select * where {?s rdf:type owl:Class}`
  var encoded = encodeURIComponent(query)

  axios.get(getLink + encoded)
    .then(dados => {
      dados.data.results.bindings.forEach( elem => {
        if (req.params.classe == elem.s.value.split("#")[1]) {
          var query2 = `select * where {?s rdf:type <${elem.s.value}>}`
          var encoded2 = encodeURIComponent(query2)
          axios.get(getLink + encoded2)
            .then(dados => {
              dados.data.results.bindings.forEach(elem => {
                elem.s.value = elem.s.value.replace(/_/g," ")
              })
              res.render('individuos', {lista: dados.data.results.bindings, classe: req.params.classe,id: req.params.id})
            })
            .catch(e => res.render('error', {error: e})) 
        }
      })     
    })    
    .catch(e => res.render('error', {error: e}))  
})


router.get('/repositorio/:id/:classe/:individuo', function(req, res, next) {  
  var getLink = "http://localhost:7200/repositories/" + req.params.id + "?query=" 
  var query = `select * where {?s rdf:type owl:Class}`
  var encoded = encodeURIComponent(query)

  axios.get(getLink + encoded)
    .then(dados => {
      dados.data.results.bindings.forEach( elem => {
        if (req.params.classe == elem.s.value.split("#")[1]) {

          var query2 = `select * where {?s rdf:type <${elem.s.value}>}`
          var encoded2 = encodeURIComponent(query2)

          axios.get(getLink + encoded2)
            .then(dados => {
              dados.data.results.bindings.forEach(elem => {
                if (req.params.individuo == elem.s.value.split("#")[1]) {

                  var query3 = `select * where {<${elem.s.value}> ?p ?o}`
                  var encoded3 = encodeURIComponent(query3)

                  axios.get(getLink + encoded3)
                    .then(dados => {
                      console.log(dados.data.results.bindings)
                      res.render('individuo', {lista: dados.data.results.bindings, individuo: req.params.individuo})
                    })
                    .catch(e => res.render('error', {error: e}))  
                }
              })
            })
            .catch(e => res.render('error', {error: e})) 
        }
      })     
    })    
    .catch(e => res.render('error', {error: e}))  
})





module.exports = router;
