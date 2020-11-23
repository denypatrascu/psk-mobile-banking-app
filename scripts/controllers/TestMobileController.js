import ContainerController from '../../cardinal/controllers/base-controllers/ContainerController.js';
import { GLOBAL } from './MainController.js';

class TestMobileController extends ContainerController {
    getModel() {
        return {
            footer: [...GLOBAL.footer],
            options: [
                { name: 'About', page: 'about' },
                { name: 'Glossary', page: 'glossary' }
            ]
        }
    }

    constructor(element) {
        super(element);

        this.model = this.setModel(this.getModel());
    }
}

export default TestMobileController;