import { async } from '@angular/core/testing';
import { Component, OnInit, ViewChild } from '@angular/core';
import { IonVirtualScroll, ModalController } from '@ionic/angular';
import { VegetableService } from '../services/vegetable.service';
import * as firebase from 'firebase';
import { Router } from '@angular/router';
import { VegTimeLineDetailPage } from '../modal/veg-time-line-detail/veg-time-line-detail.page';
import { MapDetailPage } from '../modal/map-detail/map-detail.page';
import { VegAddTimelinePage } from '../veg-add-timeline/veg-add-timeline.page';
import { IonItemSliding } from '@ionic/angular';
import { ToastService } from '../services/toast.service';
@Component({
  selector: 'app-veg-timeline',
  templateUrl: './veg-timeline.page.html',
  styleUrls: ['./veg-timeline.page.scss'],
})
export class VegTimelinePage implements OnInit {
  virtualScroll: IonVirtualScroll;
  vesList: any = [];
  vesImg: any = [];
  dataSet: any;

  constructor(
    private vegetableService: VegetableService,
    private toastService: ToastService,
    private router: Router,
    public modalController: ModalController
  ) {}
  vegList: any;
  user: any;
  ngOnInit() {}
  ionViewWillEnter() {
    this.getData();
  }
  getData() {
    let calendarList: any = [];
    firebase.auth().onAuthStateChanged((user) => {
      this.user = user.uid;
      const firebaseCollection = this.vegetableService.readListCalendar(
        user.uid
      );
      firebaseCollection.once('value', (snapshot) => {
        const data = snapshot.val();
        if (data !== null) {
          Object.entries(data).forEach(([key, value]) => {
            calendarList.push({ data: data[key], key: key });
          });
        }
        this.dataSet = calendarList;
        console.log(calendarList);
      });
    });
  }
  async gotoMap(item) {
    const modal = await this.modalController.create({
      component: MapDetailPage,
      componentProps: { data: JSON.stringify(item) },
      cssClass: 'setting-modal',
    });
    return await modal.present();
  }
  async gotoDetail(item) {
    const modal = await this.modalController.create({
      component: VegTimeLineDetailPage,
      componentProps: { data: JSON.stringify(item) },
      cssClass: 'setting-modal',
    });
    return await modal.present();
  }
  // this.router.navigate(['/veg-time-line-detail', JSON.stringify(item)]);
  async gotoAdd() {
    const modal = await this.modalController.create({
      component: VegAddTimelinePage,
      cssClass: 'setting-modal',
    });
    await modal.present();
    const { data } = await modal.onDidDismiss();
    if (data) {
      if (data.dismissed === true) {
        this.getData();
      }
    }
  }
  deleteCalendar(item, slidingItem: IonItemSliding) {
    slidingItem.close();
    this.vegetableService.deleteListCalendar(this.user, item).then(() => {
      this.toastService.toastSuccess('ลบเสร็จเรียบร้อยแล้ว');
      this.getData();
    }).catch(() => {
      this.toastService.toastError('ลบไม่สำเร็จ');
    });
  }
}
