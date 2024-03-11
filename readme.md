
# Scroll Spy library
Hi guys, welcome to this repository. I created a light-weight Scroll Spy library that you could fully customize with CSS. It's usage is really easy. 

Let's see how we can use it.


## Installation

Install it by using one of these commands:


npm:
```bash
  npm install --save @webpg/scroll-spy
```

yarn:
```bash
  yarn add @webpg/scroll-spy
```
## Usage/Examples

For navigation links just add `data-wp-link` attribute to any html element you want.

and for HTML element that you wnat to scroll to it, add `data-wg-section` attribute.

> Note: `data-wp-link` prop must start with `#`, like `#something`.

```html
<div>
    <span data-wg-link="#section-one">section one</span> |
    <span data-wg-link="#section-two">section two</span> |
    <span data-wg-link="#section-three">section three</span> |
    <span data-wg-link="#section-foure">section-foure</span> |
    <span data-wg-link="#section-five">section-five</span>
</div>


<section
  data-wg-section="section-one"
  style="background-color: #2a9d8f"></section>

<section
  data-wg-section="section-two"
  style="background-color: #e9c46a"></section>

<section
  data-wg-section="section-three"
  style="background-color: #e76f51"></section>

<section
  data-wg-section="section-foure"
  style="background-color: #264653"></section>
  
<section
  data-wg-section="section-five"
  style="background-color: #f4a261"></section>

```

At last, in your JS file, just import the `ScrollSpy` class and instantiate it.

```javascript
import { ScrollSpy } from "@webpg/scroll-spy"

new ScrollSpy()

```

If you want to change the scroll animation duration, just pass the duration time you want as an argument to `ScrollSpy()` like this:

```javascript
new ScrollSpy(7000) // Now animation takes 7s for execution time.

```

## License

[MIT](https://choosealicense.com/licenses/mit/)

