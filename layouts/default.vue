<template>
    <div id="app" class="text_style">
        <div v-if="active_status">
            <header-component></header-component>
            <div class="router">
                <nuxt/>
            </div>
            <footer-component></footer-component>
            <Confirm_modal
                    v-if="confirm_modal.active"
                    :data="confirm_modal">
            </Confirm_modal>
            <information_steps_modal
                    v-if="test_modal.active"
                    :data="test_modal">
            </information_steps_modal>
            <send_message_modal_and_copy
                    v-if="send_and_copy_modal.active"
                    :data="send_and_copy_modal.data">
            </send_message_modal_and_copy>
        </div>
        <div class="spinner d-flex justify-content-center align-items-center" v-if="!active_status">
            <div></div>
        </div>
    </div>
</template>

<script>
    import Footer from '../common/other_elements/footer/footer.vue'
    import Header from '../common/other_elements/header/index.vue'
    import Confirm_modal from '../common/modals/confirm_modal_in_confirm_page/index.vue'
    import Information_steps_modal from '../common/modals/information_steps_modal/index.vue'
    import Send_message_modal_and_copy from '../common/modals/send_message_modal_and_copy/index.vue'
    import { mapGetters } from "vuex";
    import vue from 'vue';
    import list_language from "../api/multilanguage_request";
    import Helper_count from "../store/helpers/count";
    import {IndexLanguage, QuestionStore} from "../store/localStorage";
    import questions from "../api/questions";
    import vuex from 'vuex';
    if (process.browser) {
        if(vue && vue.$store) vue.$store.dispatch('modal_data/action_screen', {
            value: window.innerWidth,
            active: window.innerWidth < 1100 ? true : false
        })
    }
    export default {
        name: 'app',
        data () {
            return {}
        },
        mounted(){
            window.addEventListener('resize',() => this.resize())
        },
        destroyed(){
            window.removeEventListener('resize',() => this.resize());
        },
        methods:{
            resize(){
                this.$store.dispatch('modal_data/action_screen', {
                    value: window.innerWidth  ,
                    active: window.innerWidth < 1100 ? true : false
                })
            }
        },
        components: {
            'footer-component': Footer,
            'header-component': Header,
            "Confirm_modal":Confirm_modal,
            "information_steps_modal":Information_steps_modal,
            "send_message_modal_and_copy": Send_message_modal_and_copy,
        },
        computed:{
            ...mapGetters({
                confirm_modal: 'modal_data/get_confirm_modal',
                test_modal:'modal_data/get_test_modal',
                send_and_copy_modal:'modal_data/get_send_and_copy_modal',
                active_status: 'multilanguage/get_status_project',
                final: 'multilanguage/getFinalSection'
            })
        },
        watch:{
            '$route' (to, from) {
                window.scrollTo(0, 0);
            },
        },
    }
</script>

<style>
    @import "../assets/main.css";
    .info{
        width: 44px;
        height: 44px;
        border-radius: 50%;
        border:2px solid #F9892E;
        display: inline-flex;
        justify-content: center;
        align-items: center;
        color: #F9892E;
        margin:0 11px;
        margin-top:-15px;
        font-size: 28px
    }
    .content_tab > p {
        margin-bottom: 32px;
        font-size: 14px;
    }
    .router{
        padding-top: 86px;
    }
    .text_style{
        font-family: Montserrat;
        font-style: normal;
    }
    .small_text{
        font-weight: 500;
        line-height: 29px;
        font-size: 16px;
        color: #333333;
        margin-top: 10px;
        margin-bottom: 20px;
    }
    .button_to{

        cursor: pointer;
        color:#333333;
        font-weight: 600;
        background: #85B1F5;
        height: 44px;
        padding: 0 30px;
        border-radius: 22px;
        box-shadow: 0 3px 7px rgba(0, 0, 0, 0.2);
    }
    .button_to.orange_style{
        background: #FFFFFF;
        border: 2px solid #F9892E;
        margin: 0;
    }
    .button_to:hover{
        background: #5B93E8;
        text-decoration: none;
    }
    .button_to.orange_style:hover{
        background: #FFF0DB;
        box-shadow: 0px 3px 7px rgba(0, 0, 0, 0.2);

    }
    .button_to.orange_style:active{
        background: #FFE3CC;
        box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.25);

    }
    .button_to:active{
        background: #4876D0;
        box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.25);
    }
    .button_to.orange_style[disabled]{
        background: #FFFFFF;
    }
    .button_to[disabled]{
        background: #85B1F5;
        opacity: 0.5;
    }
    a:hover{
        color: black;
    }
    .title_block{
        font-weight: 800;
        line-height: 51px;
        font-size: 28px;
        letter-spacing: 0.05em;
        text-transform: uppercase;
        color: #333333;
    }
    .background_image{
        background-position: center;
        background-repeat: no-repeat;
    }
    .container_margin {
        width: 1140px;
        margin: 0 15px;
    }
    .elem_elipse{
        display: inline-block;
        position: absolute;
        content: '';
        right: 0;
        left: 0;
        width: 100%;
        height: 400px;
        background: white;
        background-position: -100px 0;
        background-repeat: no-repeat;
        -webkit-clip-path: ellipse(90% 70% at 0% 50%);
        clip-path: ellipse(65% 59% at 50% -30%);
        -webkit-shape-outside: ellipse(90% 70% at 0% 50%);
        shape-outside: ellipse(90% 56% at 0% 50%);
        -webkit-shape-margin: 2em;
        shape-margin: 2em;
    }
    .elem_elipse1{
        bottom: 0;
        transform: rotate(180deg);
    }


    .have-any-questions_block_input input, .have-any-questions_block_input textarea,
    .input-information input{
        background: #FFFFFF;
        border: 1px solid #DFDFDF;
        height: 44px;
        font-size: 14px;
        padding: 0 30px;
        width: 400px;
        box-sizing: border-box;
        border-radius: 22px;
        color: #333333;
    }.have-any-questions_block_input input::placeholder, .have-any-questions_block_input textarea::placeholder,
     .input-information input::placeholder{
         color: #8B8B8B;
     }
    .have-any-questions_block_input input:focus, .have-any-questions_block_input textarea:focus,
    .input-information input:focus{
        border: 1px solid #85B1F5!important;
        outline: none;
    }
    .have-any-questions_block_input input:hover, .have-any-questions_block_input textarea:hover,
    .input-information input:hover{
        border: 1px solid #D8E1F0;
        outline: none;
    }

    .input-information input::placeholder,
    .input-information input{
        color: #333333
    }
    .input-information input[disabled="true"].disabled::placeholder{
        box-sizing: border-box;
        border-radius: 22px;
        color:#8B8B8B;
        opacity: 0.5;
    }
    .have-any-questions_block_input textarea {
        height: 250px;
        padding-top: 10px;
    }
    .margin_input{
        margin-bottom: 8px;
    }
    .margin_input_no_active{
        margin-bottom: 24px;
    }
    .confirm_margin.margin_input_no_active{
        margin-bottom: 33px;
    }
    .margin_input .error{
        padding-left: 30px;
        padding-top: 7px;
    }
    .margin_input .btn-lang-border.error{
        padding: 0;
    }
    .margin_input input.error{
        font-size: inherit;
        padding-top: 0;
    }.margin_input textarea.error{
         font-size: inherit;
         padding-top: 14px
     }
    .header_badge_language #ddown-divider .dropdown-item:hover, .dropdown-item:focus,
    .header_badge_language #ddown-divider .dropdown-item,
    .input-information .confirm_input.dropdown .dropdown-item{
        color: #000000;
        text-decoration: none;
        background-color: transparent;
        outline: none;
        font-family: Montserrat;
        font-style: normal;
        font-weight: normal;
        line-height: normal;
        font-size: 14px;
        padding: 12px 20px;
    }
    .error{
        color:#FD5656;
        font-size: 12px;
    }
    input.error,
    textarea.error,
    .margin_input .btn-lang-border.error{
        border: 1px solid #FD5656!important;
    }
    .spinner > div{
        background-image: url("http://backcartestpro.qbex.io/assets/spinner.svg");
        width: 100px;
        height: 100px;
        background-size: contain;
    }
    .spinner {
        width: 100vw;
        height: 100vh;
        background: white;
        position: absolute;
        top: 0;
        z-index: 1000;
    }
    .information .content{
        line-height: 23px;
        font-size: 14px;
    }

    @media screen and (max-width:1200px){
        .content_tab > p {
            margin-bottom: 25px;
        }
    }

    @media screen and (max-width:1023px){

    }

    @media screen and (max-width:767px){
        .content_tab > p {
            margin-bottom: 20px;
            font-size: 12px;
        }
        .info{
            width: 24px;
            height: 24px;
            border-radius: 50%;
            border:1px solid #F9892E;
            display: inline-flex;
            justify-content: center;
            align-items: center;
            color: #F9892E;
            margin:0 11px;
            margin-top:-15px;
            font-size: 14px
        }
        .information .content{
            font-size: 12px;
        }
    }
    .vstyle p{
        margin: 0;
        margin-left: 0;
        margin-right: 0;
        margin-bottom: 0;
        margin-top: 0;
        display: inline;
    }
    .clstyle p {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .nstyle{
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .v-list__tile__sub-title{
        text-overflow: ellipsis;
        overflow: hidden;
        height: 33px;
    }

</style>
