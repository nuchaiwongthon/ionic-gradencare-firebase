import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, } from '@angular/common/http';
// import { Observable, throwError } from 'rxjs';
// import { retry, catchError } from 'rxjs/operators';
// import { AngularFirestore } from '@angular/fire/firestore';
@Injectable({
  providedIn: 'root'
})
export class VegetableJsonService {


  constructor(private http: HttpClient) { }
  getDatabyJson() {
    return this.http.get('../../assets/vegetable.json').toPromise();
  }
  getDatabyJsonCalendar() {
    return this.http.get('../../assets/calendar.json').toPromise();
  }

}
