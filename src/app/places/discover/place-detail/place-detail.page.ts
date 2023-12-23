import { Component, OnInit } from '@angular/core';
import { Observable, concatMap, map, shareReplay, take, takeWhile } from 'rxjs';
import { Place } from '../../place.model';
import { ActivatedRoute } from '@angular/router';
import { PlacesService } from '../../../services/places.service';
import {
  ActionSheetController,
  ModalController,
  NavController,
} from '@ionic/angular';
import { BookingService } from 'src/app/services/booking.service';
import { CreateBookingComponent } from 'src/app/bookings/create-booking/create-booking.component';

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
    private actionSheetCtrl: ActionSheetController,
    private bookingsService: BookingService
  ) {}

  ngOnInit() {
    this.getPlace();
  }

  private getPlace(): void {
    this.place$ = this.route.params.pipe(
      takeWhile(({ placeId }) => placeId),
      concatMap(({ placeId }) => this.placesService.getPlaceById(placeId)),
      map(({ result }) => result),
      takeWhile(Boolean),
      shareReplay(1)
    );
  }

  private openBookingModal(mode: 'select' | 'random'): void {
    console.log(mode);

    if (mode === 'random') {
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

  public async onBookPlace(): Promise<void> {
    this.actionSheetCtrl
      .create({
        header: 'Choose an Action',
        buttons: [
          {
            text: 'Select Date',
            handler: () => this.openBookingModal('select'),
          },
          {
            text: 'Random Date',
            handler: () => this.openBookingModal('random'),
          },
          { text: 'Cancel', role: 'cancel' },
        ],
      })
      .then((actionSheet) => {
        actionSheet.present();
      });
  }
}
