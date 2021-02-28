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
        file+= '\n###  http://www.di.uminho.pt/prc2021/uc#' + p._id + '\n' + ':' + p._id + ' ' + 'rdf:type owl:NamedIndividual' + ' ;' + '\n'
        var count = 1
        p.ensina.forEach(e => {
            if (count == p.ensina.length) file+= '\t' + ':ensina' + ' :' + e + ' ;' + '\n'
            else {
                file+= + '\t' + ':ensina' + ' :' + e + ' ,' 
                count++
            }
        })
        file+= '\t' + ':nome "' +p.nome + '"  .' + '\n\n'
    })
    return file
}



function writeUcs() {
    var file = ''
    ucs.ucs.forEach(u => {
        file+= '###  http://www.di.uminho.pt/prc2021/uc#' + u._id + '\n' + ':' + u._id + ' ' + 'rdf:type owl:NamedIndividual' + ' ,' + '\n'
        file+= '\t\t\t ' + ':UnidadeCurricular ;' + '\n' + '\t' + ':anoLetivo ' + u.anoLetivo + ' ;' + '\n' + '\t' + ':designacao "' + u.designação +'" .' + '\n\n'
    })
    return file
}


function writeAlunos() {
    var file = ''
    alunos.alunos.forEach(a => {
        file+= '\n###  http://www.di.uminho.pt/prc2021/uc#' + a._id + '\n' + ':' + a._id + ' ' + 'rdf:type owl:NamedIndividual' + ' ;' + '\n'
        var count = 1
        a.frequenta.forEach(f => {
            if (count==1 && count == a.frequenta.length) file+= '\t' + ':frequenta ' + ' :' + f + ' ;\n'
            else if (count==1) {
                file+= '\t' + ':frequenta ' + ' :' + f + ' ,\n'
                count++
            }
            else if (count==a.frequenta.length) file+= '\t\t\t\t' + ':' + f + ' ;' + '\n'
            else {
                file+= '\t\t\t\t' + ':' + f + ' ,\n'
                count++
            }
        })
        file+= '\t' + ':nome "' +a.nome + '"  .' + '\n\n'
    })
    return file
}