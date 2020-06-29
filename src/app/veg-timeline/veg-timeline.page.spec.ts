import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VegTimelinePage } from './veg-timeline.page';

describe('VegTimelinePage', () => {
  let component: VegTimelinePage;
  let fixture: ComponentFixture<VegTimelinePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VegTimelinePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(VegTimelinePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
