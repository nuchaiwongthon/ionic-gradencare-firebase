import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VegDiagnosisPage } from './veg-diagnosis.page';

describe('VegDiagnosisPage', () => {
  let component: VegDiagnosisPage;
  let fixture: ComponentFixture<VegDiagnosisPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VegDiagnosisPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(VegDiagnosisPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
