import { Component } from '@angular/core';

import { GeolocationPosition, GeolocationOptions, Plugins } from '@capacitor/core';
const { Geolocation } = Plugins;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  currentPos: GeolocationPosition;
  waitingForCurrentPosition = false;
  geolocationOptions: GeolocationOptions = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 20000,
  };

  constructor() {}

  async requestPermission() {
    const permissions = await Geolocation.requestPermissions();
    console.log('permissions:', permissions);
  }

  async getCurrentPos() {
    try {
      this.waitingForCurrentPosition = true;
      this.currentPos = await Geolocation.getCurrentPosition(this.geolocationOptions);
      console.log(this.currentPos);
    } catch (err) {
      console.error('Failed to get current position.', err);
    } finally {
      this.waitingForCurrentPosition = false;
    }
  }

}
