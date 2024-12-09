import { ButtonComponent } from "./ButtonVarialComponent.js";
import { setaPageDireita, setaPageEsquerda } from "./IconComponent.js";
import { ENVIRONMENT } from "./config.js";

class Galeria {
    constructor(cards, cardsPerPage = 6, initPage = 1) {
        this.galeriaContainer = document.getElementById('galeria') || document.createElement('section');
        if (!this.galeriaContainer.id) this.galeriaContainer.id = 'galeria-' + this.key
        if (ENVIRONMENT["Galeria"]) {
            ENVIRONMENT["Galeria"] += 1;
        }
        else
            ENVIRONMENT["Galeria"] = 1;
        this.key = ENVIRONMENT["Galeria"]
        this.cards = cards;  // Recebe um array de CardComponent
        this.currentPage = initPage;  // Página inicial
        this.cardsPerPage = cardsPerPage; // Número de cards por página
        this.totalPages = Math.ceil(cards.length / this.cardsPerPage); // Calcula o número total de páginas
        this.createGallery();
    }

    // Função para mostrar os cards de uma página específica
    displayCards(page) {
        const start = (page - 1) * this.cardsPerPage;
        const end = start + this.cardsPerPage;
        const cardsToShow = this.cards.slice(start, end);
        const mainContainer = document.getElementById('mainContainer-' + this.key) || document.createElement('section')
        mainContainer.innerHTML = ''; // Limpa o conteúdo da galeria
        if (!document.getElementById('mainContainer-' + this.key)) {
            mainContainer.id = 'mainContainer-' + this.key
            this.galeriaContainer.className = "relative w-[100dhv] h-45 flex-col gap-2 p-2"

        }

        // Limpa os cards da galeria

        mainContainer.className =
            "grid relative border border-gray shadow-md p-1 gap-4  h-20" +
            "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 " +
            "max-w-6xl mx-auto";  // Limite máximo de largura (6xl) e centralização automática

        // Adiciona os cards da página atual
        if (cardsToShow)
            cardsToShow.forEach(card => {
                mainContainer.appendChild(card.render());
            });
        this.galeriaContainer.appendChild(mainContainer)
        this.createPagination();
    }

    // Função para criar os botões de navegação da página
    createPagination() {
        const paginationContainer = document.getElementById('paginationContainer-' + this.key) || document.createElement('div');
        paginationContainer.innerHTML = ''
        if (!document.getElementById('paginationContainer-' + this.key)) {
            paginationContainer.id = 'paginationContainer-' + this.key
            paginationContainer.className =
                "flex flex-row relative mb-4 w-full justify-center items-center gap-2 mt-4 p-2 bg-gray-500";

        }

        this.createPageButton('Anterior', this.currentPage > 1, () => {
            if (this.currentPage > 1) {
                this.currentPage--;
                this.displayCards(this.currentPage);
            }
        }, paginationContainer, setaPageEsquerda());

        // Botões de página
        for (let i = 1; i <= this.totalPages; i++) {
            this.createPageButton(
                i,
                i !== this.currentPage,
                () => {
                    this.currentPage = i;
                    this.displayCards(this.currentPage);
                },
                paginationContainer
            );
        }

        this.createPageButton('Próximo', this.currentPage < this.totalPages, () => {
            if (this.currentPage < this.totalPages) {
                this.currentPage++;
                this.displayCards(this.currentPage);
            }
        }, paginationContainer, setaPageDireita());

        this.galeriaContainer.appendChild(paginationContainer);
    }

    // Função auxiliar para criar um botão de navegação (anterior, próximo ou número da página)
    createPageButton(label, enabled, onClick, container, icon = null) {
        let className = 'w-4 h-4 '
        if (label === "Próximo" || label === "Anterior") {
            label = '';  // Limpa o label para os botões de navegação
            className = 'w-6 h-6 '
        }

        const button = document.getElementById('button-' + this.key) || new ButtonComponent({
            label: label,
            className: "text-sm font-medium rounded-md " + className +
                (enabled
                    ? " bg-blue text-white hover:bg-blue"
                    : " bg-gray text-gray cursor-not-allowed"),
            onClick: onClick,
            icon: icon
        }).render();
        if (!button.id) button.id = 'button-' + this.key
        button.disabled = !enabled;
        container.appendChild(button);
    }

    // Função para criar a galeria inicial
    createGallery() {
        this.displayCards(this.currentPage);  // Exibe os cards da primeira página
    }

    getID() {
        return this.galeriaContainer.id
    }

    render() {
        return this.galeriaContainer;
    }
}

export { Galeria };
