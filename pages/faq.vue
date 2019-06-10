<template>
    <div id="faq" class="d-flex justify-content-center flex-column align-items-center">
        <block_with_acordeon_component
                :title="faqPage.title"
                :description="faqPage.description"
        ></block_with_acordeon_component>
        <div class="container_faq_acordeon">
            <acordeon_component v-for="(item, index) in listAccordeon"
                   :item_acordeon="item" :position="index"
                   :key="index"  @open_item_acordeon="open($event)">
            </acordeon_component>
        </div>
    </div>
</template>

<script>
    import Block_with_acordeon from '../components/faq_page/block_with_acordeon/index.vue'
    import Acordeon from '../components/faq_page/acordeon/index.vue'
    import {mapGetters} from "vuex";
    import {RendeSsr} from "./helper/ssr_render_fetch";
    export default {
        fetch({redirect, store}) {
            return RendeSsr.fetch(store)
        },
        name: "FaqPage",
        data (){
            return {
                listAccordeon:[]
            }
        },
        methods:{
            open(data){
                this.listAccordeon[data.index].active = !this.listAccordeon[data.index].active;
            }
        },
        created(){
            this.listAccordeon = JSON.parse(JSON.stringify(this.faqPage.arr));
        },
        computed:{
            ...mapGetters({
                faqPage: 'multilanguage/getFaqPageSection'
            })
        },
        components:{
            'block_with_acordeon_component' : Block_with_acordeon,
            'acordeon_component' : Acordeon,
        }
    }
</script>

<style scoped>
    #faq{
        width: 100%;
        margin-top: 70px;
        margin-bottom: 264px;
    }
    .container_faq_acordeon{
        width: 855px;
    }
    @media screen and (max-width:1200px){
        .container_faq_acordeon{
            width: 75%;
            margin: 0 127px;
        }
        #faq{
            margin-bottom: 104px;
        }
    }

    @media screen and (max-width:900px){
        .container_faq_acordeon{
            width: 80%;
            margin: 0 100px;
        }
    }

</style>

