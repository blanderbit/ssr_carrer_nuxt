<template>
    <div class="container_confirm d-flex justify-content-center">
        <div class="content">
            <div class="step">
                <router-link class="vstyle"
                        to="tests/10/3"
                         v-if="confirmDetail && confirmDetail.lastStep"
                         v-html="confirmDetail.lastStep"></router-link>
                /
                <a class="vstyle"
                   v-if="confirmDetail && confirmDetail.thisPage"
                   v-html="confirmDetail.thisPage"></a>
            </div>
            <div class="title_block text-center custom-title vstyle"
                 v-if="confirmDetail && confirmDetail.title"
                 v-html="confirmDetail.title">
            </div>
            <div class="small_text text-center custom-small vstyle"
                 v-if="confirmDetail && confirmDetail.description"
                 v-html="confirmDetail.description">
            </div>
            <div class="small_text custom_small_text text-center"
                 v-if="confirmDetail && confirmDetail.descriptionTwo"
                 v-html="confirmDetail.descriptionTwo">
            </div>
            <input_information_component></input_information_component>
        </div>
    </div>
</template>

<script>
    import Input_information from '../components/process_confirm_page/input_information/index.vue'
    import {mapGetters} from "vuex";
    import {RendeSsr} from "./helper/ssr_render_fetch";
    export default {
        fetch({redirect, store}) {
            return RendeSsr.fetch(store)
        },
        name: "ProcessConfirmPage",
        components:{
            'input_information_component': Input_information,
        },
        watch:{
            '$route' (to, from) {
                console.log(to, from)
            }
        },
        computed:{
            ...mapGetters({
                confirmDetail:'multilanguage/getConfirmDetailSection'
            })
        }
    }
</script>

<style scoped>
    .container_confirm{
         width: 100%;
        margin-bottom: 510px;
    }
    .container_payment{

    }
    .step{
        width: 100%;
        margin-top: 30px;
        margin-bottom: 45px;
    }
    .step a {
        font-size: 12px;
        color: #333333;
        text-decoration: none;
    }
    .step a:first-child {
        margin-right: 10px;
    }.step a:last-child {
        margin-left: 10px;
    }
    .custom_small_text{
        font-weight: 600;
        font-size: 16px;
        margin-bottom: 90px;
    }
    .content{
        width: 1140px;
    }
    .custom-title{
        font-weight: 800;
        margin-bottom: 20px
    }
    .custom-small{
        margin-bottom: 70px;
    }
    @media screen and (max-width: 1100px){
        .custom-title{
            font-size: 20px;
            margin-bottom: 5px;
        }
        .custom-small, .custom_small_text{
            font-size: 16px;
        }
        .custom-small{
            margin-bottom: 60px;
        }
        .custom_small_text{
            margin-bottom: 70px;
        }
        .step{
            margin-left: 47px;
            margin-bottom: 25px;
            font-size: 12px;
            width: auto;
        }
        .container_confirm{
            margin-bottom: 254px;
        }
    }
    @media screen and (max-width: 1023px){
        .custom-small{
            margin-bottom: 50px;
        }
        .step{
            margin-left: 19px;
            font-size: 11px;
        }
    }
    @media screen and (max-width: 767px){
        .custom-title{
            font-size: 16px;
        }
        .custom-small, .custom_small_text{
            font-size: 14px;
        }
        .step{
            margin-left: 30px;
        }
        .container_confirm{
            margin-bottom: 100px;
        }
    }
    @media screen and (max-width: 567px){
        .custom-title{
            font-size: 14px;
        }
        .custom-small, .custom_small_text{
            font-size: 12px;
        }
        .step{
            margin-left: 15px;
        }
    }

</style>
