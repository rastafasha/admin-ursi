import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HerramientaEditComponent } from './herramienta-edit.component';

describe('HerramientaEditComponent', () => {
  let component: HerramientaEditComponent;
  let fixture: ComponentFixture<HerramientaEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HerramientaEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HerramientaEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
