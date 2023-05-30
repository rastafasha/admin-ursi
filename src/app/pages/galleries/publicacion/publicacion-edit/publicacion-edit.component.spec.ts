import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicacionEditComponent } from './publicacion-edit.component';

describe('PublicacionEditComponent', () => {
  let component: PublicacionEditComponent;
  let fixture: ComponentFixture<PublicacionEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PublicacionEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PublicacionEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
