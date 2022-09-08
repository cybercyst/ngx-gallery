import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { SimpleChange } from '@angular/core';
import { ScrollingModule } from '@angular/cdk/scrolling';

import { CentralisedSlider } from './centralised-slider';
import { CAROUSEL_ORIENTATION } from '../../carousel.model';

describe('CentralisedSlider', () => {
  let component: CentralisedSlider;
  let fixture: ComponentFixture<CentralisedSlider>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CentralisedSlider],
      imports: [ScrollingModule]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CentralisedSlider);
    component = fixture.componentInstance;
    component.state = {
      pages: [null, null, null]
    };
    component.itemWidth = 60;
    component.itemHeight = 40;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('scroll viewport on offset changes', fakeAsync(() => {
      spyOn(component.viewport, 'scrollToOffset');

      component.ngOnChanges({
        scrollOffset: new SimpleChange(null, 350, false)
      });
      // Wait for requestAnimationFrame, 16 is the magic number
      // https://stackoverflow.com/questions/50278730/what-are-options-to-unit-test-requestanimationframe-in-angular
      tick(16);
      expect(component.viewport.scrollToOffset).toHaveBeenCalledWith(350, undefined);
    }
  ));

  it('DONT scroll viewport if offset curr value === prev value', () => {
    spyOn(component.viewport, 'scrollToOffset');
    // Offset undefined
    component.ngOnChanges({
      scrollOffset: new SimpleChange(250, 250, false)
    });
    expect(component.viewport.scrollToOffset).not.toHaveBeenCalled();
  });

  it('DONT scroll viewport on offset first change', () => {
    spyOn(component.viewport, 'scrollToOffset');
    component.ngOnChanges({
      scrollOffset: new SimpleChange(null, null, true)
    });
    expect(component.viewport.scrollToOffset).not.toHaveBeenCalled();
  });

  it('should use item width if orientation is horizontal', () => {
    component.orientation = CAROUSEL_ORIENTATION.Horizontal;
    expect(component.itemSize).toBe(60);
  });

  it('should use item height if orientation is vertical', () => {
    component.orientation = CAROUSEL_ORIENTATION.Vertical;
    expect(component.itemSize).toBe(40);
  });
});
