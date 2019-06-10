import axios from "./axios.config";
import {QuestionStore} from "../localStorage";

export default  {
    get_questions(index, store, commit){
        axios.get(`api/questions?language_id=${index}`)
        .then(response =>{
            // localStorage.clear();
            let count = 0;
            for (let i = 0; i < response.data.questions.length; i + 30) {
                let string_array = response.data.questions.splice(i, 30);
                for(let j = 0; j < 3; j++){
                    QuestionStore.saveStep(
                                string_array.splice(0, 10),
                               `${count + 1}-${j+1}`
                            )
                }
                count++;
            }
            commit('change_state', {
                data:true,
                name: 'active'
            });

            commit('change_state', {
                data: true,
                name: 'test'
            });
        })
    },
}
