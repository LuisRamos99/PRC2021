import json



def readJson(name):
    w = open(name, "r", encoding='UTF-8') 
    data = json.load(w)
    w.close()
    return data


def povoa(data,w):
    clubes = []
    modalidades = []
    for obj in data:
        clubes.append(obj['clube'])
        modalidades.append(obj['modalidade'])
        clube = obj['clube'].replace(" ","_")
        string = f"""
###  http://www.di.uminho.pt/prc2021/emds#Atleta_{obj['nome']['primeiro']}_{obj['nome']['último']}
:Atleta_{obj['nome']['primeiro']}_{obj['nome']['último']} rdf:type owl:NameIndividual ,
             :Atleta ;
    :pertenceA :{clube} ;
    :pratica :{obj['modalidade']} ;
    :email "{obj['email']}"  ;
    :federado "{obj['federado']}"^^xsd:boolean ;
    :genero "{obj['género']}" ;
    :idade {obj['idade']} ;
    :morada "{obj['morada']}" ;
    :primeiroNome "{obj['nome']['primeiro']}" ;
    :ultimoNome "{obj['nome']['último']}" .
"""     
        w.write(string)
        string2 = f"""
###  http://www.di.uminho.pt/prc2021/emds#EMD_{obj['_id']}
:EMD_{obj['_id']} rdf:type owl:NameIndividual ,
             :EMD ;
    :referenteA :Atleta_{obj['nome']['primeiro']}_{obj['nome']['último']} ,
                :{obj['modalidade']} ;
    :data "{obj['dataEMD']}"  ;
    :resultado "{obj['resultado']}"^^xsd:boolean ;
    :id "{obj['_id']}" ;
    :index {obj['index']} .
"""     
        w.write(string2)

    for clube in clubes:
        clube = clube.replace(" ","_")
        string3 = f"""
###  http://www.di.uminho.pt/prc2021/emds#{clube}
:{clube} rdf:type owl:NameIndividual ,
             :Clube .
"""     
        w.write(string3)

    for modalidade in modalidades:
        string4 = f"""
###  http://www.di.uminho.pt/prc2021/emds#{modalidade}
:{modalidade} rdf:type owl:NameIndividual ,
             :Modalidade .
"""     
        w.write(string4)




def main():
    data = readJson('emd.json')
    w = open('output.ttl', "w", encoding='UTF-8') 
    povoa(data,w)
    w.close()

main()