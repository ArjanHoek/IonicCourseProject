import { Component, OnInit } from '@angular/core';
import { Observable, concatMap, finalize, map, takeWhile } from 'rxjs';
import { Place } from '../../place.model';
import { ActivatedRoute } from '@angular/router';
import { PlacesService } from '../../services/places.service';
import { NavController } from '@ionic/angular';

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
    private placesService: PlacesService
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
      finalize(() => {
        this.navController.navigateBack('/places/discover');
      })
    );
  }

  public onBookPlace(): void {
    this.navController.navigateBack('/places/discover');
  }
}
