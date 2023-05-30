import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DijeIndexComponent } from './dije-index.component';

describe('DijeIndexComponent', () => {
  let component: DijeIndexComponent;
  let fixture: ComponentFixture<DijeIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DijeIndexComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DijeIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
