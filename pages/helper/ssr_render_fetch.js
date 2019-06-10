import list_language from "../../api/multilanguage_request";
import Helper_count from "../../store/helpers/count";
import questions from "../../api/questions";

export class RendeSsr{
    static fetch(store){
        let data;
        return list_language.list_language()
            .then(response => {
                console.log(store.commit, '333333333333333333333333');
                store.commit('multilanguage/change_state', {
                    data: response.data,
                    name: 'language_array'
                });

                data = Helper_count.find_language_now_in_array(response.data);
                store.commit('multilanguage/change_state', {
                    data: data,
                    name: 'language_now'
                });
                return list_language.get_site(data.id)
            }).then(response => {
                store.commit('multilanguage/setVariable', response.data);
                store.commit('multilanguage/change_state', {
                    data: true,
                    name: 'active'
                });
                store.commit('multilanguage/change_state', {
                    data: true,
                    name: 'test'
                });
                // this.$router.push('home');
                // redirect('/home')
                return questions.get_questions(data.id, this, store.commit);
            }).then(response => {
                // localStorage.clear();
                console.log(response.data);
                // let count = 0;
                // for (let i = 0; i < response.data.questions.length; i + 30) {
                //     let string_array = response.data.questions.splice(i, 30);
                //     for(let j = 0; j < 3; j++){
                //         // QuestionStore.saveStep(
                //         //     string_array.splice(0, 10),
                //         //     `${count + 1}-${j+1}`
                //         // )
                //     }
                //     count++;
                // }
                store.commit('multilanguage/change_state', {
                    data: true,
                    name: 'active'
                });

                store.commit('multilanguage/change_state', {
                    data: true,
                    name: 'test'
                });
                console.log(store.state, '88888888888888888888888888888888888888888888888888888888');
            })
            .catch(err => console.log(err));
    }
}
