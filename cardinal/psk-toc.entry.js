import { r as registerInstance, g as getElement, h } from './index-bb32d9fe.js';
import './constants-507b64b1.js';
import { a as closestParentElement, s as scrollToElement } from './utilFunctions-74de6735.js';
import { C as CustomTheme } from './CustomTheme-f57ed858.js';
import { T as TableOfContentProperty } from './TableOfContentProperty-de8188be.js';

var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
        r = Reflect.decorate(decorators, target, key, desc);
    else
        for (var i = decorators.length - 1; i >= 0; i--)
            if (d = decorators[i])
                r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
const PskToc = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.activeChapter = null;
        this.chapterList = [];
        this.initialChapterSetupDone = false;
    }
    connectedCallback() {
        this.pskPageElement = closestParentElement(getElement(this), 'psk-page');
    }
    tocReceived(evt) {
        if (evt.detail) {
            let { chapters, active } = evt.detail;
            this.chapterList = this._sortChapters(chapters);
            this.activeChapter = active;
        }
    }
    _sortCurrentChapter(chapter, guidOrderedList) {
        if (chapter.children.length === 0) {
            return chapter;
        }
        let newChildren = [];
        for (let index = 0; index < guidOrderedList.length; ++index) {
            let ch = chapter.children.find((el) => el.guid === guidOrderedList[index]);
            if (ch) {
                guidOrderedList.splice(index--, 1);
                newChildren.push(this._sortCurrentChapter(ch, guidOrderedList));
            }
        }
        return Object.assign(Object.assign({}, chapter), { children: newChildren });
    }
    _sortChapters(chapters) {
        const chaptersInsidePage = this.pskPageElement.querySelectorAll('psk-chapter');
        const guidOrderedList = [];
        chaptersInsidePage.forEach((chapter) => {
            if (!(chapter.hasAttribute('data-define-props') || chapter.hasAttribute('data-define-controller') || chapter.hasAttribute('data-define-events')) && (chapter.hasAttribute('guid'))) {
                guidOrderedList.push(chapter.getAttribute('guid'));
            }
        });
        let newChapters = [];
        for (let index = 0; index < guidOrderedList.length; ++index) {
            let ch = chapters.find((el) => el.guid === guidOrderedList[index]);
            if (ch) {
                guidOrderedList.splice(index--, 1);
                newChapters.push(this._sortCurrentChapter(ch, guidOrderedList));
            }
        }
        return newChapters;
    }
    _renderChapters(pageElement, chapters, childrenStartingIndex) {
        return chapters.map((chapter, index) => {
            let indexToDisplay = childrenStartingIndex === undefined
                ? `${index + 1}.`
                : `${childrenStartingIndex}${index + 1}.`;
            return (h("li", { class: chapter.guid === this.activeChapter ? "toc-item active" : "toc-item", onClick: (evt) => {
                    evt.stopImmediatePropagation();
                    evt.preventDefault();
                    scrollToElement(chapter.title, pageElement);
                    this.activeChapter = chapter.guid;
                } }, h("span", { class: "chapter-index" }, indexToDisplay), h("span", { class: "chapter-title" }, chapter.title), chapter.children.length === 0 ? null
                : h("ul", null, this._renderChapters(pageElement, chapter.children, indexToDisplay))));
        });
    }
    render() {
        if ((!this.initialChapterSetupDone || !this.activeChapter)
            && this.chapterList.length > 0) {
            this.activeChapter = this.chapterList[0].guid;
            this.initialChapterSetupDone = true;
        }
        return (h("div", { class: "table-of-content" }, h("psk-card", { title: this.title }, h("ul", null, this._renderChapters(this.pskPageElement, this.chapterList)))));
    }
};
__decorate([
    CustomTheme(),
    TableOfContentProperty({
        description: `This property is the title of the psk-card that will be created.`,
        isMandatory: false,
        propertyType: `string`
    })
], PskToc.prototype, "title", void 0);

export { PskToc as psk_toc };
