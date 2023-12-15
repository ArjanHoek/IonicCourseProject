import { Component, OnInit } from '@angular/core';
import { Observable, concatMap, finalize, map, takeWhile, tap } from 'rxjs';
import { Place } from '../../place.model';
import { NavController } from '@ionic/angular';
import { PlacesService } from '../../places.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-offer',
  templateUrl: './edit-offer.page.html',
  styleUrls: ['./edit-offer.page.scss'],
})
export class EditOfferPage implements OnInit {
  public offerDetails$!: Observable<Place>;
  public backHref = '/places/offers';

  constructor(
    private route: ActivatedRoute,
    private navController: NavController,
    private placesService: PlacesService
  ) {}

  ngOnInit() {
    this.getDetails();
  }

  private getDetails(): void {
    this.offerDetails$ = this.route.params.pipe(
      takeWhile(({ placeId }) => placeId),
      tap(({ placeId }) => {
        this.backHref = `/places/offers/${placeId}`;
      }),
      concatMap(({ placeId }) => this.placesService.getPlaceById(placeId)),
      map(({ result }) => result),
      takeWhile(Boolean),
      finalize(() => {
        this.navController.navigateBack(this.backHref);
      })
    );
  }
}
