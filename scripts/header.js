myapp.component('topbar', {
    props: {
        title: String
      },
    template: /*html*/ `
    <header class="bg-blue-500 p-4">
    <h1 class="text-white text-2xl">{{ title }}</h1>
    <div class="mt-2">
      <select class="mr-2" @change="updateFontSize">
        <option value="small">Small</option>
        <option value="medium">Medium</option>
        <option value="large">Large</option>
      </select>
    </div>
  </header>
    `,

    methods: {
        updateFontSize(event) {
            this.$emit('updateFontSize', event.target.value); // Emit the event here
        }
    }
  });