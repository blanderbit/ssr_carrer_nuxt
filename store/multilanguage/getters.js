export default {
    get_language_now(state) {
        return state.language_now
    },
    get_test(state) {
        return state.test
    },
    get_menu_list (state) {
        return state.menu_list
    },
    get_language_array (state) {
        return state.language_array
    },
    get_sotial_networks (state) {
        return state.sotial_networks
    },
    get_status_project(state){
        return state.active
    },
    getHomeFirstSection(state){
        return state.data
        && state.data.HomePage
        && state.data.HomePage.oneSection ? state.data.HomePage.oneSection : {}
    },
    getHomeSecondSection(state){
        return state.data
        && state.data.HomePage
        && state.data.HomePage.twoSection ? state.data.HomePage.twoSection : {}
    },
    getHomeThreeSection(state){
        return state.data
        && state.data.HomePage
        && state.data.HomePage.threeSection ? state.data.HomePage.threeSection : {}
    },
    getHomeFourSection(state){
        return state.data
        && state.data.HomePage
        && state.data.HomePage.fourSection ? state.data.HomePage.fourSection : {}
    },
    getHomeFiveSection(state){
        return state.data
        && state.data.HomePage
        && state.data.HomePage.fiveSection ? state.data.HomePage.fiveSection : {}
    },
    getFooterSection(state){
        return state.data && state.data.Footer && state.data.Footer
    },
    getFaqPageSection(state){
        return state.data &&state.data.FAQPage && state.data.FAQPage.section
    },
    getContactUsSection(state){
        return state.data &&state.data.ContactUs && state.data.ContactUs.section
    },
    getAboutUsSection(state){
        return state.data &&state.data.AboutUs && state.data.AboutUs.section
    },
    getConfirmDetailSection(state){
        return state.data &&state.data.ConfirmDetail && state.data.ConfirmDetail.section
    },
    getValidation(state){
        return state.data &&state.data.Validation && state.data.Validation.section
    },
    getFinalSection(state){
        return state.data &&state.data.Final && state.data.Final.section
    },
    getTestsSection(state){
        return state.data &&state.data.Tests && state.data.Tests.section
    },
    getStepsSection(state){
        return state.data &&state.data.Steps && state.data.Steps
    },
    getStepsNameSection(state){
        return state.data &&state.data.Step_name && state.data.Step_name
    },
    getConfirmModal(state){
        return state.data &&state.data.Modal && state.data.Modal.three
    },
    getOtherModal(state){
        return state.data &&state.data.Modal && state.data.Modal.two
    },
    getOneModal(state){
        return state.data &&state.data.Modal && state.data.Modal.one
    }
};
