import {mapGetters} from "vuex";

export default {
    name: 'how-does-it-work',
    data() {
        return {
            information_how_does_it_work_static:[
                {
                    path_image: 'http://backcartestpro.qbex.io/assets/home_page/click_take_the_test.svg',
                    order: 1
                },{
                    path_image: 'http://backcartestpro.qbex.io/assets/home_page/start_marking.png',
                    order: -1,
                },{
                    path_image: 'http://backcartestpro.qbex.io/assets/home_page/get_report.svg',
                    order: 1
                },
            ]
        }
    },
    computed:{
        ...mapGetters({
            screen: 'modal_data/get_screen',
            threeSection: 'multilanguage/getHomeThreeSection'
        }),
        information_how_does_it_work(){
            return this.threeSection &&
                   this.threeSection.arr &&
                   Array.isArray(this.threeSection.arr) &&
                   this.information_how_does_it_work_static ?
                   this.information_how_does_it_work_static.map( (item,index) => {
                        return {
                            title:this.threeSection.arr[index] && this.threeSection.arr[index].title,
                            description: this.threeSection.arr[index] && this.threeSection.arr[index].description,
                            path_image: this.information_how_does_it_work_static[index].path_image,
                            order:this.information_how_does_it_work_static[index].order
                        }
                }) : [];
        }
    }
}
