import ContainerController from '../../cardinal/controllers/base-controllers/ContainerController.js';

class TestMobileController extends ContainerController {
    getModel() {
        return {
            footer: [
                { name: 'Home', icon: 'home', page: 'pages/home' },
                { name: 'Tasks', icon: 'tasks', page: 'pages/tasks' },
                { name: 'History', icon: 'history', page: 'pages/history' },
                { name: 'Settings', icon: 'cog', page: 'pages/settings' }
            ],
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