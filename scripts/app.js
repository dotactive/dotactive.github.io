import { createApp } from 'vue';
import NovelViewer from './novelViewer.vue';

const app = createApp({
  data() {
    return {};
  },
  components: {
    NovelViewer
  }
});

app.mount('#app');
