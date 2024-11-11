from app import db,ma,app

class Parques(db.Model):
    id=db.Column(db.Integer, primary_key=True)
    nombre=db.Column(db.String(100))
    visitantes=db.Column(db.Integer)
    zona=db.Column(db.Integer, db.ForeignKey('zonas.id'))
    imagen=db.Column(db.String(400))
    def __init__(self,nombre,visitantes,zona,imagen):
        self.nombre=nombre 
        self.visitantes=visitantes
        self.zona=zona
        self.imagen=imagen

with app.app_context():
    db.create_all()
class ParquesSchema(ma.Schema):
    class Meta:
        fields=('id','nombre','visitantes','nombreg','imagen','zona')

parque_schema=ParquesSchema()
parques_schema=ParquesSchema(many=True)
