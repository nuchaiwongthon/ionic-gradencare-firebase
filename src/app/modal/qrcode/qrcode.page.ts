import { ModalController } from '@ionic/angular';
import { Component, OnInit, Input } from '@angular/core';
import {
  Base64ToGallery,
  Base64ToGalleryOptions,
} from '@ionic-native/base64-to-gallery/ngx';
import { ToastService } from 'src/app/services/toast.service';
@Component({
  selector: 'app-qrcode',
  templateUrl: './qrcode.page.html',
  styleUrls: ['./qrcode.page.scss'],
})
export class QrcodePage implements OnInit {
  @Input() data;
  dataSet: any;
  elementType: 'url' | 'img' | 'canvas' = 'canvas';
  constructor(
    public modalController: ModalController,
    private base64ToGallery: Base64ToGallery,
    private toastService: ToastService
  ) {}

  ngOnInit() {
    this.dataSet = JSON.parse(this.data);
  }
  downloadQr() {
    const canvas = document.querySelector('canvas') as HTMLCanvasElement;
    const imageData = canvas.toDataURL('image/jpeg').toString();
    let data = imageData.split(',')[1];
    this.base64ToGallery
      .base64ToGallery(data, {
        prefix: '_img_' + this.dataSet.veg_name_th + '_',
        mediaScanner: true,
      })
      .then(
        (res) => {
          this.modalController.dismiss();
          this.toastService.toastSuccess('บันทึกเสร็จเรียบร้อย');
        },
        (err) => this.toastService.toastSuccess('บันทึกไม่สำเร็จ ' + err)
      );
  }
}
