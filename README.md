# Text Scroll Opacity Effect

A simple scrolling effect where each word in a text gradually fades in as it enters a defined "mask" area on the screen.

## Features

- Pure JavaScript (no external libraries)
- Smooth text fade-in on scroll
- CSS animations using `opacity` and `transition`
- Customizable speed and starting opacity via `data-*` attributes
- Fully responsive for mobile devices

  ## Customization

You can adjust the animation speed and initial opacity for each text block using `data-*` attributes:

```
<p class="text-section__value" data-text-speed="500" data-text-opacity="0.2">
  Your animated text goes here...
</p>
```

- data-text-speed: transition speed in milliseconds

- data-text-opacity: initial opacity value (from 0 to 1)

## Responsive Design
This project is optimized for devices with screen widths up to 768px. Font sizes and mask positioning adjust automatically for better mobile readability.

##  Built With

- HTML5

- CSS3 (Flexbox, position: sticky)

- JavaScript (vanilla)
