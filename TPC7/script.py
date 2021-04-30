import json

with open('mapa_virtual.json', encoding='UTF-8') as f:
  data = json.load(f)


def writeCidades(f):
    for cidade in data['cidades']:
        string = f"""
###  http://www.di.uminho.pt/prc2021/mapa_virtual#{cidade['id']} 
:{cidade['id']} rdf:type owl:NamedIndividual ,
             :Cidade ;
    :descricao "{cidade['descrição']}" ;
    :distrito "{cidade['distrito']}" ;
    :nome "{cidade['nome']}" ;
    :populacao {cidade['população']} .
"""
        f.write(string)
        

"""
###  http://www.di.uminho.pt/prc2021/mapa_virtual#c1
:c1 rdf:type owl:NamedIndividual ,
             :Cidade ;
    :descricao "Occaecat labore quis et irure nulla Lorem. Exercitation excepteur tempor est ex incididunt sunt id veniam culpa reprehenderit. Qui culpa consectetur quis officia ipsum deserunt cupidatat fugiat. Aute aliquip non sit laborum cillum." ;
    :distrito "Porto" ;
    :nome "Paços de Ferreira" ;
    :populacao 400888 .
"""




def writeLigacoes(f):
    for ligacao in data['ligações']:
        f.write("###  http://www.di.uminho.pt/prc2021/mapa_virtual#"+ligacao['id']+"\n")
        f.write(":"+ligacao['id']+" rdf:type owl:NamedIndividual ,\n")
        f.write("\t\t\t :Ligacao ;\n")
        f.write('\t:temComoDestino :'+ligacao['destino']+' ;\n')
        f.write('\t:temOrigemEm :'+ligacao['origem']+' ;\n')
        f.write('\t:distancia '+str(ligacao['distância'])+' .\n\n')

""""
###  http://www.di.uminho.pt/prc2021/mapa_virtual#l1
:l1 rdf:type owl:NamedIndividual ,
             :Ligacao ;
    :temComoDestino :c1 ;
    :temOrigemEm :c1 ;
    :distancia 88.241 .
"""


with open('output_py.ttl', 'w', encoding='UTF-8') as f:
    writeCidades(f)
    writeLigacoes(f)



