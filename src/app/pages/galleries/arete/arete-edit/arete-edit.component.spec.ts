import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AreteEditComponent } from './arete-edit.component';

describe('AreteEditComponent', () => {
  let component: AreteEditComponent;
  let fixture: ComponentFixture<AreteEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AreteEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AreteEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
