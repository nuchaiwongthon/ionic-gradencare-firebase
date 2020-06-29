import { NavController, ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { VegetableService } from '../services/vegetable.service';
import { Storage } from '@ionic/storage';
import * as firebase from 'firebase';
import { Map } from 'leaflet';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import '../../assets/esri-leaflet/dist/esri-leaflet.js';

import '../../assets/Leaflet.draw-develop/src/Leaflet.draw.js';
import '../../assets/Leaflet.draw-develop/src/Leaflet.Draw.Event.js';

import '../../assets/Leaflet.draw-develop/src/Toolbar.js';
import '../../assets/Leaflet.draw-develop/src/Tooltip.js';

import '../../assets/Leaflet.draw-develop/src/ext/GeometryUtil.js';
import '../../assets/Leaflet.draw-develop/src/ext/LatLngUtil.js';
import '../../assets/Leaflet.draw-develop/src/ext/LineUtil.Intersect.js';
import '../../assets/Leaflet.draw-develop/src/ext/Polygon.Intersect.js';
import '../../assets/Leaflet.draw-develop/src/ext/Polyline.Intersect.js';
import '../../assets/Leaflet.draw-develop/src/ext/TouchEvents.js';

import '../../assets/Leaflet.draw-develop/src/draw/DrawToolbar.js';
import '../../assets/Leaflet.draw-develop/src/draw/handler/Draw.Feature.js';
import '../../assets/Leaflet.draw-develop/src/draw/handler/Draw.SimpleShape.js';
import '../../assets/Leaflet.draw-develop/src/draw/handler/Draw.Polyline.js';
import '../../assets/Leaflet.draw-develop/src/draw/handler/Draw.Marker.js';
import '../../assets/Leaflet.draw-develop/src/draw/handler/Draw.CircleMarker.js';
import '../../assets/Leaflet.draw-develop/src/draw/handler/Draw.Circle.js';
import '../../assets/Leaflet.draw-develop/src/draw/handler/Draw.Polygon.js';
import '../../assets/Leaflet.draw-develop/src/draw/handler/Draw.Rectangle.js';
import '../../assets/Leaflet.draw-develop/src/edit/EditToolbar.js';
import '../../assets/Leaflet.draw-develop/src/edit/handler/EditToolbar.Edit.js';
import '../../assets/Leaflet.draw-develop/src/edit/handler/EditToolbar.Delete.js';
import '../../assets/Leaflet.draw-develop/src/Control.Draw.js';
import '../../assets/Leaflet.draw-develop/src/edit/handler/Edit.Poly.js';
import '../../assets/Leaflet.draw-develop/src/edit/handler/Edit.SimpleShape.js';
import '../../assets/Leaflet.draw-develop/src/edit/handler/Edit.Marker.js';
import '../../assets/Leaflet.draw-develop/src/edit/handler/Edit.CircleMarker.js';
import '../../assets/Leaflet.draw-develop/src/edit/handler/Edit.Circle.js';
import '../../assets/Leaflet.draw-develop/src/edit/handler/Edit.Rectangle.js';
import * as Geocoding from 'esri-leaflet-geocoder';
declare const L: any;
@Component({
  selector: 'app-veg-add-timeline',
  templateUrl: './veg-add-timeline.page.html',
  styleUrls: ['./veg-add-timeline.page.scss'],
})
export class VegAddTimelinePage implements OnInit {
  dayShortNames = [
    'อาทิตย์',
    'จันทร์',
    'อังคาร',
    'พุธ',
    'พฤหัสบดี',
    'ศุกร์',
    'เสาร์',
  ];
  // tslint:disable-next-line: max-line-length
  monthShortNames = [
    'มกราคม',
    'กุมภาพันธ์',
    'มีนาคม',
    'เมษายน',
    'พฤษภาคม',
    'มิถุนายน',
    'กรกฎาคม',
    'สิงหาคม',
    'กันยายน',
    'ตุลาคม',
    'พฤศจิกายน',
    'ธันวาคม',
  ];
  doneText = 'เลือกวันที่';
  cancelText = 'ยกเลิก';
  okText = 'ตกลง';
  vegData: any = [];
  vegList: any = [];
  setDate: any;
  selectData: any;
  vegSet: any = [];
  saveData: any = [];
  startDate: any = moment().format();
  vegArr = {};
  constructor(
    private vegetableService: VegetableService,
    private storage: Storage,
    private geolocation: Geolocation,
    private navCtrl: NavController,
    public modalController: ModalController
  ) {}
  map: Map;
  geoLatlng: any = {};
  watchPosition: any;
  userMarkers: any;
  searchArea: any;
  pointLatlng: any;
  createDraw: any = [];
  area: any;
  drawControl: any;
  drawnItems: any;
  editableLayers: any;
  areaType: any;
  eventMarker: any;
  dataGeom: any;
  subscription: any;
  marker: any;
  geoAddr: any;
  ngOnInit() {
    this.vegetableService.readCalendar().subscribe((res) => {
      this.vegList = res.map((e) => {
        return {
          fertilizer_date: e.payload.doc.data()['fertilizer_date'],
          fertilizer_detail: e.payload.doc.data()['fertilizer_detail'],
          veg_id: e.payload.doc.data()['veg_name_cl'],
          veg_name: e.payload.doc.data()['veg_name'],
        };
      });
    });
  }
  ionViewDidEnter() {
    this.leafletMap();
  }

  leafletMap() {
    // In setView add latLng and zoom
    this.map = L.map('mapId').setView([16.82481, 100.25858], 18);
    L.tileLayer(
      '//server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
      // L.tileLayer('https://2.aerial.maps.api.here.com/maptile/2.1/maptile/newest/satellite.day/{z}/{x}/{y}/256/png8?app_id=7G9cJ3SprUkBan29HxkS&app_code=bVviYm3-X2w3rnM4OhCOTg',
    ).addTo(this.map);
    const searchControl = Geocoding.geosearch().addTo(this.map);
    const results = L.layerGroup().addTo(this.map);

    searchControl.on('results', (data) => {
      console.log(data.latlng);
      results.clearLayers();
      // *********************** */ circle พื้นที่
      this.removeSearchArea();
      this.searchArea = L.circle(data.latlng, {
        radius: 200,
        color: '#ff0000',
        fillColor: '#ff0000b7',
        opacity: 0.7,
        weight: 1,
      }).addTo(this.map);
      // this.onMapClick(data);
    });
    this.getGeoloaction();
    this.DrawGeomatic();
  }
  DrawGeomatic() {
    const customMarker = L.Icon.extend({
      options: {
        shadowUrl: null,
        iconAnchor: new L.Point(15, 20),
        iconSize: new L.Point(30, 30),
        iconUrl: 'assets/images/pin.png',
      },
    });
    this.editableLayers = new L.FeatureGroup();
    this.map.addLayer(this.editableLayers);
    const options = {
      position: 'topright',
      draw: {
        polyline: false,
        polygon: {
          allowIntersection: false, // Restricts shapes to simple polygons
          PolygonOptions: {
            metric: true,
          },
          shapeOptions: {
            color: '#ff0000',
            weight: 3,
            opacity: 1,
          },
        },
        marker: {
          icon: new customMarker() //Here assign your custom marker
        },
        circle: false, // Turns off this drawing tool
        circlemarker: false,
        rectangle: {
          shapeOptions: {
            clickable: false,
            color: '#00BFA5',
            weight: 1,
            opacity: 1,
          },
        },
      },
      edit: {
        featureGroup: this.editableLayers,
      },
    };

    if (this.drawControl) {
      this.map.removeEventListener(L.Draw.Event.EDITED);
      this.map.removeControl(this.drawControl);
      this.drawControl = undefined;
    }
    this.drawControl = new L.Control.Draw(options);
    this.map.addControl(this.drawControl);

    this.map.on(L.Draw.Event.CREATED, (e) => {
      console.log(e);
      setTimeout(() => {
        this.eventMarker = e.layer;
        this.areaType = e.type;
        this.setGeom(e.layer);
        this.editableLayers.addLayer(e.layer);
      }, 100);
    });
    this.map.on('draw:edited', (e) => {
      setTimeout(() => {
        this.eventMarker = e.layer;
       this.areaType = e.type;
        this.setGeom(e.layer);
        this.editableLayers.addLayer(e.layer);
      }, 100);

      e.layer.on('click', () => {
        this.clickEdit(e.layer, e.layer._leaflet_id);
      });
    });
  }

  setGeom(layer) {
    console.log(layer);
    setTimeout(() => {
      if (this.areaType === 'polygon') {
        const latLng: any = [];
        let l = 0;
        for (let i = 0; i < layer._latlngs[0].length; i++) {
          latLng.push(
            layer._latlngs[0][i].lng + ' ' + layer._latlngs[0][i].lat
          );
        }
        latLng.push(layer._latlngs[0][0].lng + ' ' + layer._latlngs[0][0].lat);

        this.createDraw = {
          type: this.areaType,
          coordinates: latLng,
        };
      } else if (this.areaType === 'rectangle') {
        const latLng: any = [];
        let l = 0;
        for (let i = 0; i < layer._latlngs[0].length; i++) {
          latLng.push(
            layer._latlngs[0][i].lng + ' ' + layer._latlngs[0][i].lat
          );
        }
        latLng.push(layer._latlngs[0][0].lng + ' ' + layer._latlngs[0][0].lat);

        this.createDraw = {
          type: this.areaType,
          coordinates: latLng,
        };
      } else {
        this.createDraw = {
          type: this.areaType,
          coordinates: layer._latlng
        };
      }
      this.dataGeom = this.createDraw;
    }, 100);
  }
  clickEdit(layer, id) {
    this.map.addEventListener(L.Draw.Event.EDITED, (event) => {
     // console.log(this.drawnItems._layers[id]);
      this.setGeom(this.drawnItems._layers[id]);
    });
  }

  removeSearchArea() {
    if (this.searchArea) {
      this.map.removeLayer(this.searchArea);
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
  generateData() {
    moment.locale('th');
    this.vegSet = [];
    if (
      this.startDate !== undefined &&
      this.selectData !== undefined &&
      this.dataGeom !== undefined
    ) {
      this.vegSet.push({
        date: moment(this.startDate).format('YYYY-MM-DD'),
        type: 'เริ่มปลูก',
        detail: 'เริ่มปลูก' + this.selectData.veg_name,
      });
      const getData = JSON.parse(this.selectData.fertilizer_date);
      const getDetail = JSON.parse(this.selectData.fertilizer_detail);
      let date = moment().format();
      for (let i = 0; i < getData.length; i++) {
        const setDate = moment(date)
          .add(getData[i].count_date, 'days')
          .format();
        this.vegSet.push({
          date: moment(setDate).format('YYYY-MM-DD'),
          type: getDetail[i].type,
          detail: getDetail[i].detail,
        });
        date = setDate;
      }

      firebase.auth().onAuthStateChanged((user) => {
        this.vegArr = {
          veg_name: this.selectData.veg_name,
          veg_geom: this.dataGeom,
          calendar_event: this.vegSet,
          created_by: user.uid,
          created_date: moment().format('ddd DD MMM YYYY'),
          status: 0,
        };
        this.vegetableService.createCalendar(user.uid, this.vegArr);
        this.closeModal();
      });
    }
  }
  closeModal() {
    this.modalController.dismiss({ dismissed: true });
  }
}
