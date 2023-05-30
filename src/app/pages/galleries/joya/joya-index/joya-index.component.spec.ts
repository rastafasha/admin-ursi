import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JoyaIndexComponent } from './joya-index.component';

describe('JoyaIndexComponent', () => {
  let component: JoyaIndexComponent;
  let fixture: ComponentFixture<JoyaIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JoyaIndexComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JoyaIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
