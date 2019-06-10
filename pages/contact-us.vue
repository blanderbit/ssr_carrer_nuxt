<template>
    <div class="contact_us d-flex flex-column align-items-center">
        <div class="title_block text-center text-capitalize" v-html="contactUs.title">
            <!--Contact <span style="color:#F9892E">Us</span>-->
        </div>
        <div class="small_text text-center" v-html="contactUs.description">
            <!--Have any questions? Feel free to contact us!-->
        </div>
        <send_message_and_contacts_components
                :contactUs="contactUs">
        </send_message_and_contacts_components>
    </div>
</template>

<script>
    import send_message_and_contacts from '../components/contact_us_page/send_message_and_contacts/index.vue'
    import {mapGetters} from "vuex";
    import {RendeSsr} from "./helper/ssr_render_fetch";

    export default {
        fetch({redirect, store}) {
            return RendeSsr.fetch(store)
        },
        name: "ContactUs",
        components: {
            'send_message_and_contacts_components': send_message_and_contacts
        },
        computed:{
            ...mapGetters({
                contactUs: 'multilanguage/getContactUsSection'
            })
        }
    }
</script>

<style scoped>
    .contact_us {
        margin-top: 90px;
        margin-bottom: 254px;
    }

    @media screen and (max-width: 1200px) {
        .title_block {
            font-size: 20px;
        }

        .small_text {
            font-size: 14px;
        }
    }

    @media screen and (max-width: 900px) {

    }

    @media screen and (max-width: 767px) {
        .title_block {
            font-size: 14px;
        }
        .contact_us {
            margin-top: 50px;
        }
        .small_text {
            font-size: 12px;

        }
    }


</style>
