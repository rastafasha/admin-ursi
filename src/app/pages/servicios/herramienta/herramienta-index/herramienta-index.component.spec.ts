import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HerramientaIndexComponent } from './herramienta-index.component';

describe('HerramientaIndexComponent', () => {
  let component: HerramientaIndexComponent;
  let fixture: ComponentFixture<HerramientaIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HerramientaIndexComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HerramientaIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
