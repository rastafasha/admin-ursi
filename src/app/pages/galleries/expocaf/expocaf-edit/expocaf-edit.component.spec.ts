import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpocafEditComponent } from './expocaf-edit.component';

describe('ExpocafEditComponent', () => {
  let component: ExpocafEditComponent;
  let fixture: ComponentFixture<ExpocafEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpocafEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExpocafEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
