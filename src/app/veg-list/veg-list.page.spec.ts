import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VegListPage } from './veg-list.page';

describe('VegListPage', () => {
  let component: VegListPage;
  let fixture: ComponentFixture<VegListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VegListPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(VegListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
