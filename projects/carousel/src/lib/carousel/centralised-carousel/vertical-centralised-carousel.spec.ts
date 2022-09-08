import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChangeDetectionStrategy, Component, DebugElement } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { CarouselModule } from '../carousel.module';
import { VerticalCentralisedCarousel } from './vertical-centralised-carousel';
import { CAROUSEL_ORIENTATION } from '../carousel.model';

@Component({
  template: `
    <div style="height: 600px">
      <vertical-centralised-carousel style="height: 300px;">
        <ng-template *ngFor="let item of templateItems$ | async" carouselItem></ng-template>
      </vertical-centralised-carousel>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
class TestCarouselComponent {
  templateItems$ = new BehaviorSubject(null);

  setItems(n: number) {
    this.templateItems$.next(new Array(n));
  }
}

describe('[Vertical] CentralisedCarousel', () => {
  let component: VerticalCentralisedCarousel;
  let debugElement: DebugElement;
  let fixture: ComponentFixture<VerticalCentralisedCarousel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestCarouselComponent],
      imports: [CarouselModule]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerticalCentralisedCarousel);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    component.itemWidth = 60;
    component.itemHeight = 40;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create with vertical properties', () => {
    expect(component.orientation).toBe(CAROUSEL_ORIENTATION.Vertical);
    expect(component.itemSize).toBe(40);
    expect(debugElement.styles.width).toBe('60px');
    expect(debugElement.styles.height).toBe('100%');
  });

  it('should return a valid vertical transform value', () => {
    expect(component['getTransformValue'](10)).toEqual({ transform: `translate3d(0, 10px, 0)` });
  });

  it('[host.size < items.size] should set wrapper size to host size', () => {
    debugElement.styles.height = '300px';
    expect(component['getDisplayedSize'](10)).toEqual(300);
    expect(component['getContainerStyles'](10)).toEqual({
      width: '60px',
      height: '300px'
    });
  });

  // it('[host.size > items.size] and [maxShownItems < items.count] should set wrapper size to maxShownItems size', fakeAsync(() => {
  //     component.maxShownItems = 6;
  //     tick(500);
  //     expect(component['getDisplayedSize'](10)).toEqual(360);
  //     expect(component['getContainerStyles'](10)).toEqual({
  //       width: '60px',
  //       height: '360px'
  //     });
  //   }
  // ));
  //
  // it('[host.size > items.size] and [maxShownItems > items.count] should set wrapper size to the items size', fakeAsync(() => {
  //     tick(500);
  //     expect(component['getDisplayedSize'](10)).toEqual(400);
  //     expect(component['getContainerStyles'](10)).toEqual({
  //       width: '60px',
  //       height: '600px'
  //     });
  //   }
  // ));
});
