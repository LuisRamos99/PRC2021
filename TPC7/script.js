const data = require('./mapa_virtual.json')
const fs = require('fs')

let cidades = data.cidades
let ligacoes  = data.ligações


cidades.forEach(cidade => {
    let individual = 
`###  http://www.di.uminho.pt/prc2021/mapa_virtual#${cidade.id}
:${cidade.id} rdf:type owl:NamedIndividual ,
             :Cidade ;
    :descricao "${cidade.descrição}" ;
    :distrito "${cidade.distrito}";
    :nome "${cidade.nome}" ;
    :populacao ${cidade.população} .         

`
    fs.appendFileSync('./output_js.ttl',individual)
})

/*
###  http://www.di.uminho.pt/prc2021/mapa_virtual#c1
:c1 rdf:type owl:NamedIndividual ,
             :Cidade ;
    :descricao "Occaecat labore quis et irure nulla Lorem. Exercitation excepteur tempor est ex incididunt sunt id veniam culpa reprehenderit. Qui culpa consectetur quis officia ipsum deserunt cupidatat fugiat. Aute aliquip non sit laborum cillum." ;
    :distrito "Porto" ;
    :nome "Paços de Ferreira" ;
    :populacao 400888 .
*/


ligacoes.forEach(ligacao => {
    let individual = 
`###  http://www.di.uminho.pt/prc2021/mapa_virtual#${ligacao.id}
:${ligacao.id} rdf:type owl:NamedIndividual ,
             :Ligacao ;
    :temComoDestino :${ligacao.destino} ;
    :temOrigemEm :${ligacao.origem} ;  
    :distancia ${ligacao.distância} .       

`
    fs.appendFileSync('./output_js.ttl',individual)
})

/*
###  http://www.di.uminho.pt/prc2021/mapa_virtual#l1
:l1 rdf:type owl:NamedIndividual ,
             :Ligacao ;
    :temComoDestino :c1 ;
    :temOrigemEm :c1 ;
    :distancia 88.241 .
*/

