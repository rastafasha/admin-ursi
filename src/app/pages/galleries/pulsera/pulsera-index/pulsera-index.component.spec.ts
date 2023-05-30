import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PulseraIndexComponent } from './pulsera-index.component';

describe('PulseraIndexComponent', () => {
  let component: PulseraIndexComponent;
  let fixture: ComponentFixture<PulseraIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PulseraIndexComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PulseraIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
