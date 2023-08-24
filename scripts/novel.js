myapp.component('novel-viewer', {
    props:{
        novelurl:{
            type:String,
            required:true
        },
        fontsize: String 
    },
    data() {
      return {
        showMenu: false,
        files: [],
        paragraphs: {}
        
      };
    },
    template: 
      /*html*/ 
      `<div id="novel-menu" class="animation-mode">
      <h2 class="hidden">Novel Menu</h2>
      <ul id="novel-list">
        <li v-for="fileName in files" :key="fileName">
          <a class="animation-mode" :href="'#' + fileName.replace('.txt', '')">{{ fileName.replace('.txt', '') }}</a>
        </li>
      </ul>
    </div>
    <div class="menu-mask" @click="hideMenu"></div>
    <div id="novel-content" class="container mx-auto novel-content">
      <div v-for="fileName in files" :key="fileName">
        <a :id="fileName.replace('.txt', '')"></a>
        <p v-for="paragraph in paragraphs[fileName]" :key="paragraph" >{{ paragraph }}</p>
      </div>
    </div>
  </div>
      `,

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
          hideMenu(){
            this.$emit('hidemenu'); 
          }
        }
  })