from app import *
from flask import jsonify ,request
from tablas.modelos.usuarios_modelo import *

@app.route('/usuarios',methods=['GET'])
def get_Usuarios():
    all_usuarios=Usuarios.query.all()      
    result=usuarios_schema.dump(all_usuarios)
    return jsonify(result)        

@app.route('/usuarios/<id>',methods=['GET'])
def get_usuarios(id):
    usuario=Usuarios.query.get(id)
    return usuario_schema.jsonify(usuario)  

@app.route('/usuarios/<id>',methods=['DELETE'])
def delete_usuario(id):
    usuario=Usuarios.query.get(id)
    db.session.delete(usuario)
    db.session.commit()               
    return usuario_schema.jsonify(usuario) 

@app.route('/usuarios', methods=['POST'])
def create_usuario():
    nombre=request.json['nombre']
    mail=request.json['mail']
    clase=request.json['clase']
    clave=request.json['clave']
    new_usuario=Usuarios(nombre,mail,clase,clave)
    db.session.add(new_usuario)
    db.session.commit()
    return usuario_schema.jsonify(new_usuario)

@app.route('/usuarios/<id>' ,methods=['PUT'])
def update_usuario(id):
    usuario=Usuarios.query.get(id)
    usuario.nombre=request.json['nombre']
    usuario.mail=request.json['mail']
    usuario.clase=request.json['clase']
    usuario.clave=request.json['clave']
    db.session.commit()   
    return usuario_schema.jsonify(usuario)  
