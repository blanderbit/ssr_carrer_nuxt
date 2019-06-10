export default{
    mutation_modal (state, value) {
        state[value.modal_name] = value.modal;
    },
    mutation_screen(state, value){
        state.screen = value
    }
};
