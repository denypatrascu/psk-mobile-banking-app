import ContainerController from "../../cardinal/controllers/base-controllers/ContainerController.js";

class TestBarcodeController extends ContainerController {
    getModel() {
        return ({
            scanner: {
                isActive: true,
                data: ''
            }
        });
    }

    constructor(element) {
        super(element);

        this.setModel(this.getModel());

        console.log(this.model.scanner);

        this.on("toggle-scanner", () => {
            this.model.scanner.isActive = !this.model.scanner.isActive
        });

        this.model.onChange('scanner.data', () => {
            console.log('barcode scanned:', this.model.scanner.data);
            alert(this.model.scanner.data);
        });
    }
}

export default TestBarcodeController;