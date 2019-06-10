<template>
    <div id="about_us">
        <Block_with_tabs_component></Block_with_tabs_component>
    </div>
</template>

<script>
    import block_with_tabs from '../components/about_us_page/block_with_tabs'
    import {RendeSsr} from "./helper/ssr_render_fetch";
    export default {
        fetch({redirect, store}) {
            return RendeSsr.fetch(store)
        },
        components:{
            'Block_with_tabs_component' : block_with_tabs
        }
    }
</script>

<style>

</style>
