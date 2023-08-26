myapp.component('topbar', {
    props: {
        title: String
      },
    template: /*html*/ `
    <header class="bg-gray-900 text-white p-4">
    <div class="flex items-center justify-between">
    
    <!-- Hamburger Icon -->
    <button @click="showMenu" class="text-white p-2 focus:outline-none">
    <i class="fa-regular fa-bars fa"></i>
    </button>
    <h1 class="text-white text-2xl">{{ title }}</h1>
    <button @click="showSetting" class="text-white p-2 focus:outline-none">
    <i class="fa fa-regular fa-gear"></i>
    </button>
    <div  :class="['setting-top',  'animation-mode', { 'active-pos': isSettingOpen }]">
    <div class="grid grid-cols-8 gap-2">
    <div class="title"><i class="fa fa-solid fa-font"></i></div>
    <div class="col-span-5"><input    type="range"    min="1"    max="4"    v-model="fontSizeValue"   class="slider"    @input="updateFontSize"  ></div>
    <div></div>
    <div class="day-night"><button @click="daynight"><i class="fa fa-solid fa-moon"></i></button></div>
    </div>
    </div>
    </div>
  </header>
    `,
    data() {
      return {
        fontSizeValue: 2, // Default font size is 'medium'
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
          this.isSettingOpen = true;
        },
        daynight(){
          this.nightMode = !this.nightMode;
          this.$emit('day-night-mode', this.nightMode);
        }
    }
  });