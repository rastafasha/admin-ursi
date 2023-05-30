import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiciosIndexComponent } from './servicios-index.component';

describe('ServiciosIndexComponent', () => {
  let component: ServiciosIndexComponent;
  let fixture: ComponentFixture<ServiciosIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServiciosIndexComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServiciosIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
