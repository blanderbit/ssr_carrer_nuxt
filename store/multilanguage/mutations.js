import Helper_CreateObject from "../helpers/multilanguage_counter";

export default {
    change_state (state, value) {
        state[value.name] = value.data;
    },
    setVariable(state, value){

        const object = Helper_CreateObject.createObjectSite(value);
        state.data = {...object};

        state.data.FAQPage.section.arr = state.data.FAQPage.section.arr.map(item => {
            item.name = item.title;
            item.active = false;
            item.content = item.description;
            item && item.description && delete item.description;
            item && item.title       && delete item.title;
            item && item.index       && delete item.index;
            return item;
        });

        state.data.Steps = {
            'step-1-2' : {name: state.data.Tests.section.Skills,            state: {...state.data.step_1_2.section}},
            'step-3-4' : {name: state.data.Tests.section.Work_values,       state: {...state.data.step_3_4.section}},
            'step-5-6' : {name: state.data.Tests.section.Activities,        state: {...state.data.step_5_6.section}},
            'step-7-8' : {name: state.data.Tests.section.Personal_Behavior, state: {...state.data.step_7_8.section}},
            'step-9-10' : {name: state.data.Tests.section.Occupations,      state: {...state.data.step_9_10.section}}
        };
        state.data && state.state && state.state.step_1_2 && delete state.state.step_1_2 ;
        state.data && state.state && state.state.step_1_2 && delete state.state.step_3_4 ;
        state.data && state.state && state.state.step_1_2 && delete state.state.step_5_6 ;
        state.data && state.state && state.state.step_1_2 && delete state.state.step_7_8 ;
        state.data && state.state && state.state.step_1_2 && delete state.state.step_9_10;

        state.data.Step_name = {
            'step:1'  : {name: state.data.Tests.section.Skills,            amount: '1-30',},
            'step:2'  : {name: state.data.Tests.section.Skills,            amount: '31-60',},
            'step:3'  : {name: state.data.Tests.section.Work_values,       amount: '61-90',},
            'step:4'  : {name: state.data.Tests.section.Work_values,       amount: '91-120',},
            'step:5'  : {name: state.data.Tests.section.Activities,        amount: '121-150'},
            'step:6'  : {name: state.data.Tests.section.Activities,        amount: '151-180'},
            'step:7'  : {name: state.data.Tests.section.Personal_Behavior, amount: '181-210'},
            'step:8'  : {name: state.data.Tests.section.Personal_Behavior, amount: '211-240'},
            'step:9'  : {name: state.data.Tests.section.Occupations,       amount: '241-270'},
            'step:10' : {name: state.data.Tests.section.Occupations,       amount: '271-300'}
        };

        state.menu_list = state.menu_list.map((item, index) => {
            return {
                name: object.menu_list[index],
                path: item.path
            }
        });
    }
};
