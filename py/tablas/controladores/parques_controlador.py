from app import *
from flask import jsonify ,request
from tablas.modelos.parques_modelo import *
from tablas.modelos.zonas_modelo import *

@app.route('/parques',methods=['GET'])
def get_Parques():
    all_parques=Parques.query\
        .join(Zonas, Parques.zona== Zonas.id)\
            .add_columns(Parques.id, Parques.nombre, Parques.anio, Zonas.nombreg, Parques.imagen)\
            .filter(Parques.zona == Zonas.id)
    result=parques_schema.dump(all_parques)
    return jsonify(result)

@app.route('/parques/<id>',methods=['GET'])
def get_parque(id):
    parque=Parques.query.get(id)
    return parques_schema.jsonify(parque)


@app.route('/parques/<id>',methods=['DELETE'])
def delete_parque(id):
    parque=Parques.query.get(id)
    db.session.delete(parque)
    db.session.commit()
    return parques_schema.jsonify(parque)

@app.route('/parques', methods=['POST'])
def create_parque():
    nombre=request.json['nombre']
    anio=request.json['anio']
    zona=request.json['zona']
    imagen=request.json['imagen']
    new_parque=Parques(nombre,anio,zona,imagen)
    db.session.add(new_parque)
    db.session.commit()
    return parques_schema.jsonify(new_parque)

@app.route('/parques/<id>' ,methods=['PUT'])
def update_parque(id):
    parque=Parques.query.get(id)
    parque.nombre=request.json['nombre']
    parque.anio=request.json['anio']
    parque.zona=request.json['zona']
    parque.imagen=request.json['imagen']
    db.session.commit()
    return parques_schema.jsonify(parque)