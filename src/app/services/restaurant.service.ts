import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Restaurant } from '../models/restaurant.model';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

  private restaurants: Restaurant[] = [
    {
      id: '1',
      name: 'The Food Place',
      description: 'A great place for food lovers.',
      location: '123 Food Street, Flavor Town',
      contact: '123-456-7890',
      hours: '9 AM - 9 PM',
      cuisine: 'Italian',
      image: 'assets/restaurants1.jpg'
    },
    {
      id: '2',
      name: 'Delightful Dishes',
      description: 'Delicious dishes from around the world.',
      location: '456 Culinary Ave, Taste City',
      contact: '987-654-3210',
      hours: '10 AM - 10 PM',
      cuisine: 'Mexican',
      image: 'assets/restaurants2.jpg'
    },
    {
      id: '3',
      name: 'Gourmet Bites',
      description: 'Gourmet food at affordable prices.',
      location: '789 Yummy Blvd, Savor Town',
      contact: '555-123-4567',
      hours: '8 AM - 8 PM',
      cuisine: 'French',
      image: 'assets/restaurants3.jpg'
    },
    {
      id: '4',
      name: 'Little Monk Restaurant',
      description: 'Little Monk is a fine dining.',
      location: 'AB Road, Umaria, Near Rau, Indore',
      contact: '987-123-4567',
      hours: '8 AM - 5 PM',
      cuisine: 'Indian',
      image: 'assets/restaurants3.jpg'
    },
    {
      id: '5',
      name: 'Yawun Cafe',
      description: 'This restaurant is the elegance of the city.',
      location: 'Khajrana, Indore, Madhya Pradesh',
      contact: '789-123-4567',
      hours: '12 AM - 11 PM',
      cuisine: 'South Indian',
      image: 'assets/restaurants3.jpg'
    }
  ];

  constructor(private http: HttpClient) {}

  getRestaurants(): Observable<Restaurant[]> {
    return of(this.restaurants);
  }

  getRestaurant(id: string): Observable<Restaurant> {
    const restaurant = this.restaurants.find(r => r.id === id);
    return of(restaurant as Restaurant);
  }

  addRestaurant(restaurant: Restaurant): Observable<Restaurant> {
    restaurant.id = (this.restaurants.length + 1).toString();
    this.restaurants.push(restaurant);
    return of(restaurant);
  }

  updateRestaurant(id: string, updatedRestaurant: Restaurant): Observable<Restaurant> {
    const index = this.restaurants.findIndex(r => r.id === id);
    if (index !== -1) {
      this.restaurants[index] = { ...updatedRestaurant, id };
    }
    return of(this.restaurants[index]);
  }

  deleteRestaurant(id: string): Observable<void> {
    this.restaurants = this.restaurants.filter(r => r.id !== id);
    return of();
  }
}
