myapp.component('novel-viewer', {
  props: {
    novelurl: {
      type: String,
      required: true
    },
    fontsize: String,
    lang: String,
    languages: {
      type: Array,
      default: () => ['cn', 'tw']
    }
  },
  computed: {
    actualNovelUrl() {
      if (this.lang) {
        return this.novelurl + this.lang + '/';
      }
      return this.novelurl;
    }
  },
  data() {
    return {
      showMenu: false,
      files: [],
      paragraphs: {},
      coverImage: '', // Initialize cover image URL
      title: '' // Initialize novel title
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
    <!-- 3D Book Cover -->
    <div v-if="coverImage" id="cover" class="pt-32 pb-20" style="perspective: 1500px;">
      <div class="book-3d" style="width: 300px; height: 450px; margin: 0 auto; position: relative; transform-style: preserve-3d; transform: rotateY(-25deg) rotateX(0deg);">
        <!-- Front Cover -->
        <div class="book-front" style=" left:-40px; position: absolute; width: 100%; height: 100%; background-size: cover; background-position: center; box-shadow: 0 10px 30px rgba(0,0,0,0.1); border-radius: 3px 0 0 3px;" :style="{ backgroundImage: 'url(' + coverImage + ')' }"></div>
        <!-- Spine (right side) -->
        <div class="book-spine" style="position: absolute; width: 40px; height: calc(100% - 12px); top: 5px; background: linear-gradient(to right, #d4c4a8 0%, #e8dcc8 50%, #d4c4a8 100%); right: -14px; transform-origin: left; transform: rotateY(-90deg); box-shadow: inset 0 0 15px rgba(0,0,0,0.2);"></div>
        <!-- Pages -->

        <!-- Parallelogram Shadow -->
        <div class="book-shadow" style="position: absolute; width: 300px; height: 100px; bottom:-2px; right: -230px; background: linear-gradient(to top, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0.1) 80%, transparent 100%); transform: rotateX(0deg) rotateZ(00deg) skewX(-70deg); transform-origin: left top; filter: blur(15px); opacity: 0.6; z-index: -1;"></div>
      </div>
    </div>
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

    // Emit available languages to parent
    this.$emit('languages-loaded', this.languages);
  },
  methods: {
    fetchTextFiles() {
      fetch(this.actualNovelUrl + 'files.json')
        .then(response => response.json())
        .then(data => {
          this.files = data.files;
          this.title = data.title;
          this.$emit('title-loaded', data.title);
          // Fetch each text file and store its content in the 'paragraphs' object
          const fetchPromises = this.files.map(fileName => {
            return fetch(`${this.actualNovelUrl}${fileName}`)
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
      const coverImageURL = `${this.actualNovelUrl}cover.jpg`;
      fetch(coverImageURL)
        .then(response => {
          if (response.ok) {
            this.coverImage = coverImageURL;
          }
        })
        .catch(error => {
          console.error('Error loading cover image:', error);
        });
    }
  },
  watch: {
    lang() {
      // Reload content when language changes
      this.files = [];
      this.paragraphs = {};
      this.coverImage = '';
      this.title = '';
      this.fetchTextFiles();
      this.loadCoverImage();

      console.log('lang'+this.lang);
    }
  }
})
