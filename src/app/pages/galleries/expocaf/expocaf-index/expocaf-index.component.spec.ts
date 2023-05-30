import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpocafIndexComponent } from './expocaf-index.component';

describe('ExpocafIndexComponent', () => {
  let component: ExpocafIndexComponent;
  let fixture: ComponentFixture<ExpocafIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpocafIndexComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExpocafIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
