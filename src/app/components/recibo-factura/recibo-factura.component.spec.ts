import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReciboFacturaComponent } from './recibo-factura.component';

describe('ReciboFacturaComponent', () => {
  let component: ReciboFacturaComponent;
  let fixture: ComponentFixture<ReciboFacturaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReciboFacturaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReciboFacturaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
