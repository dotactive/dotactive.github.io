import { createApp } from 'https://unpkg.com/vue@3/dist/vue.global.prod.js';
import NovelViewer from './novelViewer.vue';


const app = createApp({
  data() {
    return {};
  }
});

app.component('novel-viewer', NovelViewer);
app.mount('#app');

