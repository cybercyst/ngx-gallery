import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarouselThumbs } from './carousel-thumbs';

describe('CarouselThumbs', () => {
  let component: CarouselThumbs;
  let fixture: ComponentFixture<CarouselThumbs>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CarouselThumbs]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarouselThumbs);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
