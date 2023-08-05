import { createApp } from 'https://unpkg.com/vue@3/dist/vue.global.prod.js';

const app = createApp({
  data() {
    return {};
  }
});

app.component('novel-viewer', {
  template: `
    <!-- The template content is already in novelViewer.vue -->
  `,
  // Other component options here
});

app.mount('#app');
