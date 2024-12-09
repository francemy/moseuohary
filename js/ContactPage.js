import { ButtonComponent } from "./ButtonVarialComponent.js";
import { createOrSelectElement } from "./config.js";
import { InputComponent } from "./inputComponent.js";

// Função para criar a página de contato
function ContactPage() {
    // Criação dos campos de entrada usando InputComponent
    const nameInput = new InputComponent('text', 'Digite seu nome');
    const emailInput = new InputComponent('email', 'Digite seu e-mail');
    const messageInput = new InputComponent('text', 'Digite sua mensagem');

    // Validação dos campos de entrada
    const validateFields = () => {
        const errors = [];
        if (!nameInput.element.value.trim()) {
            errors.push("O campo 'Nome' é obrigatório.");
        }
        if (!emailInput.element.value.trim() || !/\S+@\S+\.\S+/.test(emailInput.element.value)) {
            errors.push("Insira um endereço de e-mail válido.");
        }
        if (!messageInput.element.value.trim()) {
            errors.push("O campo 'Mensagem' é obrigatório.");
        }
        return errors;
    };

    // Estilo personalizado para o botão
    const buttonStyle = {
        backgroundColor: '#4CAF50',
        color: '#fff',
        padding: '12px 24px',
        fontSize: '16px',
        borderRadius: '8px',
        cursor: 'pointer',
        border: 'none',
        transition: 'background-color 0.3s ease',
    };

    // Função para o clique do botão
    const handleSubmit = () => {
        const errors = validateFields();
        if (errors.length > 0) {
            alert(errors.join('\n'));
            return;
        }
        console.log('Nome:', nameInput.element.value);
        console.log('E-mail:', emailInput.element.value);
        console.log('Mensagem:', messageInput.element.value);
        alert('Mensagem enviada com sucesso!');
    };

    // Criação do botão usando ButtonComponent
    const submitButton = new ButtonComponent({
        label: 'Enviar',
        styleConfig: buttonStyle,
        onClick: handleSubmit,
    });

    // Criação do container da página
    const contactContainer = createOrSelectElement({ type: 'section' });
    contactContainer.className =
        'flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-green-300 to-blue-500 p-4';

    // Criando o título da página
    const title = createOrSelectElement({ type: 'h2' });
    title.className = 'text-4xl font-bold text-white text-center mb-6';
    title.innerText = 'Entre em Contato';

    // Criando um card centralizado
    const formCard = createOrSelectElement({ type: 'div' });
    formCard.className =
        'bg-white rounded-lg shadow-lg p-6 w-full max-w-lg flex flex-col gap-4';

    // Adicionando os campos de entrada e botão ao container
    formCard.appendChild(nameInput.render());
    formCard.appendChild(emailInput.render());
    formCard.appendChild(messageInput.render());
    formCard.appendChild(submitButton.render());

    // Adicionando os elementos ao container principal
    contactContainer.appendChild(title);
    contactContainer.appendChild(formCard);

    // Retorna o container para renderização
    return contactContainer;
}

// Exportação da página de contato
export { ContactPage };
