The `<carousel>` is a slideshow component for cycling through slides of images, videos, components or any type of HTML content.

The carousel organize content into separate views where only one view can be visible at a time.

<!-- example(ExampleCarouselComponent) -->

Add carousel item by add a template with the `carousel-item` directive inside the `carousel`.

```html
<carousel>
  <ng-template carouselItem> Content 1 </ng-template>
  <ng-template carouselItem> Content 2 </ng-template>
  <ng-template carouselItem> Content 3 </ng-template>
</carousel>
```

You can customize the template of the item easily using as of item so easily using 


```html
<carousel>
  <ng-container *ngFor="let item of items; index as i">
    <ng-template carouselItem>
      <div class="test-item"
           [style.background]="'linear-gradient(to right top, ' + item.color1 + ',' + item.color2 + ')'">
        {{ i + 1 }}
      </div>
    </ng-template>
  </ng-container>
</carousel>
```

#### Multiple elements

<!-- example(ExampleMultipleItemCarouselComponent) -->


<!-- example(ExampleCarouselImageComponent) -->
