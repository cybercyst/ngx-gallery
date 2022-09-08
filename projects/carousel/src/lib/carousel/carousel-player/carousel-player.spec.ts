import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { BehaviorSubject } from 'rxjs';
import { CarouselModule } from '../carousel.module';
import { Carousel } from '../carousel/carousel';
import { CarouselPlayer } from './carousel-player';

@Component({
  template: `
  <carousel>
    <carousel-player></carousel-player>
    <ng-template *ngFor="let item of items$ | async" carouselItem></ng-template>
  </carousel>
`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
class TestCarouselPlayerComponent {
  items$ = new BehaviorSubject([]);

  setItems(n: number) {
    this.items$.next(new Array(n));
  }
}

describe('CarouselPlayer', () => {
  let fixture: ComponentFixture<TestCarouselPlayerComponent>;
  let testComponent: TestCarouselPlayerComponent;

  let carouselComponent: Carousel;
  let carouselDebugElement: HTMLElement;

  let playerComponent: CarouselPlayer;
  let playerDebugElement: HTMLElement;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        ScrollingModule,
        CarouselModule,
        NoopAnimationsModule
      ],
      declarations: [TestCarouselPlayerComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestCarouselPlayerComponent);
    testComponent = fixture.componentInstance;
    const cmpElement = fixture.debugElement.query(By.directive(Carousel));
    carouselDebugElement = cmpElement.nativeElement;
    carouselComponent = cmpElement.componentInstance;
    fixture.detectChanges();

    // Get the carousel dots after the carousel is initialized
    const playerCmpElement = fixture.debugElement.query(By.directive(CarouselPlayer));
    playerComponent = playerCmpElement.componentInstance;
    playerDebugElement = cmpElement.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(playerComponent).toBeTruthy();
  });
});
