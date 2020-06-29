import { Injectable } from '@angular/core';
import { VegetableService } from './vegetable.service';
import { Http } from '@angular/http';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: Http, private vegetableService: VegetableService) {}

  openWeather(latlng: any, key: string) {
    const myHeaders = new Headers();
    myHeaders.append('Access-Control-Allow-Origin', '*');
    myHeaders.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
    return this.http
      .get(
        'http://api.openweathermap.org/data/2.5/weather?lat=' +
          latlng.lat +
          '&lon=' +
          latlng.lng +
          '&appid=' +
          key + '&lang=th&units=metric'
      )
      .toPromise();
  }
}
