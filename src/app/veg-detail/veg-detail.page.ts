import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import {
  BarcodeScannerOptions,
  BarcodeScanner,
} from '@ionic-native/barcode-scanner/ngx';
import { QrcodePage } from '../modal/qrcode/qrcode.page';

@Component({
  selector: 'app-veg-detail',
  templateUrl: './veg-detail.page.html',
  styleUrls: ['./veg-detail.page.scss'],
})
export class VegDetailPage implements OnInit {
  constructor(
    public modalController: ModalController,

    private barcodeScanner: BarcodeScanner
  ) {}
  dataSet: any;
  @Input() data;
  encodeData: any;
  scannedData: {};
  barcodeScannerOptions: BarcodeScannerOptions;
  ngOnInit() {}
  ionViewWillEnter() {
    this.barcodeScannerOptions = {
      showTorchButton: true,
      showFlipCameraButton: true,
    };
    this.dataSet = JSON.parse(this.data);
  }
  closeModal() {
    this.modalController.dismiss();
  }
  async generateQr() {
    const modal = await this.modalController.create({
      component: QrcodePage,
      componentProps: { data: JSON.stringify(this.dataSet) },
      cssClass: 'setting-modal-sm',
    });
    return await modal.present();
  }

}
