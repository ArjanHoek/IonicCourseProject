import { Component, OnInit } from '@angular/core';
import { Place } from '../../place.model';
import { ActivatedRoute } from '@angular/router';
import {
  Observable,
  concatMap,
  finalize,
  map,
  shareReplay,
  takeWhile,
} from 'rxjs';
import { PlacesService } from '../../services/places.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-offer-bookings',
  templateUrl: './offer-bookings.page.html',
  styleUrls: ['./offer-bookings.page.scss'],
})
export class OfferBookingsPage implements OnInit {
  public details$!: Observable<Place>;

  constructor(
    private route: ActivatedRoute,
    private navController: NavController,
    private placesService: PlacesService
  ) {}

  ngOnInit() {
    this.getDetails();
  }

  private getDetails(): void {
    this.details$ = this.route.params.pipe(
      takeWhile(({ placeId }) => placeId),
      concatMap(({ placeId }) => this.placesService.getPlaceById(placeId)),
      map(({ result }) => result),
      takeWhile(Boolean),
      finalize(() => {
        this.navController.navigateBack('/places/offers');
      }),
      shareReplay(1)
    );
  }
}
