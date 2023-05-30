import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CronogramaEditComponent } from './cronograma-edit.component';

describe('CronogramaEditComponent', () => {
  let component: CronogramaEditComponent;
  let fixture: ComponentFixture<CronogramaEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CronogramaEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CronogramaEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
