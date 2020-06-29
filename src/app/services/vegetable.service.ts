import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';
import { AngularFireDatabase } from '@angular/fire/database';
import { ToastService } from './toast.service';
@Injectable({
  providedIn: 'root',
})
export class VegetableService {
  vesList = [];
  constructor(
    private firestore: AngularFirestore,
    private db: AngularFireDatabase,
    private toastService: ToastService,
  ) {}

  createData(record) {
    return this.firestore.collection('vegetable_tb').add(record);
  }
  createDataCalendar(record) {
    return this.firestore.collection('vegetable_calendar_tb').add(record).then(() => {
      console.log('suc');
      this.toastService.toastSuccess('บันทึกสำเร็จ');
    }).catch(() => {
      this.toastService.toastError('บันทึกไม่สำเร็จ');
    });
  }
  read() {
    return this.firestore.collection('vegetable_tb').snapshotChanges();
  }
  readApiWeather() {
    return this.firestore.collection('weather_api').snapshotChanges();
  }
  readCalendar() {
    return this.firestore.collection('vegetable_calendar_tb').snapshotChanges();
  }
  readListCalendar(user: any) {
    return firebase.database().ref('vegetable_calendar_event_tb/' + user);
  }
  deleteListCalendar(user: any, id: any) {
    const calendarList = [];
    return firebase.database().ref('vegetable_calendar_event_tb/' + user + '/' + id).remove();
  }
  createCalendar(user: any, data: any) {
    firebase
      .database()
      .ref('vegetable_calendar_event_tb/' + user)
      .push(data)
      .then(() => {
        console.log('suc');
        this.toastService.toastSuccess('บันทึกสำเร็จ');
      }).catch(() => {
        this.toastService.toastError('บันทึกไม่สำเร็จ');
      });
  }
}
