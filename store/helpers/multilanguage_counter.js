import {action_static, data_static} from "../const";


export default{
    createObjectSite(main_array){
        let action = {...action_static};
        let data   = JSON.parse(JSON.stringify(data_static));
        main_array.forEach((item, mainIndex) => {
            let new_action = item && item.name ? action[item.name] : false;
            if(new_action){

                new_action.forEach((itemArr, indexArr) => {
                    itemArr = itemArr.split('.');
                    let pivot = '';
                    let done = true;
                    let index = itemArr.length;
                    switch (itemArr[0]) {
                        case "HomePage" :
                            Page(pivot, done, index, itemArr, mainIndex, item);
                            break;
                        case "AboutUs":
                            let new_index = Number(item.name.replace(/\D+/g, ""));
                            new_index = new_index == 5 || new_index == 6 ? new_index + 1 : new_index;
                            Page(pivot, done, index, itemArr, new_index + 1, item);
                            break;
                        case "Tests":
                            let new_index1 =
                                item.name === "Page tests-in-process, phrase 1" ||
                                item.name === "Page tests-in-process, phrase 2" ||
                                item.name === "Page tests-in-process, phrase 3" ?
                                    Number(item.name.replace(/\D+/g, "")) + 1.3 : false;
                            Page(pivot, done, index, itemArr, new_index1 ? new_index1 : mainIndex, item);
                            break;
                        default:
                            Page(pivot, done, index, itemArr, item.id, item);
                            break;
                    }
                })
            }
        });

        function Page(pivot, done, index, itemArr, mainIndex, item){
            for (let i = 0; i < index; i++){
                if(i < 3){
                    pivot = !pivot ? data[itemArr[i]] : pivot[itemArr[i]]
                } else {
                    let obj = {};
                    if (pivot.length == 0 || mainIndex % 2) {
                        obj = {
                            index: mainIndex,
                            title: itemArr[3] == 'title' ?
                                item && item.site_description && item.site_description.value
                                : '',
                            description: itemArr[3] == 'description' ?
                                item && item.site_description && item.site_description.value
                                : ''
                        };
                        pivot.push(obj);
                    } else {
                        obj = pivot.find(item_pivot => item_pivot.index == mainIndex - 1);
                        if(obj){
                            obj.description = itemArr[3] == 'description'
                                ? item && item.site_description && item.site_description.value
                                : '';
                        }
                    }
                    done = false;
                }
            }
            if(done && pivot){
                try {
                    pivot.push(item && item.site_description ? item.site_description.value : '');
                } catch (e){
                    pivot = []
                }
            }
        }

        Object.keys(data).forEach(item => {
            if(Array.isArray(data[item])) {
                if( data[item].length <=1 ) data[item] = data[item].join('');
            } else {
                Object.keys(data[item]).forEach(itemTwo =>{
                    Object.keys(data[item][itemTwo]).forEach(itemThree => {
                        if( itemThree == 'arr') return;
                        data[item][itemTwo][itemThree] = data[item][itemTwo][itemThree].join('');
                    })
                })
            }
        });

        return {...data};
    }
}
