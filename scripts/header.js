myapp.component('topbar', {
    props: {
        title: String
      },
    template: /*html*/ `
    <header class="header bg-gray-900 text-white p-4 animation-mode"  :class="{ 'active-pos': showHeader }" ref="header">
    <div class="flex items-center justify-between">
    
    <!-- Hamburger Icon -->
    <button @click="showMenu" class="menu-btn text-white p-2 focus:outline-none">
    <i class="fa-regular fa-bars fa"></i>
    </button>
    <h1 class="text-white text-2xl">{{ title }}</h1>
    <button @click="showSetting" class="setting-btn text-white p-2 focus:outline-none">
    
    <i  v-if="isSettingOpen" class="fa fa-solid fa-times transform hover:rotate-12"></i>
    <i  v-else class="fa fa-regular fa-gear transform transition-transform duration-300 hover:rotate-180"></i>
    </button>
    <div  :class="['setting-top',  'animation-mode', { 'active-pos': isSettingOpen }]">
    <div class="grid grid-cols-8 gap-2">
    <div class="title"><i class="fa fa-solid fa-font"></i></div>
    <div class="col-span-5"><input    type="range"    min="1"    max="4"    v-model="fontSizeValue"   class="slider"    @input="updateFontSize"  ></div>
    <div></div>
    <div class="day-night"><button @click="daynight">
    <i v-if="nightMode" class="fa fa-solid fa-sun"></i>
    <i v-else  class="fa fa-solid fa-moon"></i>
    </button></div>
    </div>
    </div>
    </div>
  </header>
    `,
    data() {
      return {
        fontSizeValue: 2, // Default font size is 'medium'
        lastScrollPos: 0,
        showHeader: true, // Initially show the header
        isSettingOpen: false,
        nightMode:false
      };
    },
    methods: {

      updateFontSize() {
            this.$emit('select-font-size', this.fontSizeValue); // Emit the event here
        },
        showMenu(){
          this.$emit('showmenu'); 
        },
        showSetting(){
          this.isSettingOpen = !this.isSettingOpen;
        },
        daynight(){
          this.nightMode = !this.nightMode;
          this.$emit('day-night-mode', this.nightMode);
        },
        handleScroll() {
          const currentScrollPos = window.scrollY;
          const scrollingDown = currentScrollPos > this.lastScrollPos;
    
          if (scrollingDown) {
            this.showHeader = false; // Hide the header
          } else {
            this.showHeader = true; // Show the header
          }
    
          // Update the last scroll position
          this.lastScrollPos = currentScrollPos;
        },
    },

    mounted() {
      // Attach scroll event listener
      window.addEventListener('scroll', this.handleScroll);
    },
    beforeDestroy() {
      // Remove scroll event listener
      window.removeEventListener('scroll', this.handleScroll);
    },
  });