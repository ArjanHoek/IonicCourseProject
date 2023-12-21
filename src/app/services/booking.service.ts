import { Injectable } from '@angular/core';
import { Booking } from '../models/booking.model';
import { BehaviorSubject } from 'rxjs';
import { Place } from '../places/place.model';

const testBookings: Booking[] = [
  {
    id: 'b1',
    placeId: 'p1',
    placeTitle: 'Vancouver',
    guestNumber: 2,
    userId: 'u1',
  },
];

@Injectable({
  providedIn: 'root',
})
export class BookingService {
  private bookingsSubject = new BehaviorSubject<Booking[]>(testBookings);
  public bookings$ = this.bookingsSubject.asObservable();

  public placeBooking(place: Place): void {
    const newBooking: Booking = {
      id: `b${+new Date()}`,
      placeId: place.id,
      placeTitle: place.title,
      guestNumber: 3,
      userId: 'u1'
    }

    this.bookingsSubject.next([...this.bookingsSubject.getValue(), newBooking]);
  }

  public removeBooking(bookingId: string): void {
    const current = this.bookingsSubject.getValue();
    this.bookingsSubject.next(current.filter(({id}) => id !== bookingId));
  }
}
