// novel.js

import { createApp } from 'vue';
import NovelViewer from './novelViewer.vue';

const app = createApp({
    data() {
        return {
          files: [],
          paragraphs: {}
        };
      },
        mounted() {
          this.fetchTextFiles();
        },
        methods: {
          fetchTextFiles() {

            fetch(this.novelurl+'files.json')
              .then(response => response.json())
              .then(data => {
                this.files = data.files;
      
                // Fetch each text file and store its content in the 'paragraphs' object
                const fetchPromises = this.files.map(fileName => {
                  return fetch(`${this.novelurl}${fileName}`)
                    .then(response => response.text())
                    .then(fileContent => {
                      this.paragraphs[fileName] = fileContent.split('\n');
                    })
                    .catch(error => {
                      console.log(`Error fetching ${fileName}: ${error}`);
                    });
                });
      
                Promise.all(fetchPromises).then(() => {
                  // Ensure the order of paragraphs is the same as the 'files' list
                  this.files.forEach(fileName => {
                    this.paragraphs[fileName] = this.paragraphs[fileName].filter(paragraph => paragraph.trim() !== '');
                  });
                });
              })
              .catch(error => {
                console.log('Error fetching file names: ' + error);
              });
          },
        }
});

app.component('novel-viewer', NovelViewer);

app.mount("#app");
