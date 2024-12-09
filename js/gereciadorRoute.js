class Router {
    constructor() {
        this.routes = {}; // Armazena as rotas
        this.currentRoute = null;
        this.beforeNavigate = null; // Hook para antes de navegar
        this.afterNavigate = null; // Hook para depois de navegar

        // Monitora mudanças no histórico
        window.addEventListener("popstate", () => this.loadRoute(location.pathname));
    }

    // Adiciona uma rota ao gerenciador
    addRoute(path, callback) {
        const paramNames = [];
        const regexPath = path.replace(/:([^/]+)/g, (_, key) => {
            paramNames.push(key);
            return "([^/]+)";
        });
        const regex = new RegExp(`^${regexPath}$`);
        this.routes[path] = { regex, paramNames, callback };
    }

    // Navega para uma nova rota
    navigate(path) {
        if (this.beforeNavigate) this.beforeNavigate(path);

        const routeExists = this.routeExists(path);
        if (routeExists) {
            history.pushState({}, "", path); // Atualiza a URL sem recarregar a página
            this.loadRoute(path);
        } else if (this.routes["*"]) {
            this.routes["*"].callback(); // Rota "catch-all" (404)
        } else {
            console.error(`Rota "${path}" não encontrada.`);
        }

        if (this.afterNavigate) this.afterNavigate(path);
    }

    // Verifica se uma rota existe
    routeExists(path) {
        return Object.values(this.routes).some(({ regex }) => regex.test(path));
    }

    // Carrega a rota e executa o callback associado
    loadRoute(path) {
        for (const route in this.routes) {
            const { regex, paramNames, callback } = this.routes[route];
            const match = path.match(regex);
            if (match) {
                const params = paramNames.reduce((acc, paramName, i) => {
                    acc[paramName] = match[i + 1];
                    return acc;
                }, {});
                callback(params);
                this.currentRoute = path;
                return;
            }
        }

        // Se a rota não existir, redireciona para uma rota padrão ou exibe erro
        if (this.routes["*"]) {
            this.routes["*"].callback(); // Rota "catch-all" (404)
        } else {
            console.error(`Rota "${path}" não está registrada.`);
        }
    }

    // Inicializa a rota atual ao carregar a página
    init() {
        const initialPath = location.pathname;
        if (this.routeExists(initialPath)) {
            this.loadRoute(initialPath);
        } else if (this.routes["*"]) {
            history.replaceState({}, "", "/404"); // Atualiza a URL para a rota 404
            this.routes["*"].callback();
        } else {
            console.error(`Rota inicial "${initialPath}" não encontrada.`);
        }
    }
}

export { Router };
