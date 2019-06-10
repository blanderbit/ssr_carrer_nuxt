export default {
    action_active_modal({commit}, data) {
        commit('mutation_modal', {
            modal_name:data.name,
            modal:{
                active: data.active,
                data:data.modal_data
            },
        });
    },
    action_screen({commit}, data) {
        commit('mutation_screen', data)
    }

};
