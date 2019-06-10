import Helper_count from "../helpers/count";
import {IndexLanguage} from "../localStorage";
import list_language from "../../api/multilanguage_request";
import questions from "../../api/questions";

export default {
    action_change_state({commit}, value){
        commit('change_state', {
            data: value,
            name: 'language_array'
        });
        const data = Helper_count.find_language_now_in_array(value);
        commit('change_state', {
            data: IndexLanguage.getLang() ? IndexLanguage.getLang() : data,
            name: 'language_now'
        });
        list_language.get_site(IndexLanguage.getLang() && IndexLanguage.getLang().id
            ? IndexLanguage.getLang().id : data.id, commit);
        questions.get_questions(IndexLanguage.getLang() && IndexLanguage.getLang().id
            ? IndexLanguage.getLang().id :  data.id, this, commit);
    },
    changeLang({commit}, value){
        list_language.get_site( value.id, commit);
        questions.get_questions(value.id, this, commit);
    },
    action_spinner({commit}, value){
        commit('change_state', value)
    },
};
