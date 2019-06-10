import {mapGetters} from 'vuex';
import config from "../../../config";
import stepPage from "../../../components/test_page/steps/steps";
import {IndexLanguage} from "../../../store/localStorage";
export default {
    data() {
        return{
            payments:['paypal', 'visa', 'maestro', 'mastercard', 'discover'],
            base_url: config.url
        }
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
            sotial_networks: 'multilanguage/get_sotial_networks',
            screen: 'modal_data/get_screen',
            footer: 'multilanguage/getFooterSection'
        }),
}
