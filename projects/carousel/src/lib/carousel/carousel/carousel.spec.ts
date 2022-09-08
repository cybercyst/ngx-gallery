import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ChangeDetectionStrategy, Component, QueryList, ViewChildren } from '@angular/core';
import { By } from '@angular/platform-browser';
import { BehaviorSubject } from 'rxjs';

import { Carousel } from './carousel';
import { CAROUSEL_CONFIG, CAROUSEL_MODE, CAROUSEL_ORIENTATION, CarouselConfig } from '../carousel.model';
import { CarouselModule } from '../carousel.module';
import { CarouselItemDirective } from '../../directives/carousel-item';

const defaultConfig: CarouselConfig = {
  loop: false,
  perPage: 1,
  sensorDisabled: false,
  cacheSize: 20,
  animated: false,
  gestures: true,
  panSensitivity: 25,
  mode: CAROUSEL_MODE.Strict,
  orientation: CAROUSEL_ORIENTATION.Horizontal
};

const customConfig: CarouselConfig = {
  orientation: CAROUSEL_ORIENTATION.Vertical
};

@Component({
  template: `
    <carousel>
      <ng-template *ngFor="let item of templateItems$ | async" carouselItem></ng-template>
    </carousel>

    <ng-template *ngFor="let item of externalItems$ | async" carouselItem></ng-template>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
class TestCarouselComponent {
  templateItems$ = new BehaviorSubject(null);
  externalItems$ = new BehaviorSubject(null);

  @ViewChildren(CarouselItemDirective) externalItemsQueryList: QueryList<CarouselItemDirective>;

  setTemplateItems(n: number) {
    this.externalItems$.next(null);
    this.templateItems$.next(new Array(n));
  }
}

describe('CarouselComponent', () => {
  let fixture: ComponentFixture<TestCarouselComponent>;
  let testComponent: TestCarouselComponent;
  let component: Carousel;
  let debugElement: HTMLElement;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [CarouselModule],
      declarations: [TestCarouselComponent],
      providers: [
        { provide: CAROUSEL_CONFIG, useValue: customConfig }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestCarouselComponent);
    testComponent = fixture.componentInstance;
    const cmpElement = fixture.debugElement.query(By.directive(Carousel));
    debugElement = cmpElement.nativeElement;
    component = cmpElement.componentInstance;
    fixture.detectChanges();
  });

  it('should create component and carouselRef', () => {
    expect(component).toBeDefined();
    expect(component.carouselRef).toBeDefined();
  });

  it('should initialize carousel options with the default config', () => {
    expect(component['config']).toEqual({ ...defaultConfig, ...customConfig });

    // Check if all input has the same values as in the config
    Object.entries(component['config']).forEach(([key, value]) => {
      expect(component[key]).toBe(value);
    });
  });

  it('should set the configuration on ngOnChanges', () => {
    // Check if carouselRef load the items from the input on changes
    spyOn(component.carouselRef, 'configure');
    component.ngOnChanges({});
    expect(component.carouselRef.configure).toHaveBeenCalledWith({
      loop: component.loop,
      perPage: component.perPage
    });
  });

  it('[LOAD ITEMS]: should load the items reactively using by the QueryList method', (done: DoneFn) => {
    spyOn(component.carouselRef, 'load');
    let n = 3;
    testComponent.setTemplateItems(n);
    fixture.detectChanges();

    component.contentItems.changes.subscribe(() => {
      expect(component.carouselRef.load).toHaveBeenCalledWith(component.contentItems.toArray(), component.selectedPage);
      expect(component.contentItems.length).toBe(n);
      if (n === 3) {
        n = 15;
        testComponent.setTemplateItems(n);
        fixture.detectChanges();
      } else {
        done();
      }
    });
    component.ngAfterContentInit();
  });

  /**
   * Gallery integration
   */
  // it('[LOAD ITEMS]: should load items into the carousel using the items input', () => {
  //   // Check if carouselRef load the items from the input on changes
  //   spyOn(component.carouselRef, 'load');
  //   let n = 10;
  //   testComponent.setExternalItems(n);
  //   fixture.detectChanges();
  //
  //   // Trigger on input change
  //   component.ngOnChanges({
  //     items: new SimpleChange(null, component.items, false)
  //   });
  //   fixture.detectChanges();
  //   expect(component.items.length).toBe(n);
  //   expect(component.carouselRef.load).toHaveBeenCalledWith(component.items, component.selectedPage?.index);
  //
  //   // Change the items
  //   n = 5;
  //   testComponent.setExternalItems(n);
  //   fixture.detectChanges();
  //
  //   // Trigger on input change again
  //   component.ngOnChanges({
  //     items: new SimpleChange(null, component.items, false)
  //   });
  //   fixture.detectChanges();
  //   expect(component.items.length).toBe(n);
  //   expect(component.carouselRef.load).toHaveBeenCalledWith(component.items, component.selectedPage?.index);
  // });

  it('[CSS variable]: should set the carousel border radius using CSS variable', () => {
    const value = '4px';
    debugElement.style.setProperty('--carousel-border-radius', value);
    const elementBorderRadius = getComputedStyle(debugElement).getPropertyValue('border-radius');
    expect(elementBorderRadius).toEqual(value);
  });

  it('[CSS variable]: should set the carousel color using CSS variable', () => {
    const value = 'rgb(255, 255, 255)';
    debugElement.style.setProperty('--carousel-color', value);
    const elementColor = getComputedStyle(debugElement).getPropertyValue('color');
    expect(elementColor).toEqual(value);
  });
});
