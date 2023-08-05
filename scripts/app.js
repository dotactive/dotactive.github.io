import { createApp } from 'https://unpkg.com/vue@3/dist/vue.global.prod.js';
import NovelViewer from './novel.js';

const app = createApp({
  mounted() {
    this.fetchTextFiles();
  },
  methods: {
    fetchTextFiles() {
      // Fetch text files and process them here
    }
  }
});

app.component('novel-viewer', NovelViewer);
app.mount('#app');

