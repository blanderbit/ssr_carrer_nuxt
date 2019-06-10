import content_tabs from './../content_tabs/index'
import {mapGetters} from "vuex";
export default {
    components: {
        'content_tabs_component': content_tabs
    },
    data() {
        return {
            list_tabsStatic: [
                {
                    path:'http://backcartestpro.qbex.io/assets/about_us/our_service.png',
                },
                {
                    path:'http://backcartestpro.qbex.io/assets/about_us/our_mission.png'
                },
                {
                    path:'http://backcartestpro.qbex.io/assets/about_us/our_team.png',
                    style:{
                        top: '-2px',
                        left: '1px'
                    }
                },
            ],
            list_tabsStatic2: null,
            tab:{
                active_tab: null,
                width_tab: 98,
                tab_translate:0,
                margin:0
            }
        }
    },
    methods: {
        open_tab(tab, new_data){
            let text_width = event.currentTarget.childNodes[0].offsetWidth;
            let block_text_width = event.currentTarget.offsetWidth;
            let block_tab = event.currentTarget.parentNode.offsetWidth;
            this.tab.active_tab = tab;
            this.tab.width_tab = text_width;
            this.tab.tab_translate = block_text_width * tab;
            if(tab == this.list_tabs.length -1){
                this.tab.tab_translate = block_tab - text_width;
            }
            this.tab.margin = tab == 0 || tab == this.list_tabs.length -1 ? 0 :
                (block_text_width - text_width) / 2;
            this.tab.active_tab = new_data;
            console.log(this.list_tabs);
        },
        first_width(name){
            this.tab.width_tab = this.$refs[name] ? this.$refs[name][0].offsetWidth : this.tab.width_tab
        }
    },
    computed:{
        ...mapGetters({
            aboutUs: 'multilanguage/getAboutUsSection'
        }),
        list_tabs(){
            let data = this.aboutUs && this.aboutUs.arr ? this.aboutUs.arr.map((item, index) => {
                item.name    = item.title;
                item.content = item.description;
                item.path    = this.list_tabsStatic[index] && this.list_tabsStatic[index].path
                    ? this.list_tabsStatic[index].path : '';
                item.style   = this.list_tabsStatic[index] && this.list_tabsStatic[index].style
                    ? this.list_tabsStatic[index].style : '';
                item.description && delete item.description;
                item.title       && delete item.title;
                item.index       && delete item.index;
                return item;
            }) : [];
            data = JSON.parse(JSON.stringify(data));
            if(!this.tab.active_tab){
                this.list_tabsStatic2 = data;
                this.tab.active_tab = data && data[0];
                this.first_width(data && data[0] && data[0].name + 0)
            }
            return this.list_tabsStatic2 ? this.list_tabsStatic2 : data
        }
    },
    watch:{

    }
}
