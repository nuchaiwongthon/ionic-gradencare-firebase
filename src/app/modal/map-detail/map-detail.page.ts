import { Component, OnInit, Input } from '@angular/core';
import { Map, latLng, tileLayer, Layer, marker } from 'leaflet';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { ModalController } from '@ionic/angular';
declare const L: any;
declare const $: any;
@Component({
  selector: 'app-map-detail',
  templateUrl: './map-detail.page.html',
  styleUrls: ['./map-detail.page.scss'],
})
export class MapDetailPage implements OnInit {
  @Input() data;
  map: Map;
  watchPosition: any;
  userMarkers: any;
  geoLatlng: any = {};
  subscription: any;
  dataSet: any = [];
  markArea: any;
  constructor(private geolocation: Geolocation, public modalController: ModalController) {}

  ngOnInit() {
    this.dataSet = [];
    const data = JSON.parse(this.data);
    this.dataSet = data.veg_geom;
  }
  ionViewDidEnter() {
    this.leafletMap();
  }
  leafletMap() {
    // In setView add latLng and zoom
    this.map = L.map('mapDetail').setView([16.82481, 100.25858], 18);
    L.tileLayer(
      '//server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
      { attributionControl: false }
    ).addTo(this.map);
    this.getGeoloaction();
    if (this.dataSet) {
      this.getGeom();
    }
  }
  getGeoloaction() {
    const cssIcon = L.divIcon({
      // Specify a class name we can refer to in CSS.
      className: 'css-icon',
      html: '<div class="gps-ring"></div>',
      // Set marker width and height
      iconSize: [26, 26],
    });
    this.geolocation
      .getCurrentPosition()
      .then((resp) => {
        this.geoLatlng.lat = resp.coords.latitude;
        this.geoLatlng.lng = resp.coords.longitude;
      })
      .catch((error) => {
        console.log('Error getting location', error);
      });

    this.watchPosition = this.geolocation.watchPosition();
    this.subscription = this.watchPosition.subscribe((resp) => {
      this.geoLatlng.lat = resp.coords.latitude;
      this.geoLatlng.lng = resp.coords.longitude;

      if (this.userMarkers === undefined) {
        this.map.setView([this.geoLatlng.lat, this.geoLatlng.lng], 18);
        this.userMarkers = L.marker([this.geoLatlng.lat, this.geoLatlng.lng], {
          icon: cssIcon,
        }).addTo(this.map);
      } else {
        this.userMarkers.setLatLng([this.geoLatlng.lat, this.geoLatlng.lng]);
      }
    });
  }
  ionViewWillLeave() {
    this.map.remove();
    this.subscription.unsubscribe();
  }
  getGeom() {
    let geom: any;
    let latlng: any = [];
    for (let i = 0; i < this.dataSet.coordinates.length; i++) {
      let splice = this.dataSet.coordinates[i].split(' ');
      latlng.push([Number(splice[1]), Number(splice[0])]);
    }
    this.map.setView(latlng[0], 18);
    if (this.dataSet.type === 'polygon') {
      this.markArea = L.polygon(latlng, {
        color: '#ff0000',
        weight: 1,
      }).addTo(this.map);
    } else {


      this.markArea = L.rectangle(latlng, {
        color: '#FFFF00',
        weight: 1,
      }).addTo(this.map);
    }
  }
  closeModal(){
    this.modalController.dismiss();
  }
}
