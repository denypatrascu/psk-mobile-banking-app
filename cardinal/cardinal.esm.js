import { b as bootstrapLazy } from './index-bb32d9fe.js';
import { p as patchBrowser, g as globalScripts } from './app-globals-af2ed8ca.js';

patchBrowser().then(options => {
  globalScripts();
  return bootstrapLazy(JSON.parse("[[\"psk-default-renderer\",[[1,\"psk-default-renderer\",{\"mobileLayout\":[4,\"mobile-layout\"],\"disableSidebar\":[4,\"disable-sidebar\"],\"appVersion\":[32]}]]],[\"psk-tab-navigator\",[[33,\"psk-tab-navigator\",{\"default\":[1538],\"layout\":[513],\"tabNavigator\":[32]},[[0,\"psk-tab-navigator:psk-select:change\",\"onTabSelected\"]]]]],[\"psk-controller-descriptor\",[[0,\"psk-controller-descriptor\",{\"title\":[1],\"decoratorControllers\":[32]},[[4,\"psk-send-controllers\",\"receivedControllersDescription\"]]]]],[\"psk-event-descriptor\",[[0,\"psk-event-descriptor\",{\"title\":[1],\"decoratorEvents\":[32]},[[4,\"psk-send-events\",\"receivedEventsDescription\"]]]]],[\"psk-mobile\",[[33,\"psk-mobile\",{\"title\":[1],\"disableHeader\":[4,\"disable-header\"],\"disableSidebar\":[4,\"disable-sidebar\"],\"enableBack\":[4,\"enable-back\"],\"controllerName\":[1,\"controller-name\"],\"history\":[16],\"controller\":[32],\"aside\":[32],\"options\":[32],\"header\":[32],\"toggleSidebar\":[64],\"toggleOptions\":[64]},[[0,\"click\",\"onClickEvent\"]]]]],[\"psk-property-descriptor\",[[0,\"psk-property-descriptor\",{\"title\":[1],\"decoratorProperties\":[32]},[[4,\"psk-send-props\",\"receivedPropertiesDescription\"]]]]],[\"psk-button-link\",[[1,\"psk-button-link\",{\"page\":[1],\"name\":[1],\"icon\":[1],\"eventName\":[1,\"event-name\"],\"eventData\":[8,\"event-data\"],\"eventDispatcher\":[1,\"event-dispatcher\"]}]]],[\"psk-code\",[[0,\"psk-code\",{\"title\":[1],\"language\":[1],\"componentCode\":[32]}]]],[\"psk-description\",[[4,\"psk-description\",{\"title\":[1]}]]],[\"psk-example\",[[1,\"psk-example\",{\"title\":[1]}]]],[\"psk-icon-chooser\",[[0,\"psk-icon-chooser\",{\"iconsColor\":[1,\"icons-color\"],\"iconsSize\":[1,\"icons-size\"],\"value\":[1],\"iconsModelListToShow\":[32]}]]],[\"psk-barcode-generator\",[[0,\"psk-barcode-generator\",{\"data\":[8],\"type\":[1],\"title\":[1],\"size\":[8],\"includeText\":[4,\"include-text\"],\"isLoaded\":[32]}]]],[\"psk-breadcrumb-navigator\",[[33,\"psk-breadcrumb-navigator\",{\"eventName\":[1,\"event-name\"],\"segments\":[16]}]]],[\"psk-date-input\",[[0,\"psk-date-input\",{\"label\":[1],\"value\":[1],\"name\":[1],\"placeholder\":[1],\"required\":[1],\"readOnly\":[4,\"read-only\"],\"invalidValue\":[4,\"invalid-value\"],\"dataFormat\":[1,\"data-format\"]}]]],[\"psk-email-input\",[[0,\"psk-email-input\",{\"label\":[1],\"value\":[1],\"name\":[1],\"placeholder\":[1],\"required\":[4],\"readOnly\":[4,\"read-only\"],\"invalidValue\":[4,\"invalid-value\"]}]]],[\"psk-img-input\",[[0,\"psk-img-input\",{\"src\":[8],\"alt\":[1],\"placeholder\":[1],\"label\":[1],\"eventName\":[1,\"event-name\"],\"imageSource\":[32]}]]],[\"psk-number-input\",[[0,\"psk-number-input\",{\"label\":[1],\"value\":[1],\"name\":[1],\"placeholder\":[1],\"required\":[4],\"readOnly\":[4,\"read-only\"],\"invalidValue\":[4,\"invalid-value\"]}]]],[\"psk-password-input\",[[0,\"psk-password-input\",{\"label\":[1],\"value\":[1],\"name\":[1],\"placeholder\":[1],\"required\":[4],\"readOnly\":[4,\"read-only\"],\"invalidValue\":[4,\"invalid-value\"]}]]],[\"psk-pin-popup\",[[1,\"psk-pin-popup\",{\"opened\":[1540],\"pin\":[32],\"errorMessage\":[32]},[[0,\"closeModal\",\"closePinPopup\"]]]]],[\"psk-radio-group\",[[4,\"psk-radio-group\",{\"label\":[1],\"value\":[1537],\"name\":[1],\"required\":[4],\"invalid\":[4],\"options\":[32]},[[0,\"onChangeRadio\",\"onChangeRadioHandler\"]]]]],[\"psk-text-input\",[[0,\"psk-text-input\",{\"label\":[1],\"value\":[8],\"name\":[1],\"placeholder\":[1],\"required\":[4],\"readOnly\":[4,\"read-only\"],\"invalidValue\":[4,\"invalid-value\"]}]]],[\"psk-toc\",[[0,\"psk-toc\",{\"title\":[1],\"pskPageElement\":[32],\"activeChapter\":[32],\"chapterList\":[32],\"initialChapterSetupDone\":[32]},[[4,\"psk-send-toc\",\"tocReceived\"]]]]],[\"sidebar-renderer\",[[1,\"sidebar-renderer\",{\"value\":[16],\"historyType\":[1,\"history-type\"],\"active\":[516]}]]],[\"psk-accordion-item\",[[33,\"psk-accordion-item\",{\"title\":[1],\"opened\":[4],\"layout\":[1537]}]]],[\"psk-attachments-list\",[[1,\"psk-attachments-list\",{\"files\":[8],\"readOnly\":[4,\"read-only\"],\"noAttachmentsText\":[1,\"no-attachments-text\"],\"attachmentsClass\":[1,\"attachments-class\"]}]]],[\"psk-button-group\",[[4,\"psk-button-group\",{\"opened\":[1540],\"label\":[513],\"icon\":[1],\"iconColor\":[1,\"icon-color\"],\"classes\":[1]},[[10,\"click\",\"handleClickOutside\"]]]]],[\"psk-button-test\",[[1,\"psk-button-test\"]]],[\"psk-checkbox\",[[0,\"psk-checkbox\",{\"label\":[1],\"name\":[1],\"checkboxLabel\":[8,\"checkbox-label\"],\"required\":[4],\"checked\":[1],\"value\":[1544],\"checkedValue\":[1,\"checked-value\"],\"uncheckedValue\":[1,\"unchecked-value\"]}]]],[\"psk-condition\",[[0,\"psk-condition\",{\"condition\":[8],\"conditionResult\":[32],\"modelChain\":[32]}]]],[\"psk-container\",[[4,\"psk-container\",{\"controllerName\":[1,\"controller-name\"],\"htmlFilePath\":[1,\"html-file-path\"],\"parentCallback\":[16],\"history\":[16],\"controller\":[32],\"innerHtml\":[32],\"controllerScript\":[32],\"disconnected\":[32]}]]],[\"psk-date\",[[0,\"psk-date\",{\"value\":[8],\"format\":[1],\"hoverFormat\":[1,\"hover-format\"]}]]],[\"psk-details\",[[33,\"psk-details\",{\"title\":[1],\"opened\":[4],\"layout\":[1537],\"eventName\":[1,\"event-name\"],\"eventData\":[8,\"event-data\"],\"eventDispatcher\":[1,\"event-dispatcher\"]}]]],[\"psk-files-chooser\",[[4,\"psk-files-chooser\",{\"label\":[1],\"accept\":[1],\"listFiles\":[4,\"list-files\"],\"filesAppend\":[4,\"files-append\"],\"eventName\":[1,\"event-name\"],\"files\":[32]}]]],[\"psk-page\",[[1,\"psk-page\",{\"hasToc\":[516,\"has-toc\"],\"pageClass\":[1,\"page-class\"],\"title\":[513],\"navigationTitle\":[1,\"navigation-title\"],\"subTitle\":[1,\"sub-title\"],\"tocTitle\":[1,\"toc-title\"],\"badgeText\":[1,\"badge-text\"],\"badgeTextColor\":[1,\"badge-text-color\"],\"badgeBackgroundColor\":[1,\"badge-background-color\"],\"activeChapter\":[32],\"chapters\":[32],\"componentFullyLoaded\":[32]},[[0,\"psk-send-chapter\",\"receiveChapters\"]]]]],[\"psk-page-not-found\",[[1,\"psk-page-not-found\",{\"basePath\":[1,\"base-path\"],\"urlDestination\":[1,\"url-destination\"],\"pageRenderer\":[1,\"page-renderer\"]}]]],[\"psk-switch-button\",[[0,\"psk-switch-button\",{\"active\":[1],\"inactive\":[1],\"eventDispatcher\":[1,\"event-dispatcher\"],\"toggleEvent\":[1,\"toggle-event\"],\"title\":[1],\"closed\":[32]}]]],[\"psk-textarea\",[[0,\"psk-textarea\",{\"label\":[1],\"value\":[1],\"name\":[1],\"placeholder\":[1],\"required\":[4],\"readOnly\":[4,\"read-only\"],\"invalidValue\":[4,\"invalid-value\"]}]]],[\"psk-toolbar\",[[1,\"psk-toolbar\",{\"actions\":[1],\"icons\":[4],\"eventData\":[1,\"event-data\"]}]]],[\"psk-wizard\",[[0,\"psk-wizard\",{\"componentRender\":[1,\"component-render\"],\"wizardSteps\":[1040],\"activeStep\":[32]}]]],[\"query-pages-router\",[[1,\"query-pages-router\",{\"history\":[16],\"pages\":[16],\"location\":[16],\"redirectTo\":[1,\"redirect-to\"],\"routes\":[32],\"currentRoute\":[32]}]]],[\"context-consumer\",[[0,\"context-consumer\",{\"context\":[16],\"renderer\":[16],\"subscribe\":[16],\"unsubscribe\":[32]}]]],[\"dropdown-renderer\",[[4,\"dropdown-renderer\",{\"active\":[516],\"url\":[8],\"somethingChanged\":[4,\"something-changed\"],\"isOpened\":[32],\"dropDownHasChildActive\":[32]},[[10,\"click\",\"handleClick\"],[10,\"menuClicked\",\"handleMenuClick\"],[8,\"routeChanged\",\"routeChanged\"]]]]],[\"expandable-renderer\",[[4,\"expandable-renderer\",{\"active\":[516],\"url\":[8],\"somethingChanged\":[4,\"something-changed\"],\"firstMenuChild\":[8,\"first-menu-child\"],\"history\":[16],\"isOpened\":[32],\"dropDownHasChildActive\":[32]},[[8,\"sectionChange\",\"routeChanged\"]]]]],[\"mobile-profile-renderer\",[[1,\"mobile-profile-renderer\",{\"userInfo\":[8,\"user-info\"]}]]],[\"psk-accordion\",[[33,\"psk-accordion\",{\"multiple\":[4],\"layout\":[1537]}]]],[\"psk-app-root\",[[1,\"psk-app-root\",{\"controller\":[8],\"disableSidebar\":[4,\"disable-sidebar\"],\"mobileLayout\":[32],\"historyType\":[32],\"componentCode\":[32],\"hasSlot\":[32],\"htmlLoader\":[32],\"disconnected\":[32]},[[11,\"resize\",\"checkLayout\"]]]]],[\"psk-barcode-scanner\",[[0,\"psk-barcode-scanner\",{\"data\":[8],\"title\":[1],\"ZXing\":[32],\"activeDeviceId\":[32],\"cameraIsAvailable\":[32]}]]],[\"psk-custom\",[[1,\"psk-custom\"]]],[\"psk-echo\",[[0,\"psk-echo\",{\"value\":[1]}]]],[\"psk-floating-menu\",[[1,\"psk-floating-menu\",{\"opened\":[1540],\"menuItems\":[32]}]]],[\"psk-for-each\",[[0,\"psk-for-each\",{\"dataViewModel\":[1,\"data-view-model\"],\"modelChanged\":[32],\"model\":[32],\"chain\":[32]}]]],[\"psk-form\",[[4,\"psk-form\",{\"history\":[16],\"controllerName\":[1,\"controller-name\"],\"formActions\":[1,\"form-actions\"],\"controller\":[32],\"disconnected\":[32]}]]],[\"psk-highlight\",[[4,\"psk-highlight\",{\"title\":[1],\"typeOfHighlight\":[1,\"type-of-highlight\"]}]]],[\"psk-img\",[[0,\"psk-img\",{\"src\":[1],\"width\":[1],\"height\":[1],\"title\":[1]}]]],[\"psk-layout\",[[1,\"psk-layout\",{\"templateColumns\":[1,\"template-columns\"],\"templateRows\":[1,\"template-rows\"],\"columns\":[2],\"rows\":[2],\"autoColumns\":[1,\"auto-columns\"],\"autoRows\":[1,\"auto-rows\"],\"autoFlow\":[1,\"auto-flow\"],\"gap\":[1],\"columnGap\":[1,\"column-gap\"],\"rowGap\":[1,\"row-gap\"],\"alignItems\":[1,\"align-items\"],\"alignItemsX\":[1,\"align-items-x\"],\"alignItemsY\":[1,\"align-items-y\"],\"alignContent\":[1,\"align-content\"],\"alignContentX\":[1,\"align-content-x\"],\"alignContentY\":[1,\"align-content-y\"]}]]],[\"psk-layout-item\",[[1,\"psk-layout-item\",{\"column\":[1],\"columnStart\":[1,\"column-start\"],\"columnEnd\":[1,\"column-end\"],\"row\":[1],\"rowStart\":[1,\"row-start\"],\"rowEnd\":[1,\"row-end\"],\"align\":[1],\"alignX\":[1,\"align-x\"],\"alignY\":[1,\"align-y\"]}]]],[\"psk-list\",[[0,\"psk-list\",{\"listType\":[1,\"list-type\"]}]]],[\"psk-list-feedbacks\",[[1,\"psk-list-feedbacks\",{\"styleCustomisation\":[1,\"style-customisation\"],\"timeAlive\":[2,\"time-alive\"],\"messagesToDisplay\":[2,\"messages-to-display\"],\"toastRenderer\":[1,\"toast-renderer\"],\"alertRenderer\":[1,\"alert-renderer\"],\"alertOpened\":[32],\"_messagesQueue\":[32],\"_messagesContent\":[32],\"timeMeasure\":[32],\"timer\":[32],\"opened\":[32],\"typeOfAlert\":[32]},[[0,\"closeFeedback\",\"closeFeedbackHandler\"]]]]],[\"psk-live-code\",[[1,\"psk-live-code\",{\"value\":[1],\"language\":[1]}]]],[\"psk-load-placeholder\",[[1,\"psk-load-placeholder\",{\"shouldBeRendered\":[32]}]]],[\"psk-menu-item-renderer\",[[1,\"psk-menu-item-renderer\",{\"value\":[16],\"active\":[516],\"historyType\":[1,\"history-type\"]}]]],[\"psk-page-not-found-renderer\",[[1,\"psk-page-not-found-renderer\"]]],[\"psk-route-redirect\",[[0,\"psk-route-redirect\",{\"url\":[8],\"history\":[16]}]]],[\"psk-slideshow\",[[1,\"psk-slideshow\",{\"images\":[1],\"title\":[1],\"caption\":[1],\"visibleSeconds\":[2,\"visible-seconds\"],\"fadeSeconds\":[2,\"fade-seconds\"],\"imagesSrcs\":[32],\"slideshowHeight\":[32],\"marginTop\":[32]},[[11,\"resize\",\"checkLayout\"]]]]],[\"psk-ssapp\",[[0,\"psk-ssapp\",{\"appName\":[1,\"app-name\"],\"seed\":[1,\"key-ssi\"],\"landingPath\":[1,\"landing-path\"],\"history\":[16],\"match\":[16],\"digestKeySsiHex\":[32]}]]],[\"psk-stepper-renderer\",[[1,\"psk-stepper-renderer\",{\"wizardSteps\":[16],\"activeStep\":[16],\"handleStepChange\":[16]}]]],[\"psk-style\",[[1,\"psk-style\",{\"src\":[1]}]]],[\"psk-tab\",[[1,\"psk-tab\",{\"title\":[1]}]]],[\"psk-table\",[[1,\"psk-table\",{\"header\":[4],\"footer\":[4],\"cellsWidth\":[1,\"cells-width\"],\"tableContent\":[32]}]]],[\"psk-ui-alert\",[[1,\"psk-ui-alert\",{\"typeOfAlert\":[1,\"type-of-alert\"],\"message\":[8],\"timeAlive\":[8,\"time-alive\"],\"styleCustomisation\":[1,\"style-customisation\"],\"isVisible\":[32]}]]],[\"psk-ui-toast\",[[1,\"psk-ui-toast\",{\"message\":[8],\"timeSinceCreation\":[2,\"time-since-creation\"],\"timeMeasure\":[1,\"time-measure\"],\"styleCustomisation\":[1,\"style-customisation\"],\"toast\":[32]}]]],[\"psk-user-profile-renderer\",[[1,\"psk-user-profile-renderer\",{\"userInfo\":[8,\"user-info\"]}]]],[\"query-page-link\",[[4,\"query-page-link\",{\"url\":[1],\"urlMatch\":[1,\"url-match\"],\"activeClass\":[1,\"active-class\"],\"exact\":[4],\"strict\":[4],\"custom\":[1],\"anchorClass\":[1,\"anchor-class\"],\"anchorRole\":[1,\"anchor-role\"],\"anchorTitle\":[1,\"anchor-title\"],\"anchorTabIndex\":[1,\"anchor-tab-index\"],\"anchorId\":[1,\"anchor-id\"],\"history\":[16],\"location\":[16],\"ariaHaspopup\":[1,\"aria-haspopup\"],\"ariaPosinset\":[1,\"aria-posinset\"],\"ariaSetsize\":[2,\"aria-setsize\"],\"ariaLabel\":[1,\"aria-label\"],\"match\":[32]}]]],[\"stencil-async-content\",[[0,\"stencil-async-content\",{\"documentLocation\":[1,\"document-location\"],\"content\":[32]}]]],[\"stencil-route-title\",[[0,\"stencil-route-title\",{\"titleSuffix\":[1,\"title-suffix\"],\"pageTitle\":[1,\"page-title\"]}]]],[\"stencil-router-prompt\",[[0,\"stencil-router-prompt\",{\"when\":[4],\"message\":[1],\"history\":[16],\"unblock\":[32]}]]],[\"psk-app-router\",[[1,\"psk-app-router\",{\"routesItems\":[16],\"historyType\":[1,\"history-type\"],\"notFoundRoute\":[32],\"landingPage\":[32]}]]],[\"event-expandable-renderer\",[[0,\"event-expandable-renderer\",{\"active\":[516],\"url\":[8],\"somethingChanged\":[4,\"something-changed\"],\"firstMenuChild\":[8,\"first-menu-child\"],\"history\":[16],\"item\":[8],\"isOpened\":[32],\"dropDownHasChildActive\":[32],\"isClosed\":[32],\"lazyItems\":[32],\"eventWasResolved\":[32]}]]],[\"psk-grid\",[[0,\"psk-grid\",{\"columns\":[2],\"layout\":[1]}]]],[\"psk-form-row\",[[0,\"psk-form-row\",{\"layout\":[1]}]]],[\"psk-link\",[[1,\"psk-link\",{\"page\":[1],\"tag\":[1],\"chapter\":[1],\"error\":[32],\"destinationUrl\":[32]}]]],[\"psk-modal\",[[33,\"psk-modal\",{\"opened\":[1540],\"expanded\":[1540],\"eventName\":[1,\"event-name\"]}]]],[\"psk-radio\",[[0,\"psk-radio\",{\"label\":[1],\"value\":[1],\"name\":[1],\"readOnly\":[4,\"read-only\"],\"invalidValue\":[4,\"invalid-value\"],\"checked\":[1540]}]]],[\"psk-select\",[[0,\"psk-select\",{\"selectOptions\":[1,\"select-options\"],\"label\":[1],\"value\":[1],\"selectionType\":[1,\"selection-type\"],\"placeholder\":[1],\"required\":[4],\"disabled\":[4],\"invalidValue\":[4,\"invalid-value\"],\"eventName\":[1,\"event-name\"],\"eventData\":[8,\"event-data\"],\"options\":[32]}]]],[\"psk-label-test\",[[0,\"psk-label-test\",{\"firstlabel\":[8,\"first-label\"],\"secondLabel\":[8,\"second-label\"],\"thirdLabel\":[8,\"third-label\"],\"labelValue\":[8,\"cosmin-ursache\"],\"myState\":[32]}]]],[\"psk-page-loader\",[[1,\"psk-page-loader\",{\"pageUrl\":[1,\"page-url\"],\"type\":[1],\"pageContent\":[32],\"errorLoadingPage\":[32]}]]],[\"psk-stepper\",[[0,\"psk-stepper\",{\"componentRender\":[1,\"component-render\"],\"wizardSteps\":[16],\"activeStep\":[16],\"handleStepChange\":[16]}]]],[\"psk-app-menu\",[[1,\"psk-app-menu\",{\"itemRenderer\":[1,\"item-renderer\"],\"menuItems\":[16],\"hamburgerMaxWidth\":[2,\"hamburger-max-width\"],\"historyType\":[1,\"history-type\"],\"showHamburgerMenu\":[32],\"showNavBar\":[32]},[[11,\"resize\",\"checkIfHamburgerIsNeeded\"]]]]],[\"psk-hoc\",[[0,\"psk-hoc\"]]],[\"psk-user-profile\",[[0,\"psk-user-profile\",{\"userInfo\":[8,\"user-info\"],\"profileRenderer\":[8,\"profile-renderer\"]}]]],[\"stencil-route-switch\",[[4,\"stencil-route-switch\",{\"group\":[513],\"scrollTopOffset\":[2,\"scroll-top-offset\"],\"location\":[16],\"routeViewsUpdated\":[16]}]]],[\"stencil-router\",[[4,\"stencil-router\",{\"root\":[1],\"historyType\":[1,\"history-type\"],\"titleSuffix\":[1,\"title-suffix\"],\"scrollTopOffset\":[2,\"scroll-top-offset\"],\"location\":[32],\"history\":[32]}]]],[\"psk-chapter-wrapper\",[[4,\"psk-chapter-wrapper\",{\"title\":[1]}]]],[\"psk-ui-loader\",[[1,\"psk-ui-loader\",{\"shouldBeRendered\":[4,\"should-be-rendered\"]}]]],[\"stencil-route\",[[0,\"stencil-route\",{\"group\":[513],\"componentUpdated\":[16],\"match\":[1040],\"url\":[1],\"component\":[1],\"componentProps\":[16],\"exact\":[4],\"routeRender\":[16],\"scrollTopOffset\":[2,\"scroll-top-offset\"],\"routeViewsUpdated\":[16],\"location\":[16],\"history\":[16],\"historyType\":[1,\"history-type\"]}]]],[\"stencil-router-redirect\",[[0,\"stencil-router-redirect\",{\"history\":[16],\"root\":[1],\"url\":[1]}]]],[\"stencil-route-link\",[[4,\"stencil-route-link\",{\"url\":[1],\"urlMatch\":[1,\"url-match\"],\"activeClass\":[1,\"active-class\"],\"exact\":[4],\"strict\":[4],\"custom\":[1],\"anchorClass\":[1,\"anchor-class\"],\"anchorRole\":[1,\"anchor-role\"],\"anchorTitle\":[1,\"anchor-title\"],\"anchorTabIndex\":[1,\"anchor-tab-index\"],\"anchorId\":[1,\"anchor-id\"],\"history\":[16],\"location\":[16],\"root\":[1],\"ariaHaspopup\":[1,\"aria-haspopup\"],\"ariaPosinset\":[1,\"aria-posinset\"],\"ariaSetsize\":[2,\"aria-setsize\"],\"ariaLabel\":[1,\"aria-label\"],\"match\":[32]}]]],[\"psk-button\",[[4,\"psk-button\",{\"label\":[1],\"buttonClass\":[1,\"button-class\"],\"eventName\":[1,\"event-name\"],\"doubleClickEventName\":[1,\"double-click-event-name\"],\"touchEventName\":[1,\"touch-event-name\"],\"eventData\":[8,\"event-data\"],\"disabled\":[8],\"type\":[1],\"eventDispatcher\":[1,\"event-dispatcher\"]}]]],[\"psk-input\",[[0,\"psk-input\",{\"dataDate\":[1,\"data-date\"],\"type\":[1],\"label\":[1],\"value\":[1],\"name\":[1],\"placeholder\":[1],\"required\":[4],\"readOnly\":[4,\"read-only\"],\"invalidValue\":[4,\"invalid-value\"],\"dataDateFormat\":[1,\"data-date-format\"],\"specificProps\":[8,\"specific-props\"]}]]],[\"psk-copy-clipboard\",[[4,\"psk-copy-clipboard\",{\"id\":[1],\"chapterToken\":[32]}]]],[\"psk-card\",[[4,\"psk-card\",{\"title\":[513],\"id\":[1]}]]],[\"psk-chapter\",[[4,\"psk-chapter\",{\"title\":[513],\"guid\":[1537],\"chapterInfo\":[32],\"reportedToc\":[32]},[[0,\"psk-send-chapter\",\"receivedChapter\"]]]]],[\"psk-icon\",[[0,\"psk-icon\",{\"icon\":[1],\"disableColor\":[4,\"disable-color\"],\"color\":[1],\"classes\":[1]}]]],[\"psk-label\",[[4,\"psk-label\",{\"label\":[1],\"for\":[1]}]]]]"), options);
});
