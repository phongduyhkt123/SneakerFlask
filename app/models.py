from sqlalchemy import Column, Integer, String, Float, ForeignKey, NVARCHAR, DateTime, Date
from sqlalchemy.orm import relationship


class Flights(db.Model):
    id = Column(Integer, primary_key=True, autoincrement=True)
    takeOffTime = Column(DateTime, nullable=False)
    flightTime = Column(Float, nullable=False)
    noBusinessClass = Column(Integer, nullable=False)
    noEconomyClass = Column(Integer, nullable=False)

    priceBusinessClass = Column(Float, nullable=False)
    priceEconomyClass = Column(Float, nullable=False)

    idStartAirport = Column(Integer, ForeignKey(Airports.id), nullable=False)
    idDestinationAirport = Column(Integer, ForeignKey(Airports.id), nullable=False)

    startAirport = relationship('Airports', backref='outcommingFlights', foreign_keys=[idStartAirport], lazy=True)
    destinationAirport = relationship('Airports', backref='incommingFlights', foreign_keys=[idDestinationAirport], lazy=True)

    bookDetails = relationship('BookDetails', backref='flight', lazy=True)
    stopover_flights = relationship('StopoverDetails', backref='flight', lazy=True)

    def __str__(self):
        return 'Id flight ' + str(self.id)

if __name__ == '__main__':
    db.create_all()