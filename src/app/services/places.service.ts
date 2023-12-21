import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Place } from '../places/place.model';

const testPlaces: Place[] = [
  {
    id: '2',
    title: 'Canada',
    description: 'Out in the nature of North America!',
    imageUrl:
      'https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?cs=srgb&dl=pexels-james-wheeler-417074.jpg&fm=jpg&w=1280&h=862&_gl=1*1wsjxdn*_ga*NjM5NTY4Nzg4LjE2ODQyNTg4MTc.*_ga_8JE65Q40S6*MTcwMjQ3ODExMC4xMi4xLjE3MDI0ODA0NzAuMC4wLjA.',
    price: 149.99,
  },
  {
    id: '1',
    title: 'New Zealand',
    description: 'Homeland of the Hobbits!',
    imageUrl:
      'https://images.pexels.com/photos/1022479/pexels-photo-1022479.jpeg?cs=srgb&dl=pexels-tyler-lastovich-1022479.jpg&fm=jpg&w=1280&h=880&_gl=1*126gx0x*_ga*NjM5NTY4Nzg4LjE2ODQyNTg4MTc.*_ga_8JE65Q40S6*MTcwMjQ3ODExMC4xMi4xLjE3MDI0ODA0MzEuMC4wLjA.',
    price: 189.99,
  },

  {
    id: '3',
    title: 'Japan',
    description: 'Discover this mythical island!',
    imageUrl:
      'https://images.pexels.com/photos/402028/pexels-photo-402028.jpeg?cs=srgb&dl=pexels-belle-co-402028.jpg&fm=jpg&w=1280&h=853&_gl=1*dv5t7q*_ga*NjM5NTY4Nzg4LjE2ODQyNTg4MTc.*_ga_8JE65Q40S6*MTcwMjQ3ODExMC4xMi4xLjE3MDI0ODA0ODQuMC4wLjA.',
    price: 219.99,
  },
];

interface PlaceResult {
  result: Place | undefined;
}

interface PlacesResult {
  result: Place[];
}

@Injectable({
  providedIn: 'root',
})
export class PlacesService {
  constructor() {}

  public getPlaces(): Observable<PlacesResult> {
    return of({ result: testPlaces });
  }

  public getPlaceById(placeId: string): Observable<PlaceResult> {
    const result = testPlaces.find(({ id }) => id === placeId);
    return of({ result });
  }
}
