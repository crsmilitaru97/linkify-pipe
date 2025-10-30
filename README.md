# @crs/linkify

A lightweight utility that detects and converts plain text URLs into clickable HTML links.

## Install

```sh
npm install @crs/linkify
```

## Use

```ts
// app.component.ts
import { Component } from '@angular/core';
import { LinkifyPipe } from '@crs/linkify';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [LinkifyPipe],
  templateUrl: './app.component.html'
})
export class AppComponent {
  text = 'Visit https://angular.dev';
}
```

```html
<!-- app.component.html -->
<span [innerHTML]="text | linkify"></span>
```