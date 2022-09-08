import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarouselLayer } from './carousel-layer';

describe('CarouselLayerComponent', () => {
  let component: CarouselLayer;
  let fixture: ComponentFixture<CarouselLayer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarouselLayer ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarouselLayer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
