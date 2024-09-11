myapp.component('animation', {
    props: {
      text: {
        type: String,
        required: true
      },
      speed: {
        type: Number,
        default: 5000 // Default speed in milliseconds
      },
      size: {
        type: Number,
        default: 16 // Default font size in pixels
      },
      horizontal: {
        type: Number,
        default: 500 // Default horizontal distance in pixels
      },
      vertical: {
        type: Number,
        default: 0 // Default vertical distance in pixels
      }
    },
    template: `

        <p class="absolute whitespace-nowrap moving-text" :style="textStyle">
          {{ text }}
        </p>
 
    `,
    computed: {
      // Styles for the container div
      containerStyle() {
        return {
          height: `${this.size * 2}px`, // Adjust the height based on font size
          width: '100%', // Full width
          position: 'relative', // Container for absolute positioned text
          overflow: 'hidden' // Hide text when it goes out of bounds
        };
      },
      // Styles for the text div
      textStyle() {
        return {
          fontSize: `${this.size}px`, // Font size
          transform: `translateY(${this.vertical}px)`, // Vertical translation
          animation: `move-left-right ${this.speed}ms linear infinite` // Animation speed
        };
      }
    }
  });
  