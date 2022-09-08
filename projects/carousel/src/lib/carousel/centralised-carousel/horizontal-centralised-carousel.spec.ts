import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ChangeDetectionStrategy, Component, DebugElement } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { CarouselModule } from '../carousel.module';
import { HorizontalCentralisedCarousel } from './horizontal-centralised-carousel';
import { CAROUSEL_ORIENTATION } from '../carousel.model';

@Component({
  template: `
    <horizontal-centralised-carousel>
      <ng-template *ngFor="let item of templateItems$ | async" carouselItem></ng-template>
    </horizontal-centralised-carousel>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
class TestCarouselComponent {
  templateItems$ = new BehaviorSubject(null);

  setTemplateItems(n: number) {
    this.templateItems$.next(new Array(n));
  }
}

describe('[Horizontal] CentralisedCarousel', () => {
  let component: HorizontalCentralisedCarousel;
  let debugElement: DebugElement;
  let fixture: ComponentFixture<HorizontalCentralisedCarousel>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [TestCarouselComponent],
      imports: [CarouselModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HorizontalCentralisedCarousel);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    component.itemWidth = 60;
    component.itemHeight = 40;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create with horizontal properties', () => {
    expect(component).toBeTruthy();
    expect(component.orientation).toBe(CAROUSEL_ORIENTATION.Horizontal);
    expect(component.itemSize).toBe(60);
    expect(debugElement.styles.width).toBe('100%');
    expect(debugElement.styles.height).toBe('40px');
  });

  it('should return a valid horizontal transform value', () => {
    expect(component['getTransformValue'](10)).toEqual({ transform: `translate3d(10px, 0, 0)` });
  });

  it('[host.size < items.size] should set wrapper size to host size', () => {
    debugElement.styles.width = '300px';
    expect(component['getDisplayedSize'](10)).toEqual(300);
    expect(component['getContainerStyles'](10)).toEqual({
      width: '300px',
      height: '40px'
    });
  });

  it('[host.size > items.size] and [maxShownItems < items.count] should set wrapper size to maxShownItems size', () => {
    component.maxShownItems = 6;
    expect(component['getDisplayedSize'](10)).toEqual(360);
    expect(component['getContainerStyles'](10)).toEqual({
      width: '360px',
      height: '40px'
    });
  });

  it('[host.size > items.size] and [maxShownItems > items.count] should set wrapper size to the items size', () => {
    expect(component['getDisplayedSize'](10)).toEqual(600);
    expect(component['getContainerStyles'](10)).toEqual({
      width: '600px',
      height: '40px'
    });
  });
});
