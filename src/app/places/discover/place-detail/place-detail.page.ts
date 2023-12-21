import { Component, OnInit } from '@angular/core';
import {
  Observable,
  concatMap, map,
  shareReplay,
  take,
  takeWhile
} from 'rxjs';
import { Place } from '../../place.model';
import { ActivatedRoute } from '@angular/router';
import { PlacesService } from '../../../services/places.service';
import { ModalController, NavController } from '@ionic/angular';
import { CreateBookingComponent } from 'src/app/bookings/create-booking/create-booking.component';
import { BookingService } from 'src/app/services/booking.service';

@Component({
  selector: 'app-place-detail',
  templateUrl: './place-detail.page.html',
  styleUrls: ['./place-detail.page.scss'],
})
export class PlaceDetailPage implements OnInit {
  public place$!: Observable<Place>;

  constructor(
    private route: ActivatedRoute,
    private navController: NavController,
    private placesService: PlacesService,
    private modalCtrl: ModalController,
    private bookingsService: BookingService
  ) {}

  ngOnInit() {
    this.getDetails();
  }

  private getDetails(): void {
    this.place$ = this.route.params.pipe(
      takeWhile(({ placeId }) => placeId),
      concatMap(({ placeId }) => this.placesService.getPlaceById(placeId)),
      map(({ result }) => result),
      takeWhile(Boolean),
      // finalize(() => {
      //   this.navController.navigateBack('/places/discover');
      // }),
      shareReplay(1)
    );
  }

  public async onBookPlace(): Promise<void> {
    this.place$.pipe(take(1)).subscribe((place) => {
      this.modalCtrl
        .create({
          component: CreateBookingComponent,
          componentProps: { place },
        })
        .then((modal) => {
          modal.present();
          return modal.onDidDismiss();
        })
        .then(({ data: { place }, role }) => {
          if (role === 'confirm') {
            this.bookingsService.placeBooking(place);
            this.navController.navigateForward(['/bookings']);
          }
        });
    });
  }
}
