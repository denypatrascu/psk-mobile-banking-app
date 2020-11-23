import { r as registerInstance, h } from './index-d1085cc4.js';

const PskChapterWrapper = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
    }
    render() {
        return (h("psk-chapter", { title: this.title }, h("div", { class: "sub-card" }, h("slot", null))));
    }
};

export { PskChapterWrapper as psk_chapter_wrapper };
