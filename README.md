# Gandalf.js

A small, lightweight javascript module to create an installation wizard-like progress bar.

![Merlin](http://oi67.tinypic.com/2mga1zd.jpg)

### Example Usage
```javascript
this.gandalf = new Gandalf({
    container: '.main',
    baseColor: '#D8D8D8',
    activeColor: '#F8BC42',
    defaultActive: 2,
    icons: [
      'img/svg/home-address.svg',
      'img/svg/list.svg',
      'img/svg/credit-card.svg',
      'img/svg/tick.svg',
    ],
});
```

To dynamically set the progress of the bar, you must run the `setActive(ICON_INDEX)` function. For example, once you progress in the wizard you must pass the next icon index to this function so the bar progresses.
```javascript
// User has progressed to the third step in the wizard, so we pass 2 to the function.
this.gandalf.setActive(2);
```

### Options
* `container`:
    * Compulsory
    * Type: String or Element
    * The selector or element that the wizard progress bar will be located in.
* `icons`:
    * Compulsory
    * Type: Array
    * An array which contains a collection of paths to icons (SVG, PNG, etc...)
* `baseColor`:
    * Compulsory
    * Type: String
    * The HEX code of the base colour you wish the wizard progress bar to be.
* `activeColor`:
    * Compulsory
    * Type: String
    * The HEX code of the colour you wish the progress to be.
* `direction`:
    * Optional
    * Type: String
    * Default: `horizontal`,
    * The direction that the wizard progress bar will be going in.
* `defaultActiveIndex`:
    * Optional
    * Type: Integer
    * Default: 0
    * The index of the currently active step in the wizard process. This determines where the progress bar will go to.

