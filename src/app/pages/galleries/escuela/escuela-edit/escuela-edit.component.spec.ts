import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EscuelaEditComponent } from './escuela-edit.component';

describe('EscuelaEditComponent', () => {
  let component: EscuelaEditComponent;
  let fixture: ComponentFixture<EscuelaEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EscuelaEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EscuelaEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
