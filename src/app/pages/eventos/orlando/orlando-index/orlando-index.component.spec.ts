import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrlandoIndexComponent } from './orlando-index.component';

describe('OrlandoIndexComponent', () => {
  let component: OrlandoIndexComponent;
  let fixture: ComponentFixture<OrlandoIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrlandoIndexComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrlandoIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
