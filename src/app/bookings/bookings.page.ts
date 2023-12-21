import { Component } from '@angular/core';
import { BookingService } from '../services/booking.service';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.page.html',
  styleUrls: ['./bookings.page.scss'],
})
export class BookingsPage {
  public bookings$ = this.bookingsService.bookings$;

  constructor(private bookingsService: BookingService) {}

  public onRemove(bookingId: string): void {
    this.bookingsService.removeBooking(bookingId);
  }
}
