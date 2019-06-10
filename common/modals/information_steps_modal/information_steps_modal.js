import {mapGetters} from "vuex";

export default {
    name: 'information-steps-modal',
    components: {},
    props: ['data'],
    data() {
        return {
            transitions: false
        }
    },
    computed: {
        ...mapGetters({
            testSection: 'multilanguage/getTestsSection',
            modal: 'multilanguage/getOneModal',
        }),
        upper_text(){
            return this.testSection && this.testSection.click ? this.testSection.upper_text.split(',') : [];
        },
        lower_text(){
            return this.testSection && this.testSection.click ? this.testSection.lower_text.split(',') : [];
        },
        textClick(){
            return this.testSection && this.testSection.click ? this.testSection.click.split(',') : [];
        }
    },
    mounted() {
        setTimeout(v => this.transitions = !this.transitions, 200)
    },
    methods: {
        close_modal(){
            this.transition = !this.transition
            this.$store.dispatch('modal_data/action_active_modal', {
                name: 'test_modal',
                active: false,
                modal_data: {},
            });
        }
    }
}
