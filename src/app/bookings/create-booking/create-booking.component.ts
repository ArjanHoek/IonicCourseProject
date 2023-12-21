import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Place } from 'src/app/places/place.model';

@Component({
  selector: 'app-create-booking',
  templateUrl: './create-booking.component.html',
  styleUrls: ['./create-booking.component.scss'],
})
export class CreateBookingComponent {
  @Input() public place!: Place;

  constructor(private modalCtrl: ModalController) {}

  public onCancel(): void {
    this.modalCtrl.dismiss(null, 'cancel');
  }

  public onBookPlace(): void {
    this.modalCtrl.dismiss({ place: this.place }, 'confirm');
  }
}
