import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagosRecientesComponent } from './pagos-recientes.component';

describe('PagosRecientesComponent', () => {
  let component: PagosRecientesComponent;
  let fixture: ComponentFixture<PagosRecientesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PagosRecientesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PagosRecientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
