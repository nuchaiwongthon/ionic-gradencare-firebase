import { async } from '@angular/core/testing';
import { Component, OnInit, ViewChild } from '@angular/core';
import {
  NavController,
  ModalController,
  IonVirtualScroll,
} from '@ionic/angular';
import { AuthenticationService } from '../services/authentication.service';
import { AngularFireDatabase } from '@angular/fire/database';
import { VegetableService } from '../services/vegetable.service';
import * as firebase from 'firebase';
import { VegetableJsonService } from '../services/vegetable-json.service';
import { Router } from '@angular/router';
import { VegDetailPage } from '../veg-detail/veg-detail.page';
import { AnimationService } from '../services/animation.service';
@Component({
  selector: 'app-veg-list',
  templateUrl: './veg-list.page.html',
  styleUrls: ['./veg-list.page.scss'],
})
export class VegListPage implements OnInit {
  virtualScroll: IonVirtualScroll;
  userEmail: string;
  vesList: any = [];
  vesImg: any = [];
  dataSet: any;
  dataImg: any;

  constructor(
    private navCtrl: NavController,
    private authService: AuthenticationService,
    private db: AngularFireDatabase,
    private vegetableService: VegetableService,
    private vegetableJsonService: VegetableJsonService,
    private router: Router,
    public modalController: ModalController,
    private animationService: AnimationService
  ) {}
  vegList: any;
  ngOnInit() {}
  ionViewWillEnter() {
    // this.vegetableJsonService.getDatabyJson().then(res => {
    //   console.log(res);
    //   for (let i = 0; i < Object.keys(res).length; i++) {
    //     this.vegetableService.create(res[i]).then(resp => {

    //       console.log(resp);
    //     })
    //       .catch(error => {
    //         console.log(error);
    //       });

    //   }
    // });

    this.vegetableService.read().subscribe((res) => {
      this.dataSet = res.map((e) => {
        return {
          id: e.payload.doc.id,
          veg_type: e.payload.doc.data()['veg_type'],
          veg_name_th: e.payload.doc.data()['veg_name_th'],
          veg_name_cl: e.payload.doc.data()['veg_name_cl'],
          veg_name_sc: e.payload.doc.data()['veg_name_sc'],
          veg_struc: e.payload.doc.data()['veg_struc'],
          veg_useful: e.payload.doc.data()['veg_useful'],
          veg_plant: e.payload.doc.data()['veg_plant'],
          veg_cover: e.payload.doc.data()['veg_cover'],
          imgpath: e.payload.doc.data()['imgpath'],
        };
      });
      
      // console.log(this.dataSet);
    });
  }
  async gotoDetail(item) {
    const modal = await this.modalController.create({
      component: VegDetailPage,
      componentProps: { data: JSON.stringify(item) },
      cssClass: 'setting-modal',
    });
    return await modal.present();
  }
}
