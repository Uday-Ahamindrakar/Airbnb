import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HostService {

    MOCK_PROPERTIES = [
  {
    id: 1,
    title: "Sunset Beach Villa",
    description: "A peaceful villa with ocean views and modern interiors.",
    city: "Miami",
    address: "221 Ocean Drive, Miami Beach",
    country: "USA",
    price_per_night: 300,
    max_guest: 8,
    hostId: 5,
    status: "ACTIVE",
    photos: [
      { id: 101, url: "https://images.unsplash.com/photo-1507089947368-19c1da9775ae" },
      { id: 102, url: "https://images.unsplash.com/photo-1507089947368-19c1da9775ae" }
    ]
  },
  {
    id: 2,
    title: "Mountain View Cabin",
    description: "A cozy cabin located in the mountains with stunning views.",
    city: "Denver",
    address: "44 Rocky Road, Denver",
    country: "USA",
    price_per_night: 150,
    max_guest: 4,
    hostId: 3,
    status: "ACTIVE",
    photos: [
      { id: 103, url: "https://images.unsplash.com/photo-1501183638710-841dd1904471" },
      { id: 104, url: "https://images.unsplash.com/photo-1501183638710-841dd1904471?ixid=Mnwx" }
    ]
  },
  {
    id: 3,
    title: "Luxury City Apartment",
    description: "A modern apartment located in the heart of the city.",
    city: "New York",
    address: "12 Manhattan Street, New York",
    country: "USA",
    price_per_night: 450,
    max_guest: 6,
    hostId: 2,
    status: "ACTIVE",
    photos: [
      { id: 105, url: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688" },
      { id: 106, url: "https://images.unsplash.com/photo-1484154218962-a197022b5858" }
    ]
  },
  {
    id: 4,
    title: "Lakeside Cottage",
    description: "A charming cottage beside the lake perfect for a relaxing stay.",
    city: "Seattle",
    address: "88 Lakeview Road, Seattle",
    country: "USA",
    price_per_night: 200,
    max_guest: 5,
    hostId: 4,
    status: "ACTIVE",
    photos: [
      { id: 107, url: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267" },
      { id: 108, url: "https://images.unsplash.com/photo-1481277542470-605612bd2d61" }
    ]
  },
  {
    id: 5,
    title: "Desert Oasis Villa",
    description: "A luxurious oasis villa in the middle of the desert.",
    city: "Phoenix",
    address: "99 Sunset Dunes, Phoenix",
    country: "USA",
    price_per_night: 350,
    max_guest: 10,
    hostId: 6,
    status: "ACTIVE",
    photos: [
      { id: 109, url: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee" },
      { id: 110, url: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750" }
    ]
  },
  {
    id: 6,
    title: "Oceanfront Retreat",
    description: "A beautiful home right in front of the ocean.",
    city: "San Diego",
    address: "7 Pacific Coast Road, San Diego",
    country: "USA",
    price_per_night: 280,
    max_guest: 7,
    hostId: 3,
    status: "ACTIVE",
    photos: [
      { id: 111, url: "https://images.unsplash.com/photo-1505692794403-34d0984388bd" },
      { id: 112, url: "https://images.unsplash.com/photo-1507089947368-19c1da9775ae" }
    ]
  },
  {
    id: 7,
    title: "Forest Treehouse",
    description: "A unique stay experience in a fully furnished treehouse.",
    city: "Oregon",
    address: "10 Forest Circle, Oregon",
    country: "USA",
    price_per_night: 180,
    max_guest: 3,
    hostId: 7,
    status: "ACTIVE",
    photos: [
      { id: 113, url: "https://images.unsplash.com/photo-1449157291145-7efd050a4d0e" },
      { id: 114, url: "https://images.unsplash.com/photo-1505691938895-1758d7feb511" }
    ]
  },
  {
    id: 8,
    title: "Countryside Farmstay",
    description: "A peaceful farm stay surrounded by nature.",
    city: "Texas",
    address: "55 Old Town Road, Dallas",
    country: "USA",
    price_per_night: 120,
    max_guest: 6,
    hostId: 8,
    status: "ACTIVE",
    photos: [
      { id: 115, url: "https://images.unsplash.com/photo-1570129477492-45c003edd2be" },
      { id: 116, url: "https://images.unsplash.com/photo-1501785888041-af3ef285b470" }
    ]
  },
  {
    id: 9,
    title: "Ski Resort Chalet",
    description: "Perfect winter stay with cozy interiors and ski access.",
    city: "Aspen",
    address: "12 Snow Hill Road, Aspen",
    country: "USA",
    price_per_night: 500,
    max_guest: 12,
    hostId: 9,
    status: "ACTIVE",
    photos: [
      { id: 117, url: "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd" },
      { id: 118, url: "https://images.unsplash.com/photo-1532910401242-5dbd2c387bb0" }
    ]
  },
  {
    id: 10,
    title: "Beachside Modern Villa",
    description: "A new modern beach villa with luxurious amenities.",
    city: "Santa Monica",
    address: "33 Beachside Avenue, Santa Monica",
    country: "USA",
    price_per_night: 420,
    max_guest: 8,
    hostId: 10,
    status: "ACTIVE",
    photos: [
      { id: 119, url: "https://images.unsplash.com/photo-1505692794403-34d0984388bd" },
      { id: 120, url: "https://images.unsplash.com/photo-1507089947368-19c1da9775ae" }
    ]
  }
];
}