import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiciosEditComponent } from './servicios-edit.component';

describe('ServiciosEditComponent', () => {
  let component: ServiciosEditComponent;
  let fixture: ComponentFixture<ServiciosEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServiciosEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServiciosEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
