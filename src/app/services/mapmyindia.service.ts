import { Injectable } from '@angular/core';
declare var mappls: any; // Declare mappls as an external library

@Injectable({
  providedIn: 'root'
})
export class MapmyindiaService {

  constructor() { }
  private map: any;


  initMap(): void {
    this.map = new mappls.Map('map', {
      center: [28.61, 77.23],
      zoomControl: true,
      location: true,
    });

    const Marker1 = new mappls.Marker({
      map: this.map,
      position: { lat: 28.519467, lng: 77.223150 },
      fitbounds: true,
      popupHtml: '<div>MapmyIndia</div>',
    });
  }
}

