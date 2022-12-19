import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { SimpleChange } from '@angular/core';
import { CarouselModule } from '../../carousel.module';
import { Slider } from './slider';
import { CAROUSEL_ORIENTATION } from '../../carousel.model';
import { VerticalSliderAdapter } from './slider.adapter';

describe('Slider', () => {
  let component: Slider;
  let fixture: ComponentFixture<Slider>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [CarouselModule],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(Slider);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeDefined();
    expect(component.viewport).toBeDefined();
  });

  it('should activate the gestures', () => {
    spyOn(component, 'activateGestures' as any);
    component.gestures = true;
    component.ngOnChanges({
      gestures: new SimpleChange(false, true, false),
    });
    expect(component['activateGestures']).toHaveBeenCalled();
  });

  it('should set slider orientation', () => {
    component.orientation = CAROUSEL_ORIENTATION.Vertical;
    component.ngOnChanges({
      orientation: new SimpleChange(
        CAROUSEL_ORIENTATION.Horizontal,
        CAROUSEL_ORIENTATION.Vertical,
        false
      ),
    });
    expect(component.adapter).toBeInstanceOf(VerticalSliderAdapter);
  });

  it('should scroll to active page', () => {
    spyOn(component.viewport, 'scrollToIndex');
    component.state = { activePage: 5, behavior: 'smooth' };
    component.ngOnChanges({
      state: new SimpleChange({ activePage: 1 }, { activePage: 5 }, false),
    });
    expect(component.viewport.scrollToIndex).toHaveBeenCalledWith(5, 'smooth');
  });

  it('should set initial active page', () => {
    spyOn(component.viewport, 'scrollToIndex');
    component.state = { activePage: 3, behavior: 'auto' };
    component.ngOnChanges({
      state: new SimpleChange( null, { activePage: 3, behavior: 'auto' }, false)
    });
    expect(component.viewport.scrollToIndex).toHaveBeenCalledWith(3, 'auto');
  });
});
