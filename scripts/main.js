const myapp = Vue.createApp({
    data(){
        return{
            fontSize: 'text-base', // Default font size is 'medium'
            showmenu: ''
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
        }

    }
});
