# Getting started with ng-gallery

This guide explains how to set up your Angular project to begin using ng-gallery. It includes information on
prerequisites, installing Angular Material, and optionally displaying a sample Material component in your application to
verify your setup.

## Install ng-gallery

Use the terminal to install the package by running the following command:

```
npm i ng-gallery @angular/cdk
```

## Usage

1. Import `BrowserAnimationsModule` in the root module.
2. Import `CarouselModule` for Carousel usage

```ts
import { CarouselModule } from  'ng-gallery/next';

@NgModule({
  imports: [
    CarouselModule
  ]
})
class AppModule { }
```

Add the `<carousel>` tag to the `app.component.html` like so:

```html
<carousel></carousel>
```

Run your local dev server:

```
ng serve
```

Then point your browser to [http://localhost:4200](http://localhost:4200)

You should see the Carousel component on the page.

## Gesture support

ng-gallery relies on HammerJS for gestures, make sure it is loaded into the application.

You can add HammerJS to your application via [npm](https://www.npmjs.com/package/hammerjs),
a [CDN](https://developers.google.com/speed/libraries/#hammerjs) (such as the Google CDN), or served directly from your
app.

**NPM**

```
npm i hammerjs
```

After installing, import HammerJS into `src/polyfills.ts`

```ts
import 'hammerjs';
```

