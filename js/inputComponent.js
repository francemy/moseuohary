import { createOrSelectElement, ENVIRONMENT } from "./config.js";

class InputComponent {
    constructor(type = 'text', placeholder = '', id = null) {

        // Gerar chave única, se não fornecida
        if (!id) {
            const componentName = "InputComponent";
            if (ENVIRONMENT[componentName]) {
                ENVIRONMENT[componentName] += 1;
            } else {
                ENVIRONMENT[componentName] = 1;
            }
            id = componentName+ ENVIRONMENT[componentName];
        }
        this.key = id;
        this.type = type;
        this.placeholder = placeholder;
        this.id = id || `input-${Date.now()}`;
        this.className = 'input-component w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500';

        this.element = this.createInputElement();
    }

    // Método para criar o input
    createInputElement() {
        const input = createOrSelectElement(this.id, this.className, 'input');
        input.type = this.type;
        input.placeholder = this.placeholder;
        return input;
    }

    // Método para renderizar o input
    render() {
        return this.element;
    }

    // Atualiza o placeholder ou tipo
    update(placeholder, type) {
        this.placeholder = placeholder || this.placeholder;
        this.type = type || this.type;
        this.element.placeholder = this.placeholder;
        this.element.type = this.type;
    }
}


export { InputComponent }