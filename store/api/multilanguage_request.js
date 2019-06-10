import axios from "./axios.config";

export default  {
    list_language(vue){
         axios.get('api/languages')
             .then(response => vue.$store.dispatch('multilanguage/action_change_state', response.data))
             .catch(err => console.log(err));
    },
    get_site(language_id, commit) {
         axios.get(`/api/site-blocks?language_id=${language_id}`)
             .then(res => commit('setVariable', res.data))
             .catch(err => err)
    }
}
