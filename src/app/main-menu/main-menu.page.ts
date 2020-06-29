import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { VegetableService } from '../services/vegetable.service';
import { VegetableJsonService } from '../services/vegetable-json.service';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { ApiService } from '../services/api.service';
import * as moment from 'moment';
import { AnimationService } from '../services/animation.service';
@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.page.html',
  styleUrls: ['./main-menu.page.scss'],
})
export class MainMenuPage implements OnInit {
  vesList: any;
  constructor(
    private authenticationService: AuthenticationService,
    private vegetableService: VegetableService,
    private vegetableJsonService: VegetableJsonService,
    private androidPermissions: AndroidPermissions,
    private geolocation: Geolocation,
    private apiService: ApiService,
    private animationService: AnimationService
  ) {}
  userData: any;
  hasWriteAccess: boolean = false;
  geoLatlng: any = {};
  dataWeather: any = {};
  key: any;
  showWeather = false;
  timeWeather: any;
  ngOnInit() {

  }
  checkPermissions() {
    this.androidPermissions
      .checkPermission(
        this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE
      )
      .then(
        (result) => {
          console.log('Has permission?', result.hasPermission);
          this.hasWriteAccess = result.hasPermission;
        },
        (err) => {
          this.androidPermissions.requestPermission(
            this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE
          );
        }
      );

    if (!this.hasWriteAccess) {
      this.androidPermissions.requestPermissions([
        this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE,
      ]);
    }
  }
  getGeoloaction() {
    this.geolocation
      .getCurrentPosition()
      .then((resp) => {
        this.geoLatlng.lat = resp.coords.latitude;
        this.geoLatlng.lng = resp.coords.longitude;
        this.getWeather();
      })
      .catch((error) => {
        console.log('Error getting location', error);
      });
  }
  getWeather() {
    this.vegetableService.readApiWeather().subscribe((res) => {
      this.key = res.map((e) => {
        return {
          key: e.payload.doc.data()['key'],
        };
      });
      this.apiService
        .openWeather(this.geoLatlng, this.key[0].key)
        .then((res) => {
          const data = res.json();
          let sunrise = data.sys.sunrise;
          let sunset = data.sys.sunset;
          let date_sunrise = moment(new Date(sunrise * 1000)).format('HH:mm');
          let date_sunset = moment(new Date(sunset * 1000)).format('HH:mm');

          this.dataWeather = {
            main: data.weather[0].main,
            description: data.weather[0].description,
            icon:
              'http://openweathermap.org/img/wn/' +
              data.weather[0].icon +
              '@2x.png',
            temp: Math.round(data.main.temp),
            feels_like: data.main.feels_like,
            temp_min: data.main.temp_min,
            temp_max: data.main.temp_max,
            pressure: data.main.pressure,
            humidity: data.main.humidity,
            speed: data.wind.speed * 60,
            deg: data.wind.deg,
            all: data.clouds.all,
            sunrise: date_sunrise,
            sunset: date_sunset,
            name: data.name,
          };
          this.showWeather = true;
          localStorage.setItem(
            'data-weather',
            JSON.stringify(this.dataWeather)
          );

          //console.log(this.dataWeather);
        });
    });
  }
  getAnimate(element, animationName) {
    const node = document.querySelector(element);
    node.classList.add('animated', animationName);

    function handleAnimationEnd() {
      node.classList.remove('animated', animationName);
      node.removeEventListener('animationend', handleAnimationEnd);
    }

    node.addEventListener('animationend', handleAnimationEnd);
  }

  ionViewWillEnter() {
    moment.locale('th');
    this.checkPermissions();
     //    this.vegetableJsonService.getDatabyJson().then(res => {
    //   console.log(res);
    //   for (let i = 0; i < res.length; i++) {
    //     this.vegetableService.createData(res[i]).then(resp => {
    //       console.log(resp);
    //     })
    //       .catch(error => {
    //         console.log(error);
    //       });
    //   }
    // });
    //        this.vegetableJsonService.getDatabyJsonCalendar().then(res => {
    //   console.log(res);
    //   for (let i = 0; i < res.length; i++) {
    //     this.vegetableService.createDataCalendar(res[i]).then(resp => {
    //       console.log(resp);
    //     })
    //       .catch(error => {
    //         console.log(error);
    //       });
    //   }
    // });
    this.timeWeather = localStorage.getItem('time-weather');
    const dateCurrent = moment().format();
    this.dataWeather = JSON.parse(localStorage.getItem('data-weather'));
    if (this.dataWeather) {
      this.showWeather = true;
      if (this.timeWeather) {
        if (moment(this.timeWeather).add(3, 'hours').format() <= dateCurrent) {
          localStorage.setItem('time-weather', dateCurrent);
          this.getGeoloaction();
        }
      } else {
        localStorage.setItem('time-weather', dateCurrent);
      }
     
    
     
    } else {
      localStorage.setItem('time-weather', dateCurrent);
      this.getGeoloaction();
    }
  }
  ionViewDidEnter() {}
  logOut() {
    this.authenticationService.logoutUser();
  }
}
