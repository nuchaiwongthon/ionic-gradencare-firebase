import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VegDetailPage } from './veg-detail.page';

describe('VegDetailPage', () => {
  let component: VegDetailPage;
  let fixture: ComponentFixture<VegDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VegDetailPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(VegDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
