import { createApp } from 'vue';
import NovelViewer from 'https://pinktit.github.io/scripts/novelViewer.vue'; 

const app = createApp({});
app.component('novel-viewer', NovelViewer);

app.mount('#app');
