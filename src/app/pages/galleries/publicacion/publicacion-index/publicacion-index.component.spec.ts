import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicacionIndexComponent } from './publicacion-index.component';

describe('PublicacionIndexComponent', () => {
  let component: PublicacionIndexComponent;
  let fixture: ComponentFixture<PublicacionIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PublicacionIndexComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PublicacionIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
