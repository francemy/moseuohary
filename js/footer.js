import { createOrSelectElement } from "./config.js";

// Função para criar o footer
class Footer {
    constructor() {
        // Criação do elemento footer
        this.footerElement = createOrSelectElement({ type: 'footer' });
        // Aplicação das classes Tailwind diretamente no footer
        this.footerElement.className = 'bg-blue-600  text-white p-4 text-center mt-auto w-full';
        this.footerElement.innerHTML = `
            <p>&copy; 2024 Museu Ohary. Todos os direitos reservados. by: Francemy</p>
        `;
    }

    render() {
        return this.footerElement;
    }
}

export {Footer}