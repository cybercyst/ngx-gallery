import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { CarouselNav } from './carousel-nav';
import { CarouselModule } from '../carousel.module';
import { Carousel } from '../carousel/carousel';

@Component({
  template: `
    <carousel>
      <carousel-nav></carousel-nav>
      <ng-template *ngFor="let item of items" carouselItem></ng-template>
    </carousel>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
class TestCarouselNavComponent {
  items = [null, null, null];
}


// @Component({
//   template: `
//     <carousel>
//       <carousel-nav>
//         <ng-template carouselNavNext>
//           <button carouselNavNextButton>Next</button>
//         </ng-template>
//         <ng-template carouselNavPrev>
//           <button carouselNavPrevButton>Prev</button>
//         </ng-template>
//       </carousel-nav>
//       <ng-template carouselItem></ng-template>
//       <ng-template carouselItem></ng-template>
//       <ng-template carouselItem></ng-template>
//     </carousel>
//   `,
//   changeDetection: ChangeDetectionStrategy.OnPush
// })
// class TestCustomCarouselNavComponent {
// }

describe('CarouselNavComponent', () => {
  let fixture: ComponentFixture<TestCarouselNavComponent>;
  let testComponent: TestCarouselNavComponent;

  let carouselComponent: Carousel;
  let carouselDebugElement: HTMLElement;

  let navComponent: CarouselNav;
  let navDebugElement: HTMLElement;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        ScrollingModule,
        CarouselModule
      ],
      declarations: [TestCarouselNavComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestCarouselNavComponent);
    testComponent = fixture.componentInstance;
    const cmpElement = fixture.debugElement.query(By.directive(Carousel));
    carouselDebugElement = cmpElement.nativeElement;
    carouselComponent = cmpElement.componentInstance;
    fixture.detectChanges();

    // Get the carousel nav after the carousel is initialized
    const navCmpElement = fixture.debugElement.query(By.directive(CarouselNav));
    navComponent = navCmpElement.componentInstance;
    navDebugElement = cmpElement.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(navComponent).toBeTruthy();
  });

  // it('should have next nav button enabled and prev button disabled', () => {
  // navComponent.state$.subscribe(state => {
  //   expect(state.hasPrev).toEqual(false);
  //   expect(state.hasNext).toEqual(false);
  // });

  //   expect(navComponent.state$.value.hasPrev).toEqual(false);
  //   expect(navComponent.state$.value.hasNext).toEqual(true);
  // });

  // it('should have both nav buttons disabled when there is not items', (done: DoneFn) => {
  // Clear items array
  // testComponent.items = [];
  // fixture.detectChanges();
  // expect(navComponent.state$.value.hasPrev).toEqual(false);
  // expect(navComponent.state$.value.hasNext).toEqual(false);
  //   navComponent.state$.subscribe(state => {
  //     console.log(state);
  //     expect(state.hasPrev).toEqual(false);
  //     expect(state.hasNext).toEqual(false);
  //     done();
  //   });
  // });

  it('should set the carousel-nav color using CSS variable', () => {
    const value = 'rgb(255, 255, 255)';
    carouselDebugElement.style.setProperty('--carousel-color', value);
    const elementColor = getComputedStyle(navDebugElement).getPropertyValue('color');
    expect(elementColor).toEqual(value);
  });
});
