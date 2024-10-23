from app import *
from flask import jsonify ,request
from tablas.modelos.zonas_modelo import *

@app.route('/zonas',methods=['GET'])
def get_Zonas():
    all_zonas=Zonas.query.all()
    result=zonas_schema.dump(all_zonas)
    return jsonify(result)


@app.route('/zonas/<id>',methods=['GET'])
def get_zona(id):
    zona=Zonas.query.get(id)
    return zona_schema.jsonify(zona)


@app.route('/zonas/<id>',methods=['DELETE'])
def delete_zona(id):
    zona=Zonas.query.get(id)
    db.session.delete(zona)
    db.session.commit()
    return zona_schema.jsonify(zona)

@app.route('/zonas', methods=['POST'])
def create_zona():
    id=request.json['id']
    nombreg=request.json['nombreg']
    new_zona=Zonas(id,nombreg)
    db.session.add(new_zona)
    db.session.commit()
    return zona_schema.jsonify(new_zona)

@app.route('/zonas/<id>',methods=['PUT'])
def update_zona(id):
    zona=Zonas.query.get(id)
    zona.nombreg=request.json['nombreg']
    db.session.commit()
    return zona_schema.jsonify(zona)
