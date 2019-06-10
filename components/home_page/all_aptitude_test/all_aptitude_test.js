import {mapGetters} from "vuex";

export default {
    data() {
        return {
            test_list:[
                'Lorem ipsum dolor sit amet',
                'Lorem ipsum dolor sit amet',
                'Lorem ipsum dolor sit amet',
                'Lorem ipsum dolor sit amet'
            ]
        }
    },
    computed:{
        ...mapGetters({
            screen: 'modal_data/get_screen',
            fourSection: 'multilanguage/getHomeFourSection'
        }),
    }
}
