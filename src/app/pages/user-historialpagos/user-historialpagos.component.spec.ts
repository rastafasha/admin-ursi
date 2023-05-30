import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserHistorialpagosComponent } from './user-historialpagos.component';

describe('UserHistorialpagosComponent', () => {
  let component: UserHistorialpagosComponent;
  let fixture: ComponentFixture<UserHistorialpagosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserHistorialpagosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserHistorialpagosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
