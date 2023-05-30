import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AreteIndexComponent } from './arete-index.component';

describe('AreteIndexComponent', () => {
  let component: AreteIndexComponent;
  let fixture: ComponentFixture<AreteIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AreteIndexComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AreteIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
