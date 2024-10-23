from app import db,ma,app

class Parques(db.Model):   
    id=db.Column(db.Integer, primary_key=True)  
    nombre=db.Column(db.String(100))
    anio=db.Column(db.Date)
    zona=db.Column(db.Integer, db.ForeignKey('zonas.id'))
    imagen=db.Column(db.String(400))
    def __init__(self,nombre,anio,zona,consola,imagen):
        self.nombre=nombre 
        self.anio=anio
        self.zona=zona
        self.consola=consola
        self.imagen=imagen

with app.app_context():
    db.create_all() 
class ParquesSchema(ma.Schema):
    class Meta:
        fields=('id','nombre','anio','nombreg','nombrec','imagen','zona')

parques_schema=ParquesSchema()
parques_schema=ParquesSchema(many=True)
