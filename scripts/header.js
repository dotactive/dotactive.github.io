myapp.component('topbar', {
    props: {
        title: String
      },
    template: /*html*/ `
    <header class="p-4">
    <h1 class="text-white text-2xl">{{ title }}</h1>
    <div class="mt-2">
      <select class="mr-2" @change="selectFontSize">
        <option value="small">Small</option>
        <option value="medium">Medium</option>
        <option value="large">Large</option>
      </select>
    </div>
  </header>
    `,

    methods: {

        selectFontSize(event) {
            this.$emit('select-font-size', event.target.value); // Emit the event here
        }
    }
  });