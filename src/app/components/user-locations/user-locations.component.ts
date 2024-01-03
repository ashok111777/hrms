import { Component } from '@angular/core';
import { MapmyindiaService } from 'src/app/services/mapmyindia.service';
declare var mappls: any; // Declare mappls as an external library

@Component({
  selector: 'app-user-locations',
  templateUrl: './user-locations.component.html',
  styleUrls: ['./user-locations.component.scss']
})

export class UserLocationsComponent {
  constructor() { }
  ngOnInit(): void {
    const map = new mappls.Map('map', {
      center: [13.0827, 80.2707], // Center on Chennai, Egmore
      zoomControl: true,
      location: true,
    });

    const geoData = {
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          properties: {
            htmlPopup: 'Intime Location',
          },
          geometry: {
            type: 'Point',
            coordinates: [80.2707, 13.0827], // Chennai, Egmore coordinates
          },
        },
        {
          type: 'Feature',
          properties: {
            htmlPopup: 'OutTime location',
          },
          geometry: {
            type: 'Point',
            coordinates: [80.2825, 13.0500], // Marina Beach coordinates
          },
        },
      ],
    };

    map.addListener('load', function () {
      geoData.features.forEach((feature) => {
        const marker = new mappls.Marker({
          map: map,
          position: {
            lat: feature.geometry.coordinates[1],
            lng: feature.geometry.coordinates[0],
          },
          fitbounds: true,
          draggable: true,
          popupHtml: `<div>${feature.properties.htmlPopup}</div>`,
        });
        marker.on('click', () => {
          marker.openPopup();
        });
      });
    });
  }
}


