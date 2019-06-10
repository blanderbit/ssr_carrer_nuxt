import Vue from 'vue';
import VueScrollTo  from 'vue-scrollto';
import {mapGetters} from "vuex";

Vue.use(VueScrollTo);

export default {
    data(){
        return {

        }
    },
    computed:{
        ...mapGetters({
            screen: 'modal_data/get_screen',
            firstSection: 'multilanguage/getHomeFirstSection'
        })
    }
}
