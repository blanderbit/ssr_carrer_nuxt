<template>
    <div class="tests">
        <component :is="component_active"></component>
    </div>
</template>

<script>
    import information_and_start from '../components/test_page/information_and_start/index.vue';
    import steps from '../components/test_page/steps/index.vue';
    import {RendeSsr} from "./helper/ssr_render_fetch";

    export default {
        fetch({redirect, store}) {
            return RendeSsr.fetch(store)
        },
        name: "TestPage",
        components:{
            'information_and_start-component' : information_and_start,
            'steps-component' : steps,
        },
        data () {
            return {}
        },
        computed:{
            component_active(){
                return Object.keys(this.$route.params).length == 0
                    ?
                    'information_and_start-component'
                    :
                    'steps-component'
            }
        },
    }
</script>

<style scoped>

</style>
