import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VegSettingPage } from './veg-setting.page';

describe('VegSettingPage', () => {
  let component: VegSettingPage;
  let fixture: ComponentFixture<VegSettingPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VegSettingPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(VegSettingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
