import { Component, NgZone } from '@angular/core';

import { GeolocationPosition, GeolocationOptions, Plugins } from '@capacitor/core';
const { Geolocation } = Plugins;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  // For current position
  currentPos: GeolocationPosition;
  waitingForCurrentPosition = false;

  // For position watch
  watchedPos: GeolocationPosition;
  watchingPosition = false;
  locationWatchId: string;

  // Toggle options display
  showOptions = false;

  // Geolocation options
  geolocationOptions: GeolocationOptions = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 20000,
  };

  constructor(
    private ngZone: NgZone,
  ) { }

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

  watchPos() {
    this.watchingPosition = true;
    this.locationWatchId = Geolocation.watchPosition(this.geolocationOptions, (position, err) => {
      this.ngZone.run(() => {
        if (err) {
          console.error('Failed to watch position.', err);
        }

        this.watchedPos = position;
        console.log(position);
      });
    });
  }

  async clearWatchPos() {
    try {
      if (this.locationWatchId) {
        await Geolocation.clearWatch({
          id: this.locationWatchId,
        });
        console.log('Cleared watch');
      }
    } catch (err) {
      console.error('Failed to clear watch.', err);
    } finally {
      this.watchingPosition = false;
    }
  }
}
