myapp.component('topbar', {
    props: {
        title: String
      },
    template: /*html*/ `
    <header class="bg-gray-900 text-white p-4">
    <div class="flex items-center justify-between">
    <h1 class="text-white text-2xl">{{ title }}</h1>
    <!-- Hamburger Icon -->
    <button @click="showMenu" class="text-white p-2 focus:outline-none">
        <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
        </svg>
    </button>
    <div class="mt-2">
      <select class="mr-2" @change="selectFontSize">
        <option value="small">Small</option>
        <option value="medium">Medium</option>
        <option value="large">Large</option>
      </select>
    </div>
    </div>
  </header>
    `,

    methods: {

        selectFontSize(event) {
            this.$emit('select-font-size', event.target.value); // Emit the event here
        },
        showMenu(){
          this.$emit('showmenu'); 
        }
    }
  });