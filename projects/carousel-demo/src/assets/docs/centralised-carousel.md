The `[lightbox]` service can be used to open modal dialogs with Material Design styling and animations.

<!-- example(ExampleCentralisedCarouselComponent) -->

```ts
@ViewChild('domPortalContent') domPortalContent: ElementRef<HTMLElement>;
ngAfterViewInit() {
  this.domPortal = new DomPortal(this.domPortalContent);
}
```

