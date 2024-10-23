from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
app=Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI']='mysql+pymysql://root@localhost/parques'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS']=False
db= SQLAlchemy(app)
ma=Marshmallow(app)

from tablas.controladores.parques_controlador import *
from tablas.controladores.zonas_controlador import *

from tablas.controladores.usuarios_controlador import *

if __name__=='__main__':
    app.run(debug=True, port=5000)
