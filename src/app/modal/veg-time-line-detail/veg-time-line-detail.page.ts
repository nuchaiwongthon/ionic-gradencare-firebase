import { OnInit, Component, Input } from '@angular/core';
import {
  CalendarComponentOptions,
  DayConfig,
  CalendarModalOptions,
} from 'ion2-calendar';
import * as moment from 'moment';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
@Component({
  selector: 'app-veg-time-line-detail',
  templateUrl: './veg-time-line-detail.page.html',
  styleUrls: ['./veg-time-line-detail.page.scss'],
})
export class VegTimeLineDetailPage implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    public modalController: ModalController
  ) {
    moment.locale('th');
  }
  @Input() data;
  date: string;
  type: 'moment';
  options: CalendarComponentOptions;
  dataSet: any = [];
  dataObject: any = {};
  ngOnInit() {}
  onChange($event) {
    console.log($event);
  }
  ionViewWillEnter() {
    let display;
    this.dataSet = [];
    const data = JSON.parse(this.data);
    let _daysConfig: DayConfig[] = [];
    // tslint:disable-next-line: prefer-for-of
    this.dataObject.veg_name = data.veg_name;
    for (let i = 0; i < data.calendar_event.length; i++) {
      _daysConfig.push({
        date: new Date(data.calendar_event[i].date),
        subTitle: data.calendar_event[i].type,
        cssClass: 'marker-days',
        marked: true,
      });
      if (i === data.calendar_event.length - 1) {
        display = 'none';
      } else {
        display = '';
      }
      this.dataSet.push({
        date: moment(data.calendar_event[i].date).format('ddd DD MMM YYYY'),
        type: data.calendar_event[i].type,
        detail: data.calendar_event[i].detail,
        display: display,
      });
    }
    this.options = {
      daysConfig: _daysConfig,
      pickMode: 'single',
      color: 'secondary',
      weekdays: [
        'อาทิตย์',
        'จันทร์',
        'อังคาร',
        'พุธ',
        'พฤหัสบดี',
        'ศุกร์',
        'เสาร์',
      ],
      showMonthPicker: false,
      showToggleButtons: true,
      monthPickerFormat: [
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
      ],
    };
  }
  closeModal() {
    this.modalController.dismiss();
  }
}
