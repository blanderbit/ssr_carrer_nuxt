<template>
    <div>
        <div v-if="!screen.active" class="final d-flex flex-column align-items-center">
            <div class="title_block custom_title text-capitalize vstyle"
                 v-if="final && final.title"
                 v-html="final.title">
            </div>
            <div class="small_text custom_small_title vstyle"
                 v-if="final && final.description"
                 v-html="final.description">
            </div>
            <div class="check_block d-flex justify-content-between">
                <div class="check_block_img position-relative">
                    <div class="check_ellipse"></div>
                    <div class="check_image position-absolute"></div>
                </div>
                <div class="check_content d-flex align-items-center flex-column">
                    <div class="title_block title_check text-center vstyle"
                         v-if="final && final.titleBlock"
                         v-html="final.titleBlock">
                    </div>
                    <div class="title_small vstyle"
                         v-if="final && final.descriptionBlock"
                         v-html="final.descriptionBlock">
                    </div>
                    <div class="d-flex check_button
                     justify-content-between flex-grow-1 align-items-end">
                        <router-link :to="'contact-us'" class="button_to d-flex justify-content-center
                     align-items-center text-decoration-none
                     custom_button orange_style vstyle clstyle"
                         v-if="final && final.contactButton"
                         v-html="final.contactButton">
                        </router-link>
                        <router-link :to="'tests'" class="button_to d-flex justify-content-center
                     align-items-center text-decoration-none
                     custom_button vstyle clstyle"
                         v-if="final && final.takeButton"
                         v-html="final.takeButton">
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="screen.active" class="final d-flex flex-column align-items-center">
            <div class="title_block custom_title text-capitalize vstyle"
                 v-if="final && final.title"
                 v-html="final.title">
            </div>
            <div class="small_text custom_small_title vstyle"
                 v-if="final && final.description"
                 v-html="final.description">
            </div>
            <div class="check_block d-flex justify-content-between">
                <div class="check_block_img position-relative">
                    <div class="check_ellipse"></div>
                    <div class="check_image position-absolute"></div>
                </div>
                <div class="check_content d-flex align-items-center flex-column">
                    <div class="title_block title_check text-center vstyle"
                         v-if="final && final.titleBlock"
                         v-html="final.titleBlock">
                    </div>
                    <div class="title_small vstyle"
                         v-if="final && final.descriptionBlock"
                         v-html="final.descriptionBlock">
                    </div>
                    <div class="d-flex check_button justify-content-between flex-grow-1 align-items-end">
                        <router-link :to="'contact-us'" class="button_to d-flex justify-content-center
                        align-items-center text-decoration-none
                        custom_button orange_style vstyle clstyle"
                             v-if="final && final.contactButton"
                             v-html="final.contactButton">
                        </router-link>
                        <router-link :to="'tests'" class="button_to d-flex justify-content-center
                        align-items-center text-decoration-none
                        custom_button vstyle clstyle"
                             v-if="final && final.takeButton"
                             v-html="final.takeButton">
                        </router-link>
                    </div>
                </div>
            </div>
            <div class="check_block_img check_block_img_mobile position-relative">
                <div class="check_ellipse"></div>
                <div class="check_image position-absolute"></div>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapGetters} from "vuex";
    import {RendeSsr} from "./helper/ssr_render_fetch";

    export default {
        fetch({redirect, store}) {
            return RendeSsr.fetch(store)
        },
        name: "FinalPage",
        computed: {
            ...mapGetters({
                screen: 'modal_data/get_screen',
                final: 'multilanguage/getFinalSection'
            })
        },
        created(){
            localStorage.clear();
        }
    }
</script>

<style scoped>
    .final{
        margin-top: 90px;
        margin-bottom: 354px;
    }
    .custom_title{
        margin-bottom: 20px;
    }
    .custom_small_title{
        margin-bottom: 112px;
    }
    .check_block{
        box-shadow: 0px 0px 7px rgba(0, 0, 0, 0.1);
        border-radius: 20px;
        width: 910px;
        height: 420px;
    }
    .custom_button{
        width: 193px;
    }
    .check_content{
        padding: 70px 63px 70px 55px;
    }
    .check_ellipse{
        width: 312px;
        height: 312px;
        background: #F4F8FF;
        margin: 54px 0 54px 67px;
        border-radius: 50%;
    }
    .check_image{
        width: 243.85px;
        height: 459.65px;
        background-image: url("http://backcartestpro.qbex.io/assets/check_email/check_email.png");
        background-repeat: no-repeat;
        background-position: center;
        top: -53px;
        left: 89px;
    }
    .title_check{
        font-weight: 600;
        font-size: 20px;
        letter-spacing: 0;
        text-transform: none;
    }
    .title_small{
        line-height: 23px;
        font-size: 14px;
        margin-top: 47px;
    }
    .check_button{
        width: 100%;
    }
    .check_block_img_mobile{
        display: none;
    }
    .check_button .button_to{
        color: #333333;
        font-size: 16px;
    }

    @media screen and (max-width:1200px){
        .custom_title{
            font-size: 20px;
            margin-top: 50px;
        }
        .custom_small_title{
            font-size: 14px;
        }
        .check_block{
            margin-bottom: 254px;
        }
    }

    @media screen and (max-width:1000px){
        .check_block_img{
            display: none;
        }
        .check_block{
            margin-bottom: 0;
        }
        .check_block_img_mobile{
            display: block;
            margin-left: 0;
            margin-top: 130px;
            margin-bottom: 256px;
        }
        .check_block{
            width: 80%;
            display: flex;
            justify-content: center !important;
        }
        .check_ellipse{
            margin-left: 0;
        }
        .check_image{
            left: 24px;
        }
    }

    @media screen and (max-width:670px){
        .title_small{
            margin-top: 30px;
            text-align: center;
        }
        .title_check{
            text-align: center;
        }
        .check_content{
            width: 100%;
            padding: 50px 30px;
        }
        .check_block{
            height: auto;
        }
        .custom_small_title{
            margin-bottom: 50px;
        }
        .check_button{
            flex-wrap: wrap;
            flex-direction: column;
            margin-top: 40px;
        }
        .check_button .button_to{
            width: 100%;
        }
        .check_button .button_to:first-child{
            margin-bottom: 15px;
        }
        .title_check{
            font-size: 18px;
        }
        .custom_title{
            margin: 0;
            margin-top: 30px;
        }
        .custom_small_title{
            margin-top: 0;
        }
        .title_small{
            margin-top: 10px;
        }
    }
    @media screen and (max-width:500px){
        .title_check{
            font-size: 14px;
        }
        .title_small{
            font-size: 12px;
        }
        .check_button .button_to{
            font-size: 14px;
        }
        .check_block{
            width: 90%;
        }
        .check_content{
            padding-bottom: 30px;
        }
        .check_ellipse {
            width:290px;
            height: 290px;
        }
        .check_image{
            width: 229.85px;
        }
    }
</style>

