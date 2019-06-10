import counter from "../../../components/test_page/counter";
import Payment from "./../../../api/payment"
import config from "../../../config";
import axios from "../../../api/axios.config";
import {mapGetters} from "vuex";
export default {
    name: 'confirm-modal-in-confirm-page',
    components: {},
    props: ['data'],
    data() {
        return {
            transitions: false
        }
    },
    mounted(){
        setTimeout(v => this.transitions = !this.transitions, 200)
    },
    methods: {
        close_modal(){
            this.$store.dispatch('modal_data/action_active_modal', {
                name: 'confirm_modal',
                active: false,
                modal_data: {},
            });
        },
        confirm(){
            const payment_key = this.data.data.card.toLowerCase();
            let payment;
            let data = {...this.data.data};
            data.language_id = 1;
            data= window.btoa(unescape(encodeURIComponent(JSON.stringify(data))));
            console.log(`${config.url}/api/testcode-use?result=${data}&code=${this.data.data.code}`);
            switch(payment_key){
                case 'paypal':payment = 'paywithpaypal';
                    break;
                case 'credit/debit card': payment = 'braintree';
                    break;
                case 'voucher':
                    return window.location.href = `${config.url}api/testcode-use?result=${data}&code=${this.data.data.code}`;
                default: payment = payment_key;
            }
            window.location.href = `${config.url}${payment}?result=${data}`
        }
    },
    computed:{
        ...mapGetters({
            modal: 'multilanguage/getConfirmModal',
        })
    }
}
