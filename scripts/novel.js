myapp.component('novel-viewer', {
  props: {
    novelurl: {
      type: String,
      required: true
    },
    fontsize: String,
    isSimplified: Boolean
  },
  data() {
    return {
      showMenu: false,
      files: [],
      paragraphs: {},
      originalParagraphs: {}, // Store original text
      coverImage: '' // Initialize cover image URL
    };
  },
  template:
  /*html*/
  `<div id="novel-menu" class="animation-mode">
    <h2 class="hidden">Novel Menu</h2>
    <button @click="hideMenu" class="menu-close"><i class="fa fa-solid fa-times transform hover:rotate-12"></i></button>
    <ul id="novel-list" class="mt-12">
      <!-- Add a list item for the cover image -->
      <li v-if="coverImage" key="cover">
        <img :src="coverImage" alt="Cover" @click="scrollToSection('cover')" class="w-20 h-auto cursor-pointer">
      </li>
      <li v-for="fileName in files" :key="fileName">
        <a class="animation-mode" @click="scrollToSection(fileName.replace('.txt', ''))">{{ fileName.replace('.txt', '') }}</a>
      </li>
    </ul>
  </div>
  <div class="menu-mask" @click="hideMenu"></div>
  <div id="novel-content" class="container mx-auto novel-content p-10">
    <!-- Add an image element for the cover image -->
    <img v-if="coverImage" :src="coverImage" alt="Cover" id="cover" class="w-1/2 h-auto pt-32  mx-auto">
    <div v-for="fileName in files" :key="fileName">
      <a :id="fileName.replace('.txt', '')"></a>
      <p v-for="paragraph in paragraphs[fileName]" :key="paragraph">{{ paragraph }}</p>
    </div>
  </div>
</div>
  `,

  mounted() {
    this.fetchTextFiles();
    this.loadCoverImage(); // Load the cover image
  },
  methods: {
    fetchTextFiles() {
      fetch(this.novelurl + 'files.json')
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
              // Store original text
              this.originalParagraphs[fileName] = [...this.paragraphs[fileName]];
            });
          });
        })
        .catch(error => {
          console.log('Error fetching file names: ' + error);
        });
    },
    hideMenu() {
      this.$emit('hidemenu');
    },
    scrollToSection(sectionId) {
      const sectionElement = document.getElementById(sectionId);
      if (sectionElement) {
        sectionElement.scrollIntoView({ behavior: 'smooth' });
      }
    },
    loadCoverImage() {
      // Load the cover image using the provided URL
      const coverImageURL = `${this.novelurl}cover.jpg`;
      fetch(coverImageURL)
        .then(response => {
          if (response.ok) {
            this.coverImage = coverImageURL;
          }
        })
        .catch(error => {
          console.error('Error loading cover image:', error);
        });
    },
    convertText(text, toSimplified) {
      // Use OpenCC for conversion
      if (!text) return text;

      try {
        if (toSimplified) {
          // Convert Traditional Chinese to Simplified Chinese
          const converter = OpenCC.Converter({ from: 'tw', to: 'cn' });
          return converter(text);
        } else {
          // Convert Simplified Chinese to Traditional Chinese
          const converter = OpenCC.Converter({ from: 'cn', to: 'tw' });
          return converter(text);
        }
      } catch (error) {
        console.error('OpenCC conversion error:', error);
        return text; // Return original text if conversion fails
      }
    }
  },
  watch: {
    isSimplified(newVal) {
      // Convert all text when mode changes
      this.files.forEach(fileName => {
        this.paragraphs[fileName] = this.originalParagraphs[fileName].map(paragraph =>
          this.convertText(paragraph, newVal)
        );
      });
    }
  }
})
