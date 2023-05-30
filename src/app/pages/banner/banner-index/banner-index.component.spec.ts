import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BannerIndexComponent } from './banner-index.component';

describe('BannerIndexComponent', () => {
  let component: BannerIndexComponent;
  let fixture: ComponentFixture<BannerIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BannerIndexComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BannerIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
