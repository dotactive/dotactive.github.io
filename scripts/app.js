import { createApp } from 'https://unpkg.com/vue@3/dist/vue.global.prod.js';
import NovelViewer from 'https://pinktit.github.io/scripts/novelViewer.vue'; 

const app = createApp({});
app.component('novel-viewer', NovelViewer);

app.mount('#app');
