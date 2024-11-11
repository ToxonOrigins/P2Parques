from app import db,ma,app

class Usuarios(db.Model):
    id=db.Column(db.Integer, primary_key=True)
    nombre=db.Column(db.String(100))
    mail=db.Column(db.String(30))
    clase=db.Column(db.Integer)
    clave=db.Column(db.String(18))
    def __init__(self,nombre,mail,clase,clave):
        self.nombre=nombre 
        self.mail=mail
        self.clase=clase
        self.clave=clave

with app.app_context():
    db.create_all()
class UsuariosSchema(ma.Schema):
    class Meta:
        fields=('id','nombre','mail','clase','clave')
usuario_schema=UsuariosSchema()
usuarios_schema=UsuariosSchema(many=True)
