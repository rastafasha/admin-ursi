import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JoyaEditComponent } from './joya-edit.component';

describe('JoyaEditComponent', () => {
  let component: JoyaEditComponent;
  let fixture: ComponentFixture<JoyaEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JoyaEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JoyaEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
