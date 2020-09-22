import ContainerController from '../../cardinal/controllers/base-controllers/ContainerController.js';

class MainController extends ContainerController {
    getModel() {
        const model = {
            footer: [
                {
                    name: 'Balance',
                    icon: 'balance-scale',
                    page: 'balance'
                },
                {
                    name: 'Payments',
                    icon: 'money',
                    page: 'payments'
                },
                {
                    name: 'Services',
                    icon: 'briefcase'
                },
                {
                    name: 'Account',
                    icon: 'user'
                }
            ],
            fullscreen: {
                event: 'toggle-fullscreen',
                in: {
                    icon: 'arrows-alt',
                    text: 'Enter fullscreen'
                },
                out: {
                    icon: 'times',
                    text: 'Exit fullscreen'
                }
            },
            options: {
                in: {
                    event: 'show-mobile-options'
                },
                out: {
                    event: 'hide-mobile-options'
                }
            }

        }
        model.fullscreen.option = model.fullscreen.in;
        return model;
    }

    constructor(element) {
        super(element);
        this.model = this.setModel(this.getModel());

        this.checkFullScreen();

        this.on(this.model.fullscreen.event, async e => {
            e.preventDefault();
            e.stopImmediatePropagation();
            await this.toggleFullScreen();
        });
    }



    async toggleFullScreen() {
        if (!document.fullscreenElement) {
            try {
                await document.documentElement.requestFullscreen();
                this.model.fullscreen.option = this.model.fullscreen.out;
                this.hideOptions();
            } catch (err) {
                console.error('Fullscreen error [in]:', err);
            }
        } else {
            if (document.exitFullscreen) {
                try {
                    await document.exitFullscreen();
                    this.model.fullscreen.option = this.model.fullscreen.in;
                    this.hideOptions();
                } catch (err) {
                    console.error('Fullscreen error [out]:', err);
                }
            }
        }
    }

    checkFullScreen() {
        if (document.fullscreenEnabled) {
            this.model.fullscreen.option = this.model.fullscreen.out;
        }
    }

    hideOptions() {
        document.dispatchEvent(new Event(this.model.options.out.event));
    }
}

export default MainController;