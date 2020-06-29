import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VegTimeLineDetailPage } from './veg-time-line-detail.page';

describe('VegTimeLineDetailPage', () => {
  let component: VegTimeLineDetailPage;
  let fixture: ComponentFixture<VegTimeLineDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VegTimeLineDetailPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(VegTimeLineDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
