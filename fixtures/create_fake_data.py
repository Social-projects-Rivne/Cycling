# -*- coding: utf-8 -*-

"""This script fill the DB with dummy objects
which are needed for testing

How to use:
cd <project folder>
python manage.py shell < <path_to_this_file>"""
from datetime import date, timedelta
import random

from APP.models.attachments import Attachment
from APP.models.bicycles import Bicycle
from APP.models.images import Image
from APP.models.parkings import Parking
from APP.models.places import Place
from APP.models.stolen_bikes import StolenBike
from APP.models.users import User

from fixtures.MOCK_ADDRESSES import LIST as addresses
from fixtures.MOCK_BICYCLES import LIST as bicycles
from fixtures.MOCK_PLACES import LIST as places
from fixtures.MOCK_USERS import LIST as users


users_list = []
for user in users:
    u = User(
             full_name=user['full_name'],
             email=user['email'],
             password=user['password'],
             is_active=True,
             avatar=user['avatar'],
             role_id=0,
        )
    u.save()
    users_list.append(u)

bicycles_list = []
for bike in bicycles:
    b = Bicycle(
                name=bike['name'],
                description=bike['description'],
                owner=random.choice(users_list),
        )
    b.save()
    bicycles_list.append(b)

bike_images = [
               'http://brimages.bikeboardmedia.netdna-cdn.com/wp-content/uploads/2016/04/framed-marquette-carbon-bike-x1-build-white-black-16.jpg',
               'http://ecx.images-amazon.com/images/I/81JDpmNBBQL._SL1500_.jpg',
               'http://www.dickssportinggoods.com/graphics/product_images/pDSP1-19775237v750.jpg',
               'http://www.republicbike.com/images/republic_gbike_angle.png',
               'http://bikes.urbanoutfitters.com/images/gallery_aristotle_mixte.jpg',
               'https://www.divvybikes.com/assets/images//branded_bike.png',
               'http://salsacycles.com/files/bikes/bikes_Mukluk2_2013.jpg',
               'http://road.cc/sites/default/files/styles/main_width/public/specialized-s-works-tarmac-disc-di2-2016-road-bike.jpg?itok=LJd-nlEL',
               'http://dartmoor-bikes.com/sites/default/files/hardware/product/bike-rikku.jpg',
               'http://bakersbikes.com/images/slideshows/79.jpg',
    ]

for bike in bicycles_list:
    i = Image(
              url=random.choice(bike_images),
              bike=bike,
        )
    i.save()

def rand_lat():
    return random.randrange(50601, 50633, 1) * 0.001

def rand_lng():
    return random.randrange(262105, 262860, 1) * 0.0001

for i in xrange(50):
    b = StolenBike(
                description=random.choice(bicycles)['description'],
                lat=rand_lat(),
                lng=rand_lng(),
                day=date.today() - timedelta(days=random.choice(range(1,40))),
                is_found=random.choice([True, False]),
                bike=random.choice(bicycles_list),
        )
    b.save()

parkings_list = []
for i in xrange(10000):    
    p = Parking(
                name=addresses[i]['name'],
                lat=rand_lat(),
                lng=rand_lng(),
                security=random.choice(['0', '1', '2']),
                amount=random.choice([1, 2, 3, 4, 5, 6, 7, 8]),
                is_free=random.choice([True, False]),
                owner=random.choice(users_list),
                )
    p.save()
    parkings_list.append(p)

places_list = []
for i in xrange(200):    
    p = Place(
                name=places[i]['name'],
                lat=rand_lat(),
                lng=rand_lng(),
                description=random.choice(bicycles)['description'],
                from_hour=random.choice(range(7,12)),
                to_hour=random.choice(range(17,24)),
                owner=random.choice(users_list),
                )
    p.save()
    places_list.append(p)

for i in xrange(10000):
    a = Attachment(
                   image_url=random.choice(users)['avatar'],
                   parking=random.choice(parkings_list),
                   place=random.choice(places_list),
                   )
    a.save()

