import { ENVIRONMENT } from "./config.js";
class Menu {
    constructor(menuItems, title = "Museu Ohary", subtitle = "Explore peças de arte em 3D") {
        if (ENVIRONMENT["Menu"]) {
            ENVIRONMENT["Menu"] += 1;
        }
        else
            ENVIRONMENT["Menu"] = 1;
        this.key = ENVIRONMENT["Menu"]
        this.menuItems = menuItems; // Array de MenuItem
        this.title = title;         // Título do menu
        this.subtitle = subtitle;   // Subtítulo do menu
        this.menuContainer = document.getElementById('menuContainer-' + this.key) || document.createElement('div'); // Container do menu
        if (!this.menuContainer.id) this.menuContainer.id = 'menuContainer-' + this.key
        this.menuContainer.classList.add('menu-container');

        // Título e subtítulo do menu
        const titleElement = document.getElementById('titleElement-' + this.key) || document.createElement('h1');
        if (!titleElement.id) titleElement.id = 'titleElement-' + this.key
        titleElement.innerText = this.title;
        titleElement.classList.add('menu-title');
        this.menuContainer.appendChild(titleElement);

        const subtitleElement = document.getElementById('subtitleElement-' + this.key) || document.createElement('h2');
        if (!subtitleElement.id) subtitleElement.id = 'subtitleElement-' + this.key
        subtitleElement.innerText = this.subtitle;
        subtitleElement.classList.add('menu-subtitle');
        this.menuContainer.appendChild(subtitleElement);

        // Lista do menu
        this.menuList = document.getElementById('menuList-' + this.key) || document.createElement('ul');
        if (!this.menuList.id) this.menuList.id = 'menuList-' + this.key
        this.menuList.classList.add('menu-list');
        this.menuList.style.listStyleType = 'none';
        this.menuList.style.padding = '0';
        this.menuList.style.margin = '0';

        this.menuContainer.appendChild(this.menuList);

        // Criação do botão de menu para dispositivos móveis
        this.toggleButton = document.getElementById('toggleButton-' + this.key) || document.createElement('button');
        if (!this.toggleButton.id) this.toggleButton.id = 'toggleButton-' + this.key
        this.toggleButton.innerHTML = '☰';
        this.toggleButton.classList.add('menu-toggle');
        this.menuContainer.appendChild(this.toggleButton);

        // Adiciona o evento de toggle
        this.toggleButton.addEventListener('click', () => {
            this.menuList.classList.toggle('active');
        });

        this.render();
    }

    setActiveMenu(activeIndex) {
        // Remove a classe 'active' de todos os itens
        Array.from(this.menuList.children).forEach((child, index) => {
            child.classList.toggle('menuItemClick', index === activeIndex);
        });
    }

    render() {
        this.menuList.innerHTML = '';

        // Adiciona cada item ao menu
        this.menuItems.forEach((item, index) => {
            const menuItem = item;
            if (menuItem) {
                this.menuList.appendChild(menuItem);
                menuItem.addEventListener('click', () => this.setActiveMenu(index));
                const anchors = menuItem.getElementsByTagName('a');
                Array.from(anchors).forEach(anchor => {
                    //console.log(anchor.href.endsWith(location.pathname), anchor.href, location.pathname)
                    if (anchor.href.endsWith(location.pathname)) { // Verifica se o link corresponde à URL atual
                        menuItem.classList.toggle('menuItemClick', true); // Adiciona a classe ativa
                    } else {
                        menuItem.classList.toggle('menuItemClick', false); // Remove a classe ativa
                    }
                });

            }
        });
        return this.menuContainer
    }

    getID() {
        return this.menuContainer.id
    }
    // Método para adicionar o menu ao body ou a outro container
    appendTo(container) {
        container.appendChild(this.menuContainer);
    }
}

export { Menu };
