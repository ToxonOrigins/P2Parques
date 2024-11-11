from app import db,ma,app

class Zonas(db.Model):
    id=db.Column(db.Integer, primary_key=True)
    nombreg= db.Column(db.String(50))
    def __init__(self,id,nombreg):
        self.id=id
        self.nombreg=nombreg

with app.app_context():
    db.create_all()
class ZonasSchema(ma.Schema):
    class Meta:
        fields=('id','nombreg')

zona_schema=ZonasSchema()
zonas_schema=ZonasSchema(many=True)
