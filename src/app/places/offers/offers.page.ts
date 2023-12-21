import { Component, OnInit } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Place } from '../place.model';
import { PlacesService } from '../../services/places.service';
import { Router } from '@angular/router';
import { IonItemSliding } from '@ionic/angular';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.page.html',
  styleUrls: ['./offers.page.scss'],
})
export class OffersPage implements OnInit {
  public places$!: Observable<Place[]>;

  constructor(private placesService: PlacesService, private router: Router) {}

  ngOnInit(): void {
    this.initPlaces();
  }

  private initPlaces(): void {
    this.places$ = this.placesService
      .getPlaces()
      .pipe(map(({ result }) => result));
  }

  public onEdit(id: string, slidingItem: IonItemSliding): void {
    slidingItem.close();
    this.router.navigate(['/places', 'offers', 'edit', id]);
  }
}
