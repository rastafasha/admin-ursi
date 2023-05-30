import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PulseraEditComponent } from './pulsera-edit.component';

describe('PulseraEditComponent', () => {
  let component: PulseraEditComponent;
  let fixture: ComponentFixture<PulseraEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PulseraEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PulseraEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
