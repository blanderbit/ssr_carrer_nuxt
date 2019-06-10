import {mapGetters} from "vuex";

export default {
    name: 'goal-and-benefits',
    data() {
        return {
            information_benefits_list_static: [
                {
                    path_image: 'http://backcartestpro.qbex.io/assets/home_page/over25_report.svg'
                },{
                    path_image: 'http://backcartestpro.qbex.io/assets/home_page/riasec_method.svg'
                },{
                    path_image: 'http://backcartestpro.qbex.io/assets/home_page/fully_anonymous.svg'
                },{
                    path_image: 'http://backcartestpro.qbex.io/assets/home_page/time_matters.svg'
                },
            ]
        }
    },
    computed:{
        ...mapGetters({
            screen: 'modal_data/get_screen',
            twoSection: 'multilanguage/getHomeSecondSection'
        }),
        information_benefits_list(){
            return this.twoSection &&
                   this.twoSection.arr &&
                   Array.isArray(this.twoSection.arr) &&
                   this.information_benefits_list_static
                        ? this.information_benefits_list_static.map( (item,index) => {
                            return {
                                title:this.twoSection.arr[index] && this.twoSection.arr[index].title,
                                description: this.twoSection.arr[index] && this.twoSection.arr[index].description,
                                path_image: this.information_benefits_list_static[index].path_image
                            }
                    }) : [];
        }
    }
}
