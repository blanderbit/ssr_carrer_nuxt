import {QuestionStore} from "../../store/localStorage";
import config from "../../config";


let step_array = {};
step_array.skills                  = {};
step_array.work_values             = {};
step_array.activities              = {};
step_array.personal_behavior       = {};
step_array.occupations_professions = {};
step_array.total = {};

const count_step = 11;
const count_in_one_step = 3;

let disabled_button = [];
export default  {
    count_process(method){
        let process = 0;
        const callback_foreach = function(step){
            if(step[method] || step[method] != null) process++
        };
        this.cicle(callback_foreach, count_step, 3);
        return process / 3;
    },
    count_button_disabled_before_result(){
        let callback_foreach = function(step, i, self){
            disabled_button.push(self.count_disanled_callback(step));
        };
        this.cicle(callback_foreach, count_step, 3);
        disabled_button = disabled_button.map(v => Number(v) + 1);
        let result = disabled_button.every(item => item == 1);
        disabled_button = [];
        return !result;
        // this.cicle(callback_foreach())
    },
    count_result(){

        //добавляем в step_array -> метод -> и 6 методов(букв) массивов

        Object.keys(step_array).forEach(item => {
            let step_method = step_array[item];
            config.letters.forEach(letter => {
                step_method[letter] = [];
                item == 'total' ? step_method[letter] = 0 : null
            })
        });

        const callback_foreach = function(step, i, self){
            i == 1 || i == 2  ? self.push_to_array('skills', step.letter, step.state) : null;
            i == 3 || i == 4  ? self.push_to_array('work_values', step.letter, step.state) : null;
            i == 5 || i == 6  ? self.push_to_array('activities', step.letter, step.state) : null;
            i == 7 || i == 8  ? self.push_to_array('personal_behavior', step.letter, step.state) : null;
            i == 9 || i == 10 ? self.push_to_array('occupations_professions', step.letter, step.state) : null
        };

        //проходим по цыклу с 10 степов (в кажом 3 подстепа) и добавляем  в массив кажждого степа с
        //соотвецтвующими буквами  все выбраные результаты вопросов

        this.cicle(callback_foreach, count_step, 3);

        //делаем пересчет массива и формируем сумму

        Object.keys(step_array).forEach(item => {
            let step_method = step_array[item];
            if(item != 'total'){
                config.letters.forEach(letter => {
                    step_method[letter] = step_method[letter].length == 0
                        ? 0
                        :step_method[letter].reduce((sum, current) => sum + current);
                })
            }
        });
// считаем общее число

        const callback_total= function(item, letter){
            if(item != 'total') step_array.total[letter] += step_array[item][letter]
        };
        // считаем процент для каждого
        const callback_percent= function(item, letter){
            step_array[item][letter] = item == 'total' ?
                Math.floor((step_array[item][letter] / 5) * 10) :
                step_array[item][letter] * 10;
        };
        count_sum_and_number(callback_total);
        count_sum_and_number(callback_percent);

        function count_sum_and_number(callback){
            Object.keys(step_array).forEach(item => {
                config.letters.forEach(letter => {
                    callback(item, letter)
                })
            });
        }
        return step_array;
    },
    cicle(func, count_i = count_step, count_j = count_in_one_step) {
        const self = this;
        for(let i = 1; i < count_i ;i++){
            for (let j = 0; j < count_j; j++) {
                QuestionStore.getStep(`${i}-${j+1}`).forEach(step => func(step, i, self));
            }
        }
    },
    push_to_array(method, letter, data){
        data && step_array[method][letter].push(data);
    },
    count_disanled_step(self){
        return self.some(this.count_disanled_callback);
    },
    count_block_menu(count_i = count_step, count_j = count_in_one_step){
        const self = this;
        let number = null;
        for(let i = 1; i < count_i ;i++){
            for (let j = 0; j < count_j; j++) {
                QuestionStore.getStep(`${i}-${j+1}`).some(step => {
                    if(typeof step.state == 'undefined') number = i;
                    return typeof step.state == 'undefined'
                });
                if(number) return number;
            }
        }
        return null;
    },
    count_disanled_callback(item){
        return !item.state
            ?
            item.state == 0 ? false : true
            :
            item.state.toString() ?
                item.state.toString() == '0' ? false : false
                :
                true
    }
}

