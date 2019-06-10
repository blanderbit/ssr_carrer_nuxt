import Request from "../../../api/mail_request";
import Validator from "../../../validator/validator";
import Helper from "../../../helper/active_other_modal";
import {mapGetters} from "vuex";

export default {
    name: 'have-any-questions',
    data() {
        return {
            data:{
                name:'',
                email:'',
                message:'',
            },
            error:{
                name:{},
                email:{},
                message:{},
            },
            disabled_button: false
        }
    },
    computed:{
        ...mapGetters({
            screen: 'modal_data/get_screen',
            fiveSection: 'multilanguage/getHomeFiveSection',
            validation:'multilanguage/getValidation',
            modal: 'multilanguage/getOtherModal',
        }),
    },
    methods: {
        send_mail(){
            const error =  this.error;
            error.name = Validator.set(
                this.data.name,
                ['required'],
                this.validation ? this.validation.field : null
            );
            error.email = Validator.set(
                this.data.email,
                ['required'],
                this.validation ? this.validation.field : null
            );
            error.email =  !error.email.errors  ? Validator.set(
                this.data.email,
                ['email'],
                this.validation ? this.validation.email : null
            ) : error.email;
            error.message = Validator.set(
                this.data.message,
                ['required'],
                this.validation ? this.validation.field : null
            );
            !error.email.errors && !error.name.errors && !error.message.errors
                ?
                Request.send_mail(this.data, this).then(response => {
                    Helper.open_modal(
                        this,
                        this.modal && this.modal.send_mail,
                        'send_message.svg', '32px', '12px', '103px', '148px'
                    )
                })
                :
                this.disabled_button = true
        }
    },
}
