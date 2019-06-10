export default{
    find_language_now_in_array(array){
        let data;
        array.forEach(item =>{
            if(item.language == 'English') {
                data = item;
                return;
            }
        });
        return data;
    }
}
