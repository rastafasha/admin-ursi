import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnilloEditComponent } from './anillo-edit.component';

describe('AnilloEditComponent', () => {
  let component: AnilloEditComponent;
  let fixture: ComponentFixture<AnilloEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnilloEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnilloEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
