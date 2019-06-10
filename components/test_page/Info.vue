<template>
    <div class="info position-absolute"
         @mouseover="hover_pab('open')"
         @mouseleave="hover_pab('close')">
        <div class="position-relative">
            i
        </div>
        <div class="information_content position-absolute" v-if="title_data_step_active">
            <div class="position-relative">
                <div class="ellipse position-absolute" :style="{background : '#77DCC1'}"></div>
                <div v-if="title_data_step.state">
                    <span style="font-weight: 600" class="vstyle" v-html="textClick[0]"></span>
                    -<span class="vstyle"
                            v-if="title_data_step && title_data_step.state && title_data_step.state.like"
                            v-html="title_data_step.state.like">
                    </span>
                </div>
            </div><br>

            <div class="position-relative">
                <div class="ellipse position-absolute" :style="{background : '#FDC572'}"></div>
                <div  v-if="title_data_step.state">
                    <span style="font-weight: 600" class="vstyle" v-html="textClick[1]">}</span>
                    - <span class="vstyle"
                            v-if="title_data_step && title_data_step.state && title_data_step.state.middle"
                            v-html="title_data_step.state.middle"></span>
                </div>
            </div><br>

            <div class="position-relative">
                <div class="ellipse position-absolute" :style="{background : '#F59A9A'}"></div>
                <div  v-if="title_data_step.state">
                    <span style="font-weight: 600" class="vstyle" v-html="textClick[2]"></span>
                    - <span class="vstyle"
                            v-if="title_data_step && title_data_step.state && title_data_step.state.dislike"
                            v-html="title_data_step.state.dislike"></span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Step_modal from './../../const/const_step_modal'
    import {mapGetters} from "vuex";
    export default {
       props:['data', 'active'],
        data(){
           return{
               title_data_step: {},
               title_data_step_active:false
           }
        },
        computed: {
            ...mapGetters({
                testSection: 'multilanguage/getTestsSection',
                steps: 'multilanguage/getStepsSection',
            }),
            textClick(){
                return this.testSection && this.testSection.click ? this.testSection.click.split(',') : [];
            }
        },
        methods:{
            count_step_data(array, flag = null){
                let data = null;
                Object.keys(array).forEach( item => {
                    let arr = item.split('-');
                    if(flag) {
                        arr[1] == this.active ? data = item : null;
                    } else {
                        arr[1] == this.active || arr[2] == this.active ? data = item : null;
                    }
                });
                return data;
            },
            hover_pab(state){
                let step = this.count_step_data(this.steps);
                this.title_data_step = state == 'open' ? this.steps[step] : {};
                this.title_data_step_active = state == 'open';
            }
        }
    }
</script>

<style scoped>
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
        font-size: 28px;
        right: -86px;
        top: 25px;
    }
    .information_content{
        width: 580px;
        padding: 11px 20px 11px 48px;
        box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.15);
        bottom: 52px;
        background: #FFFFFF;
        border-radius: 12px;
        line-height: 18px;
        font-size: 11px;
        right: 0;
        color: black;
        font-weight: 400;
        z-index: 11;
    }
    .ellipse{
        width: 12px;
        height: 12px;
        left: -24px;
        border-radius: 50%;
        top: 2px;
    }
    @media screen and (max-width: 639px){
        .info{
            position: relative!important;
            margin-top:0;
            left: 0;
            top: auto;
        }
        .information_content{
            width: calc(100vw - 20px);
            left: -18px;
            top: auto;
            bottom: 52px;
        }
    }

</style>
