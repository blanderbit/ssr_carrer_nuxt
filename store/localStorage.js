export class QuestionStore {
    static getStep(index) {
        return !window.localStorage[`step:${index}`] ? null : JSON.parse(window.localStorage[`step:${index}`]);
    }

    static saveStep(data, index) {
        window.localStorage[`step:${index}`] = JSON.stringify(data);
    }

    static destroyQuestion() {
        window.localStorage.clear()
    }
}

export class IndexLanguage {
    static getLang(index) {
        return window.localStorage[`lang`] ? JSON.parse(window.localStorage[`lang`]) : null;
    }

    static saveLang(data, index) {
        window.localStorage[`lang`] = JSON.stringify(data);
    }

    static destroyLang() {
        window.localStorage.removeItem('lang')
    }
}
