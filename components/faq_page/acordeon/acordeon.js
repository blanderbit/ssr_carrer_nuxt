export default {
    name: 'acordeon',
    components: {},
    props: {
        item_acordeon: {},
        position: Number
    },
    data() {
        return {}
    },
    computed: {},
    mounted() {

    },
    methods:{
        open(index){
            this.$emit('open_item_acordeon', {
                index: index,
            })
        },
    },
}
