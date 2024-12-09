import { createOrSelectElement } from "./config.js";

// Função para criar a página sobre
function AboutPage() {
    // Criação do container da página
    const aboutContainer = createOrSelectElement({ type: 'section' });
    aboutContainer.className = 'w-full max-w-lg mx-auto p-6 bg-gray-100 rounded-lg shadow-lg';

    // Criando o título da página
    const title = createOrSelectElement({ type: 'h2' });
    title.className = 'text-3xl font-semibold text-center mb-4';
    title.innerText = 'Sobre o Museu Ohary';

    // Criando o conteúdo da página (descrição sobre o museu)
    const description = createOrSelectElement({ type: 'p' });
    description.className = 'text-lg text-center mb-6';
    description.innerText = 'O Museu Ohary é um espaço dedicado à arte moderna e contemporânea, onde você pode explorar peças de arte em 3D criadas por artistas renomados. Nossa missão é promover a educação e o acesso à arte de forma inovadora, utilizando tecnologias como a impressão 3D e o design interativo.';

    // Adicionando o título e descrição ao container
    aboutContainer.appendChild(title);
    aboutContainer.appendChild(description);

    // Retornando o container com o conteúdo
    return aboutContainer;
}

// Chamando a função para criar a página "Sobre"
export { AboutPage };
