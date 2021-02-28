var alunos = require('./alunos.json');
var professores = require('./professores.json');
var ucs = require('./ucs.json');

var fs = require('fs');

var file = writeProfessores()
file += writeUcs()
file += writeAlunos()

fs.writeFile('ontologia.ttl', file, function (err) {
    if (err) throw err;
    console.log('Convertido com sucesso!');
  });

function writeProfessores() {
    var file = ''
    professores.professores.forEach(p => {
        file+= '<http://www.di.uminho.pt/prc2021/uc#' + p._id+ '> '
        file+= 'rdf:type owl:NamedIndividual,\n'
        var count = 1
        file+= '                                        <http://www.di.uminho.pt/prc2021/uc#ensina> '
        p.ensina.forEach(e => {
            if (count == p.ensina.length) file+= '<http://www.di.uminho.pt/prc2021/uc#' + e + '> ;\n'
            else {
                file+= '<http://www.di.uminho.pt/prc2021/uc#' + e + '> , '
                count++
            }
        })
        file+= '                                        <http://www.di.uminho.pt/prc2021/uc#nome> "' + p.nome + '" .\n\n\n'
    })
    return file
}

function writeUcs() {
    var file = ''
    ucs.ucs.forEach(u => {
        file+= '<http://www.di.uminho.pt/prc2021/uc#' + u._id+ '> '
        file+= 'rdf:type owl:NamedIndividual,\n'
        file+= '                                             <http://www.di.uminho.pt/prc2021/uc#anoLetivo> "' + u.anoLetivo + '" ;\n'
        file+= '                                             <http://www.di.uminho.pt/prc2021/uc#designação> "' + u.designação + '" .\n\n\n'
    })
    return file
}

function writeAlunos() {
    var file = ''
    alunos.alunos.forEach(a => {
        file+= '<http://www.di.uminho.pt/prc2021/uc#' + a._id+ '> '
        file+= 'rdf:type owl:NamedIndividual,\n'
        var count = 1
        file+= '                                        <http://www.di.uminho.pt/prc2021/uc#frequenta> '
        a.frequenta.forEach(f => {
            if (count == a.frequenta.length) file+= '<http://www.di.uminho.pt/prc2021/uc#' + f + '> ;\n'
            else {
                file+= '<http://www.di.uminho.pt/prc2021/uc#' + f + '> , '
                count++
            }
        })
        file+= '                                        <http://www.di.uminho.pt/prc2021/uc#nome> "' + a.nome + '" .\n\n\n'
    })
    return file
}