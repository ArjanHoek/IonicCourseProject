import { Component, OnInit } from '@angular/core';
import { PlacesService } from '../../services/places.service';
import { Observable, map } from 'rxjs';
import { Place } from '../place.model';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.page.html',
  styleUrls: ['./discover.page.scss'],
})
export class DiscoverPage implements OnInit {
  public places$!: Observable<Place[]>;

  constructor(private placesService: PlacesService) {}

  ngOnInit(): void {
    this.initPlaces();
  }

  private initPlaces(): void {
    this.places$ = this.placesService
      .getPlaces()
      .pipe(map(({ result }) => result));
  }
}
