import { b as closestParentTagElement } from './utilFunctions-74de6735.js';

function highlightChapter() {
    let self = this;
    let targetElement = self.element;
    let chapterList = Array.from(self.element.querySelectorAll("psk-chapter"));
    self.activeChapter = null;
    const pageVerticalOffset = targetElement.scrollTop;
    const pageHeight = targetElement.offsetHeight;
    let chapterListDetails = _getChapterDetails(chapterList);
    _highlight.call(self, chapterListDetails, pageVerticalOffset, pageHeight);
}
function _getChapterDetails(chapterList) {
    let chapterListInfo = [];
    chapterList.forEach((chapter) => {
        const chapterId = chapter.getAttribute("guid");
        if (!chapterId) {
            return null;
        }
        const child = chapter.getElementsByClassName("card psk-card")
            ? chapter.getElementsByClassName("card psk-card")[0]
            : null;
        if (!child) {
            return null;
        }
        const verticalOffset = _getVerticalOffset(child, chapterListInfo);
        chapterListInfo.push({
            guid: chapterId,
            height: child.offsetHeight,
            verticalOffset: verticalOffset,
            title: chapter.title
        });
    });
    return chapterListInfo;
}
function _highlight(chapterListDetails, pageVerticalOffset, pageHeight) {
    let self = this;
    /**
     * First, check if we have any chapter that is fully displayed.
     * If yes, this is the canditate.
     */
    let fullDisplayedChapter = chapterListDetails.find((chapter) => {
        return (pageVerticalOffset <= chapter.verticalOffset &&
            chapter.verticalOffset + chapter.height <=
                pageVerticalOffset + pageHeight);
    });
    if (fullDisplayedChapter) {
        self.activeChapter = fullDisplayedChapter.guid;
        return;
    }
    /**
     * If no full chapter is displayed, then we should display the first chapter that has some visual
     */
    let lastChapterInView = chapterListDetails.filter((chapter) => {
        return (pageVerticalOffset >= chapter.verticalOffset &&
            (pageVerticalOffset + pageHeight <=
                chapter.verticalOffset + chapter.height ||
                pageVerticalOffset <= chapter.verticalOffset + chapter.height));
    });
    if (lastChapterInView.length > 0) {
        self.activeChapter = lastChapterInView[lastChapterInView.length - 1].guid;
        return;
    }
    /**
     * Last option. The first chapter is our canditate, as it should be the first chapter,
     * the scroll is on top of the page, and the chapter might be bigger than the browser's visual height
     */
    if (chapterListDetails.length > 0) {
        self.activeChapter = chapterListDetails[0].guid;
    }
}
function _getVerticalOffset(chapter, chapterListInfo) {
    let vOffset = chapter.offsetTop;
    const vHeight = chapter.offsetHeight;
    let previousEntry = chapterListInfo[chapterListInfo.length - 1]
        ? chapterListInfo[chapterListInfo.length - 1]
        : null;
    if (previousEntry) {
        let { verticalOffset, height } = previousEntry;
        if (verticalOffset > vOffset ||
            verticalOffset + height > vOffset + vHeight) {
            const parentElement = closestParentTagElement(chapter, "psk-chapter", 2);
            const parent = chapterListInfo.find((chapter) => {
                return (parentElement && chapter.guid === parentElement.getAttribute("guid"));
            });
            if (parent) {
                vOffset += parent.verticalOffset;
            }
        }
    }
    return vOffset;
}

export { highlightChapter as h };
