import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CronogramaIndexComponent } from './cronograma-index.component';

describe('CronogramaIndexComponent', () => {
  let component: CronogramaIndexComponent;
  let fixture: ComponentFixture<CronogramaIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CronogramaIndexComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CronogramaIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
