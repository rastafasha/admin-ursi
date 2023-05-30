import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CursosIndexComponent } from './cursos-index.component';

describe('CursosIndexComponent', () => {
  let component: CursosIndexComponent;
  let fixture: ComponentFixture<CursosIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CursosIndexComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CursosIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
