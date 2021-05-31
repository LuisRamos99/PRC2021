var axios = require('axios')

var prefixes = `
    prefix : <http://prc.di.uminho.pt/2021/myfamily#> 
    prefix owl: <http://www.w3.org/2002/07/owl#> 
    prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> 
    prefix xml: <http://www.w3.org/XML/1998/namespace> 
    prefix xsd: <http://www.w3.org/2001/XMLSchema#> 
    prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#> 
`


var query = `
construct {
    ?i1 :irmao ?i2.
    ?i2 :irmao ?i1.
}
where {
    ?i1 :temProgenitor ?pai.
    ?i2 :temProgenitor ?pai.
    ?i1 :temProgenitor ?mae.
    ?i2 :temProgenitor ?mae.
    FILTER (?i1 != ?i2)
    FILTER (?mae != ?pai)   
}`


var encoded = encodeURIComponent(prefixes+query)

axios.get("http://localhost:7200/repositories/teste2021?query=" + encoded)
.then(dados => {
    list = dados.data.split('\n')
    list.forEach(triplo => {
        var query2 =`insert {${triplo}}`
        var encoded2 = encodeURIComponent(prefixes+query2)
        
        axios.get("http://localhost:7200/repositories/teste2021?query=" + encoded2)
            .then(() => {
                console.log("Inserido com sucesso")
            })
            .catch(erro => console.log(erro))
    });
})
.catch(erro => console.log(erro))