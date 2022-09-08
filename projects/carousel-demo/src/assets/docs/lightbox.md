The `[lightbox]` service can be used to open modal dialogs with Material Design styling and animations.

```ts
@ViewChild('domPortalContent') domPortalContent: ElementRef<HTMLElement>;
ngAfterViewInit() {
  this.domPortal = new DomPortal(this.domPortalContent);
}
```

<!-- example(ExampleMaterialComponent) -->


The `[lightbox]` service can be used to open modal dialogs with Material Design styling and animations.


<!-- example(ExampleLightboxCustomComponent) -->

Navigation using Keyboard is possible
