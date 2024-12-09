function HomePage() {
    const container = document.createElement("div");
    container.className = "flex flex-col items-center justify-center h-screen bg-gradient-to-r from-blue-500 to-purple-600 text-white";

    // Título
    const title = document.createElement("h1");
    title.className = "text-5xl font-bold mb-6";
    title.textContent = "Bem-vindo à Home Page";

    // Descrição
    const description = document.createElement("p");
    description.className = "text-lg mb-8 text-center max-w-md";
    description.textContent = "Explore as funcionalidades deste site. Use o menu acima para navegar para outras páginas.";

    // Botões de navegação
    const buttonsContainer = document.createElement("div");
    buttonsContainer.className = "flex gap-4";

    const routes = [
        { label: "Sobre", path: "/about" },
        { label: "Contato", path: "/contact" },
    ];

    routes.forEach((route) => {
        const button = document.createElement("button");
        button.className =
            "px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg shadow-md hover:bg-blue-600 hover:text-white transition";
        button.textContent = route.label;
        button.addEventListener("click", () => {
            // Navegação utilizando o Router
            const event = new CustomEvent("navigate", { detail: route.path });
            window.dispatchEvent(event);
        });
        buttonsContainer.appendChild(button);
    });

    // Adicionando elementos ao container
    container.appendChild(title);
    container.appendChild(description);
    container.appendChild(buttonsContainer);

    return container;
}

export { HomePage };
