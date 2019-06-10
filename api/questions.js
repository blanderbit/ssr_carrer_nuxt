import axios from "./axios.config";
import {QuestionStore} from "../store/localStorage";

export default  {
    get_questions(index, store, commit){
        return axios.get(`api/questions?language_id=${index}`)
    },
}
