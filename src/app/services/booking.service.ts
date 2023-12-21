import { Injectable } from '@angular/core';
import { Booking } from '../models/booking.model';
import { BehaviorSubject } from 'rxjs';
import { Place } from '../places/place.model';

@Injectable({
  providedIn: 'root',
})
export class BookingService {
  private bookingsSubject = new BehaviorSubject<Booking[]>([]);
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
