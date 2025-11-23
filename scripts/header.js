myapp.component('topbar', {
    props: {
        title: String,
        languages: {
          type: Array,
          default: () => ['cn']
        }
      },
    template: /*html*/ `
    <header class="header bg-gray-900 text-white p-4 animation-mode"  :class="{ 'active-pos': showHeader }" ref="header">
    <div class="flex items-center justify-between">

    <!-- Hamburger Icon -->
    <button @click="showMenu" class="menu-btn text-white p-2 focus:outline-none">
    <i class="fa-regular fa-bars fa"></i>
    </button>
    <h1 class="text-white text-2xl">{{ title }}</h1>
      <div>
          <!-- Language Dropdown -->
 <div class="float-left mt-3 inline-block" v-if="languages.length > 1">
      <button @click="toggleLangDropdown" class="border border-white text-white px-2 py-1 focus:outline-none flex items-center whitespace-nowrap">
        <span class="text-sm pr-1">{{ getLanguageLabel(lang) }}</span>
        <i class="fa fa-solid fa-chevron-down ml-1 text-xs"></i>
      </button>
      <div v-if="isLangDropdownOpen" class="absolute right-0 mt-2 bg-white shadow-lg z-50 min-w-max">
        <button
          v-for="langCode in languages"
          :key="langCode"
          @click="selectLanguage(langCode)"
          class="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 whitespace-nowrap text-gray-800"
          :class="{ 'bg-gray-200': lang === langCode }">
          {{ getLanguageLabel(langCode) }}
        </button>
      </div>
    </div>

    <button @click="showSetting" class="setting-btn text-white p-2 focus:outline-none inline-block">


    <i  v-if="isSettingOpen" class="fa fa-solid fa-times transform hover:rotate-12"></i>
    <i  v-else class="fa fa-regular fa-gear transform transition-transform duration-300 hover:rotate-180"></i>
    </button>
    <div  :class="['setting-top',  'animation-mode', { 'active-pos': isSettingOpen }]">
    <div class="grid grid-cols-7 gap-2">
    <div class="title"><i class="fa fa-solid fa-font"></i></div>
    <div class="col-span-5"><input    type="range"    min="1"    max="4"    v-model="fontSizeValue"   class="slider"    @input="updateFontSize"  ></div>
    <div class="day-night"><button @click="daynight">
    <i v-if="nightMode" class="fa fa-solid fa-sun"></i>
    <i v-else  class="fa fa-solid fa-moon"></i>
    </button>
    </div>
</div>
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
        isLangDropdownOpen: false,
        nightMode:false,
        lang: 'cn', // Default to simplified Chinese
        languageLabels: {
          'en': 'English',
          'cn': '简体中文',
          'tw': '繁體中文'
        }
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
        toggleLangDropdown(){
          this.isLangDropdownOpen = !this.isLangDropdownOpen;
        },
        selectLanguage(newLang){
          if (this.lang !== newLang) {
            this.lang = newLang;

            // Update URL with language query parameter
            try {
              const url = new URL(window.location.href);
              url.searchParams.set('lang', this.lang);
              window.history.pushState({}, '', url);
            } catch (e) {
              console.warn('Unable to update URL:', e);
            }

            this.$emit('lang-change', this.lang);
          }
          this.isLangDropdownOpen = false;
        },
        getLanguageLabel(langCode){
          return this.languageLabels[langCode] || langCode.toUpperCase();
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

      // Read language from URL query parameter on page load
      try {
        const url = new URL(window.location.href);
        const langParam = url.searchParams.get('lang');
        // Use URL parameter if present (languages list may not be fully loaded yet)
        if (langParam) {
          this.lang = langParam;
          this.$emit('lang-change', this.lang);
        } else if (this.languages.length > 0 && !this.languages.includes(this.lang)) {
          // If default lang is not in available languages, use the first available
          this.lang = this.languages[0];
          this.$emit('lang-change', this.lang);
        }
      } catch (e) {
        console.warn('Unable to read URL parameters:', e);
      }
    },
    beforeDestroy() {
      // Remove scroll event listener
      window.removeEventListener('scroll', this.handleScroll);
    },
  });