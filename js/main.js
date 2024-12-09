 // Roteador
import { about, contact, home, galeria } from "./IconComponent.js"; // Ícones do menu
import { Menu } from "./MenuComponent.js"; // Menu principal
import { MenuItem } from "./MenuItemComponent.js"; // Itens do menu
import { ContactPage } from "./ContactPage.js"; // Página de Contato
import { ExposicaoPage } from "./Exposicao.js"; // Página de Exposição
import { HomePage } from "./home.js"; // Página Inicial
import { Footer } from "./footer.js"; // Rodapé
import { createOrSelectElement } from "./config.js"; // Função utilitária
import { AboutPage } from "./AboutPage.js"; // Página Sobre
import { Router } from "./gereciadorRoute.js";

// Instância do roteador
const router = new Router();

// Gerenciar estado do menu selecionado
let itemMenuSelected = 1;

function menuSelectd(itemMenu) {
    itemMenuSelected = itemMenu;
}


function redirectTo(path) {
    // Verifica se a URL já está configurada
    if (window.location.pathname !== path) {
        history.pushState({}, '', path);
        handleRouteChange(path); // Função que carrega o conteúdo da rota
    }
}

function handleRouteChange(path) {
    switch (path) {
        case '/home':
            console.log('Redirecionado para Home');
            // Carregue o conteúdo da Home
            break;
        case '/about':
            console.log('Redirecionado para About');
            // Carregue o conteúdo da About
            break;
        default:
            console.log('Rota não encontrada, redirecionando para Home');
            redirectTo('/home');
    }
}


// Configuração dos itens do menu
const menuItems = [
    { label: "Home", link: "/", icon: home(), onClick: () => { menuSelectd(1); router.navigate("/"); }, key: "item1" },
    { label: "Exposição", link: "/exposicao", icon: galeria(), onClick: () => { menuSelectd(2); router.navigate("/exposicao"); }, key: "item2" },
    { label: "Sobre", link: "/about", icon: about(), onClick: () => { menuSelectd(3); router.navigate("/about"); }, key: "item3" },
    { label: "Contato", link: "/contact", icon: contact(), onClick: () => { menuSelectd(4); router.navigate("/contact"); }, key: "item4" },
].map(item => new MenuItem(item).render());

// Configuração do menu
const menu = new Menu(menuItems, "Museu Ohary", "Explore peças de arte em 3D");
menu.appendTo(document.body);

// Container principal para páginas
const mainContainer = createOrSelectElement({
    id: "main-container",
    className: "flex relative py-6 px-8 bg-gradient-to-br from-green-300 to-blue-500 min-h-screen",
    type: "div",
});
document.body.appendChild(mainContainer);

// Função para limpar o container principal
function clearMainContainer() {
    while (mainContainer.firstChild) {
        mainContainer.removeChild(mainContainer.firstChild);
    }
    mainContainer.className = ' bg-gradient-to-br from-green-300 to-blue-500 min-h-screen'
}

// Rotas e navegação
router.addRoute("/", () => {
    clearMainContainer();
    mainContainer.appendChild(HomePage());
});
router.addRoute("/exposicao", () => {
    clearMainContainer();
    mainContainer.appendChild(ExposicaoPage());
});
router.addRoute("/about", () => {
    clearMainContainer();
    mainContainer.appendChild(AboutPage());
});
router.addRoute("/contact", () => {
    clearMainContainer();
    mainContainer.appendChild(ContactPage());
});

// Inicializar o roteador
router.init();

// Adiciona o rodapé ao final da página
const footer = new Footer();
document.body.appendChild(footer.render());

// Gerencia cliques em links para evitar recarregamento
window.addEventListener("click", (event) => {
    const target = event.target;

    // Verifica se é um link interno
    if (target.tagName === "A" && target.href) {
        const targetPath = new URL(target.href).pathname;

        // Impede comportamento padrão e valida rota
        if (router.routes[targetPath]) {
            event.preventDefault();
            router.navigate(targetPath);
        }
    }
});

// Observa mudanças no histórico para ajuste de rotas
window.addEventListener("popstate", () => {
    router.loadRoute(location.pathname);
});

window.addEventListener("navigate", (e) => {
    router.navigate(e.detail);
});


redirectTo(location.pathname)