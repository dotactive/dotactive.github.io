myapp.component('topbar', {
    props: {
        title: String
      },
    template: /*html*/ `
    <header class="bg-gray-900 text-white p-4">
    <div class="flex items-center justify-between">
    
    <!-- Hamburger Icon -->
    <button @click="showMenu" class="text-white p-2 focus:outline-none">
        <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
        </svg>
    </button>
    <h1 class="text-white text-2xl">{{ title }}</h1>
    <div class="mt-2">
    <input    type="range"    min="1"    max="4"    v-model="fontSizeValue"   class="slider"    @input="updateFontSize"  >
    </div>
    </div>
  </header>
    `,
    data() {
      return {
        fontSizeValue: 2 // Default font size is 'medium'
      };
    },
    methods: {

      updateFontSize() {
          console.log('fontSizeValue'+this.fontSizeValue);
            this.$emit('select-font-size', this.fontSizeValue); // Emit the event here
        },
        showMenu(){
          this.$emit('showmenu'); 
        }
    }
  });