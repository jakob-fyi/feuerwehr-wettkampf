import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TimingPage } from './timing.page';

describe('TimingPage', () => {
  let component: TimingPage;
  let fixture: ComponentFixture<TimingPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimingPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TimingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
