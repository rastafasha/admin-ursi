import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubcripcionesComponent } from './subcripciones.component';

describe('SubcripcionesComponent', () => {
  let component: SubcripcionesComponent;
  let fixture: ComponentFixture<SubcripcionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubcripcionesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubcripcionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
