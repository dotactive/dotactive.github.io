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
            if (size === 'small') {
                this.fontSize = 'text-sm';
            } else if (size === 'medium') {
                this.fontSize = 'text-base';
            } else if (size === 'large') {
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
