import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnilloIndexComponent } from './anillo-index.component';

describe('AnilloIndexComponent', () => {
  let component: AnilloIndexComponent;
  let fixture: ComponentFixture<AnilloIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnilloIndexComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnilloIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
