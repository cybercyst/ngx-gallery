import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { BehaviorSubject } from 'rxjs';
import { CarouselDots } from './carousel-dots';
import { CarouselModule } from '../carousel.module';
import { Carousel } from '../carousel/carousel';

@Component({
  template: `
    <carousel>
      <carousel-dots></carousel-dots>
      <ng-template *ngFor="let item of items$ | async" carouselItem></ng-template>
    </carousel>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
class TestCarouselDotsComponent {
  items$ = new BehaviorSubject([]);

  setItems(n: number) {
    this.items$.next(new Array(n));
  }
}


describe('CarouselDots', () => {
  let fixture: ComponentFixture<TestCarouselDotsComponent>;
  let testComponent: TestCarouselDotsComponent;

  let carouselComponent: Carousel;
  let carouselDebugElement: HTMLElement;

  let dotsComponent: CarouselDots;
  let dotsDebugElement: HTMLElement;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        ScrollingModule,
        CarouselModule
      ],
      declarations: [TestCarouselDotsComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestCarouselDotsComponent);
    testComponent = fixture.componentInstance;
    const cmpElement = fixture.debugElement.query(By.directive(Carousel));
    carouselDebugElement = cmpElement.nativeElement;
    carouselComponent = cmpElement.componentInstance;
    fixture.detectChanges();

    // Get the carousel dots after the carousel is initialized
    const dotCmpElement = fixture.debugElement.query(By.directive(CarouselDots));
    dotsComponent = dotCmpElement.componentInstance;
    dotsDebugElement = cmpElement.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(dotsComponent).toBeTruthy();
  });

  // it('should set carousel item and emit the index to itemClick output on an item is clicked', () => {
  //   spyOn(dotsComponent.host.carouselRef, 'setItem');
  //   spyOn(dotsComponent.itemClick, 'emit');
  //
  //   dotsComponent.animated = true;
  //   dotsComponent.onItemClick(5);
  //
  //   expect(dotsComponent.host.carouselRef.setItem).toHaveBeenCalledWith({
  //     index: 5,
  //     behavior: CAROUSEL_BEHAVIOR.Smooth
  //   });
  //   expect(dotsComponent.onItemClick).toHaveBeenCalledWith(5);
  // });

  // it('should not display carousel dots if carousel has no items', () => {
  //   expect(dotsDebugElement.querySelector('.carousel-dots')).toBeNull();
  // });
  //
  // it('should display carousel dots that contains the same count of the carousel pages', () => {
  //   testComponent.setItems(10);
  //   dotsComponent.position = 'top';
  //   dotsComponent.dotWidth = 30;
  //   dotsComponent.dotHeight = 30;
  //   fixture.detectChanges();
  //
  //   // Check if the elements is rendered properly
  //   expect(dotsDebugElement.querySelector('.carousel-dots')).toBeTruthy();
  //   expect(dotsDebugElement.querySelector('.carousel-dots-centralizer')).toBeTruthy();
  //   expect(dotsComponent.viewport).toBeTruthy();
  //   expect(dotsComponent.viewport.getDataLength()).toBe(10);
  // });

  // it('should display horizontal carousel dots', () => {
  //   dotsComponent.position = 'top';
  //   dotsComponent.maxShownItems = 10;
  //   dotsComponent.dotWidth = 30;
  //   dotsComponent.dotHeight = 20;
  //   testComponent.setItems(10);
  //   fixture.detectChanges();
  //
  //   expect(dotsComponent.itemSize).toBe(30);
  //
  //   const containerStyles = getComputedStyle(dotsDebugElement.querySelector('.carousel-dots'));
  //   expect(containerStyles.maxWidth).toBe('300px');
  //   expect(containerStyles.maxHeight).toBe('20px');
  // });
  //
  // it('should display vertical carousel dots', () => {
  //   dotsComponent.position = 'left';
  //   dotsComponent.maxShownItems = 10;
  //   dotsComponent.dotWidth = 30;
  //   dotsComponent.dotHeight = 20;
  //   testComponent.setItems(10);
  //   fixture.detectChanges();
  //
  //   expect(dotsComponent.itemSize).toBe(20);
  //
  //   const containerStyles = getComputedStyle(dotsDebugElement.querySelector('.carousel-dots'));
  //   expect(containerStyles.maxWidth).toBe('30px');
  //   expect(containerStyles.maxHeight).toBe('200px');
  // });
  //
  // it('[DisplayedCount] should use the carousel pages count if it is smaller than the "displayedCount" input value', () => {
  //   testComponent.setItems(3);
  //   dotsComponent.maxShownItems = 10;
  //   expect(dotsComponent.getDisplayedCount(3)).toBe(3);
  // });
  //
  // it('[DisplayedCount] should use the "displayedCount" input value if its greater than carousel pages count', () => {
  //   testComponent.setItems(30);
  //   dotsComponent.maxShownItems = 10;
  //   expect(dotsComponent.getDisplayedCount(30)).toBe(10);
  // });

  // it('[Centralize] should ...', () => {
  // const centralizer: HTMLElement = dotsDebugElement.querySelector('.carousel-dots-centralizer');
  // const centralizerStyles = getComputedStyle(centralizer);
  // expect(containerStyles.transform).toBe(`${ dotsComponent.dotWidth * dotsComponent.displayedCount }px`);
  // });
});
