myapp.component('animation', {
  props: ['text', 'speed', 'size', 'horizontal', 'vertical','skill'],
  data() {
    return {
      showPercent: false,
      percent: 0
    };
  },
  template: `
      <a class="absolute whitespace-nowrap moving-text" :style="textStyle" @mouseover="pauseAnimation"  @mouseout="resumeAnimation">
        <div class="skill-text">{{ text }}</div> 
        <transition name="fade">
                  <div v-if="showPercent" class="percent-num">
            <svg viewBox="0 0 36 36" class="circular-chart">
              <path class="circle-bg"
                d="M18 2.0845
                   a 15.9155 15.9155 0 0 1 0 31.831
                   a 15.9155 15.9155 0 0 1 0 -31.831" />
              <path class="circle"
                :stroke-dasharray="percent + ', 100'"
                d="M18 2.0845
                   a 15.9155 15.9155 0 0 1 0 31.831
                   a 15.9155 15.9155 0 0 1 0 -31.831" />
              <text x="18" y="20.35" class="percentage">{{ percent }}%</text>
            </svg>
          </div>
        </transition>
      </a>
 
   `,
  computed: {
    textStyle() {
      const animationName = this.horizontal > 50 ? 'move-right-left' : 'move-left-right';
      return {
        // fontSize: `${this.size}px`, 
        // transform: `translateY(${this.vertical}px)`, // Vertical translation
        top: `${this.vertical}%`, 
        animation: `${animationName} ${this.speed}ms linear infinite`, // Animation speed
        '--initial-left': `${this.horizontal}%`
      };
    }
  },
  methods: {
    pauseAnimation(event) {
      this.showPercent = true;
      let target = event.target;
      while (target && !target.classList.contains('moving-text')) {
        target = target.parentElement;
      }
      if (target) {
        target.style.animationPlayState = 'paused';
      }
      this.animatePercent();
    },
    resumeAnimation(event) {

      this.showPercent = false;
      this.percent = 0;
      let target = event.target;
      while (target && !target.classList.contains('moving-text')) {
        target = target.parentElement;
      }
      if (target) {
        target.style.animationPlayState = 'running';
      }

    },
    animatePercent() {

      let start = 0;

      const end = this.skill;

      const duration = 500;

      const stepTime = Math.abs(Math.floor(duration / (end - start)));

      const timer = setInterval(() => {

        start += 1;

        this.percent = start;

        if (start === end) {

          clearInterval(timer);

        }

      }, stepTime);
    }
  }
});