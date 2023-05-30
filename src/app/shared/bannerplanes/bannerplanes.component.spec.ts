import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BannerplanesComponent } from './bannerplanes.component';

describe('BannerplanesComponent', () => {
  let component: BannerplanesComponent;
  let fixture: ComponentFixture<BannerplanesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BannerplanesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BannerplanesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
