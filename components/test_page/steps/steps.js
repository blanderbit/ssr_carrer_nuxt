import {QuestionStore} from "../../../store/localStorage";
import config from "../../../config";
import counter from "../counter";
import { mapGetters } from "vuex";
import Info from "../Info";
import Menu from "../Menu";
import Helper from "../../../helper/active_other_modal";

export default {
    props: [],
    data() {
        return {
            mob: true,
            data_step: [],
            step: null,
            step_child:null,
            last_step: 11,
            first_step: 1,
            process: null,
            title_data_step: {},
            title_data_step_active: false,
            timeout: null,
            step_menu:{
                padding: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
                number:  [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
            },
            arr: [],
        }
    },
    components:{
        info:  Info,
        menu_component:  Menu,
    },
    computed:{
        step_name: function(){
            return this.count_Step('name');
        },
        step_amount: function(){
            return this.count_Step('amount');
        },
        ...mapGetters({
            screen: 'modal_data/get_screen',
            testSection: 'multilanguage/getTestsSection',
            final: 'multilanguage/getFinalSection',
            steps: 'multilanguage/getStepsSection',
            steps_names: 'multilanguage/getStepsNameSection',
            modal: 'multilanguage/getOtherModal',
            test: 'multilanguage/get_test',
        }),
        disabled_but(){
          return this.data_step ? counter.count_disanled_step(this.data_step) : true
        },
        child_disabled_menu(){
             return !this.arr.every(item => typeof item == 'number');
        },
    },
    created() {
        this.process = counter.count_process('state');
        this.step = this.$route.params.steps;
        this.step_child = this.$route.params.child_step;
        this.data_step = QuestionStore.getStep(`${this.step}-${this.step_child}`);
        (this.step < this.first_step) || (this.step > this.last_step) || !this.step_child
            ? this.$router.push( `/tests/1/1`) : null;
        this.toggle_modal();
        this.count_arr_for_disabled();
        this.$router.beforeEach((to, from, next) => {
            this.count_arr_for_disabled();
            let to_back = false;
            if(to.path.split('/')[1] != 'tests' || to.path.split('/').length < 3) return next();
            if(Number(to.params.steps) == this.step && Number(to.params.child_step) < this.step_child) {
                to_back =  !to_back
            } else if(Number(to.params.steps) < this.step && Number(to.params.child_step) >= this.step_child){
                to_back =  !to_back
            }else if(Number(to.params.steps) <= this.step && Number(to.params.child_step) < this.step_child){
                to_back =  !to_back
            }
            if(to_back) {
                next();
                return;
            }
            this.disabled_but ? this.refresh_helper() : next()
        });
    },
    destroyed(){
       this.$router.beforeHooks = []
    },
    methods: {
        refresh_helper(){
            Helper.open_modal(
                this,
                this.modal && this.modal.error_step,
                'copy_text.svg', '8px', '27px', '115px', '153.99px'
            );
        },
        count_arr_for_disabled(){
            this.arr = [];
            let step = this.step;
            for (let j = 0; j < 3; j++) {
                QuestionStore.getStep(`${step}-${j+1}`).forEach(item => this.arr.push(item.state));
            }
        },
        count_Step(name){
            return !this.step ? '' : this.steps_names[`step:${this.step}`][name]
        },
        count_step_data(array, flag = null){
            let data = null;
            Object.keys(array).forEach( item => {
                let arr = item.split('-');
                if(flag) {
                    arr[1] == this.step ? data = item : null;
                } else {
                    arr[1] == this.step || arr[2] == this.step ? data = item : null;
                }
            });
            return data;
        },
        go_next(value, index = false, next=false, child){
            this.count_arr_for_disabled();
            if(value){
                if(index) {
                 this.refresh_helper()
                }
            }
        },
        next(){
            // let result = this.data_step ?  this.disabled_but : null;
            // if(result) return `/tests/${Number(this.step)}/${Number(this.step_child)}`;
            if(this.step == 10 && this.step_child == 3){
                let res = counter.count_button_disabled_before_result();
                if(res) return `/tests/${Number(this.step)}/${Number(this.step_child)}`;
            }
            if(this.step == this.last_step - 1){
                if(this.step_child < 3){
                    return `/tests/${Number(this.step)}/${Number(this.step_child) + 1}`;
                } else {
                    return `/confirm-detail`
                }
            } else {
               if(this.step_child < 3){
                   return `/tests/${Number(this.step)}/${Number(this.step_child) + 1}`;
               }
                else{
                   return `/tests/${Number(this.step) + 1}/${1}`;
               }
            }
        },
        back(){
            const disabled = Number(this.step) == this.first_step || Number(this.step) < this.first_step;
            if(disabled){
                 return this.step_child < 2
                     ? '/tests/1/1'
                     :`/tests/${Number(this.step)}/${Number(this.step_child) - 1}`
            } else {
                return this.step_child < 2
                    ? `/tests/${Number(this.step -1)}/3`
                    :`/tests/${Number(this.step)}/${Number(this.step_child) - 1}`
            }
        },
        toggle_modal(){
            clearTimeout(this.timeout);
            let step = this.count_step_data(this.steps, 'modal');
            this.data_step = QuestionStore.getStep(`${this.step}-${this.step_child}`);
            this.title_data_step = this.steps[step];
            if(step && this.step_child == 1){
               this.timeout =  setTimeout(() => {
                    this.$store.dispatch('modal_data/action_active_modal', {
                        name: 'test_modal',
                        active: true,
                        modal_data: {
                            ...this.title_data_step,
                            step: step.split('-')
                        }
                    });
                }, 3000)
            }
        },
        select_item(position, number){
            let step = this.data_step[position];
            step.state == number ? delete step.state : step.state = number ;
            step.state != null   ? step.state = number : null;

            QuestionStore.saveStep(this.data_step, `${this.step}-${this.step_child}`);

            this.data_step = [...QuestionStore.getStep(`${this.step}-${this.step_child}`)];

            this.process = counter.count_process('state');
            this.count_arr_for_disabled()
        },
    },
    watch:{
        '$route' (to, from) {
            this.step = this.$route.params.steps;
            this.step_child = this.$route.params.child_step;
            localStorage.setItem('progress_step', to.fullPath);
            this.toggle_modal();
        },
        test(to, from){
            debugger;
            this.data_step = to && QuestionStore.getStep(`${this.step}-${this.step_child}`);
            to && this.$store.dispatch('multilanguage/action_spinner', {
                data:true,
                name: 'active'
            });
        }
    },
    directives: {
        disabled_button_back: {
            data_vue:this,
            methods:{
                element_munipulation(el, binding, vnode){
                    const self = binding.def.data_vue.a;
                    if(binding.value.step == 1){
                        // debugger;
                        Number(binding.value.child< 2) ?
                            el.setAttribute('disabled', true)
                            :
                            el.removeAttribute('disabled')
                    } else {
                        el.removeAttribute('disabled')
                    }
                }
            },
            bind: function (el, binding, vnode) {
                binding.def.methods.element_munipulation(el, binding);
            },
            componentUpdated: function (el, binding) {
                binding.def.methods.element_munipulation(el, binding);
            }
        },
        disabled_button_next: {
            data_vue:this,
            methods:{
                element_munipulation(el, binding, vnode){
                    const self = binding.def.data_vue.a;
                    const value = binding.value.array;
                    let result = null;
                    if(value) {
                        result = counter.count_disanled_step(value)
                    }
                    result?
                        el.setAttribute('disabled', true)
                        :
                        el.removeAttribute('disabled')
                    if(binding.value.step == 10 && binding.value.step_child == 3){
                        let res = counter.count_button_disabled_before_result();
                        res?
                            el.setAttribute('disabled', true)
                            :
                            el.removeAttribute('disabled')
                    }

                }
            },
            bind: function (el, binding, vnode) {
                binding.def.methods.element_munipulation(el, binding, vnode);
            },
            componentUpdated: function (el, binding, vnode) {
                binding.def.methods.element_munipulation(el, binding, vnode);
            }
        }
    }
}
