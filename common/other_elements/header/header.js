import {mapGetters} from "vuex";
import list_language from './../../../api/multilanguage_request';
import stepPage from './../../../components/test_page/steps/steps';
import {IndexLanguage} from "../../../store/localStorage";
export default {
    data() {
        return {
            menu: false,
            active_button: true,
            selected: '',
            arr: [
                {
                    url: '/home',
                    item: 'home'
                },
                {
                    url: '/faq',
                    item: 'FAQ'
                },
                {
                    url: '/contact-us',
                    item: 'Contact Us'
                },
                {
                    url: '/about-us',
                    item: 'About Us'
                },
            ],
            test : ''
        }
    },
    created(){
        let rout = this.$router.history.current.path;
        this.active_button = rout  == '/home'
        this.test = rout.split('/')[1];
        this.selected = rout;
    },
    methods:{
        language(item){
            IndexLanguage.destroyLang();
            this.$store.dispatch('multilanguage/action_spinner', {
                data:false,
                name: 'active'
            });
            this.$store.dispatch('multilanguage/changeLang', {id:item.id, vue: stepPage});
            this.$store.dispatch('multilanguage/action_spinner', {
                data:{...item},
                name: 'language_now'
            });
            IndexLanguage.saveLang(item);
        }
    },
    computed:
        mapGetters({
            language_now:    'multilanguage/get_language_now',
            menu_list:       'multilanguage/get_menu_list',
            language_array:  'multilanguage/get_language_array',
            screen:          'modal_data/get_screen',
            firstSection:    'multilanguage/getHomeFirstSection'
        }),
    watch:{
        menu:function(){
            document.body.style.overflowY = this.menu ? 'hidden' : 'scroll'
        },
        '$route' (to, from) {
            // debugger;
            this.active_button = to.path == '/home' ||  this.$router.history.current.path.split('/')[0] == 'tests';
            this.test = this.$router.history.current.path.split('/')[1];
            this.selected= to.path
        }
    },
}
