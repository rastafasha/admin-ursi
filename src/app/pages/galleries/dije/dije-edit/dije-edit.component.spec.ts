import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DijeEditComponent } from './dije-edit.component';

describe('DijeEditComponent', () => {
  let component: DijeEditComponent;
  let fixture: ComponentFixture<DijeEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DijeEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DijeEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
