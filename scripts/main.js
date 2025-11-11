const myapp = Vue.createApp({
    data(){
        return{
            fontSize: 'text-base', // Default font size is 'medium'
            showmenu: '',
            nightmode:'',
            lang: 'cn',
            languages: ['cn', 'tw'], // Default available languages
            novelTitle: '' // Novel title from JSON
        }
    },
    methods: {

        updateFontSize(size) {
            console.log('size:'+size);
            if (size == 1) {
                this.fontSize = 'text-sm';
            } else if (size == 2) {
                this.fontSize = 'text-base';
            } else if (size == 3) {
                this.fontSize = 'text-lg';
            } else if (size == 4) {
                this.fontSize = 'text-xl';
            }
        },
        showmenufunction(){
            this.showmenu = 'menuActive';
        },
        hidemenufunction(){
            this.showmenu = '';
        },
        dayNightMode(night){
            if(night){
                this.nightmode = 'nightmode'
            }
            else{
                this.nightmode = ''
            }
        },
        langChange(lang){
            this.lang = lang;
        },
        setLanguages(languages){
            this.languages = languages;
        },
        setTitle(title){
            this.novelTitle = title;
        }
    },
    mounted() {
        // Read language from URL query parameter on page load
        try {
            const url = new URL(window.location.href);
            const langParam = url.searchParams.get('lang');
            if (langParam) {
                this.lang = langParam;
            }
        } catch (e) {
            console.warn('Unable to read URL parameters:', e);
        }
    },
    watch: {
        novelTitle(newTitle) {
            // Update document title when novelTitle changes
            if (newTitle) {
                document.title = newTitle;
            }
        }
    }
});
