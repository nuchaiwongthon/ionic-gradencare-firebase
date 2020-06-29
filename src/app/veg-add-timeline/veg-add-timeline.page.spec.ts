import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VegAddTimelinePage } from './veg-add-timeline.page';

describe('VegAddTimelinePage', () => {
  let component: VegAddTimelinePage;
  let fixture: ComponentFixture<VegAddTimelinePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VegAddTimelinePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(VegAddTimelinePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
