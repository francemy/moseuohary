# moseuohary
O Museu Ohary é um espaço dedicado à arte moderna e contemporânea, onde você pode explorar peças de arte em 3D criadas por artistas renomados. Nossa missão é promover a educação e o acesso à arte de forma inovadora, utilizando tecnologias como a impressão 3D e o design interativo.

# **Museu Ohary - Aplicação SPA**

Este é um projeto de uma aplicação **Single Page Application (SPA)** para o **Museu Ohary**, onde os visitantes podem explorar peças de arte em 3D. A aplicação inclui uma navegação dinâmica entre diferentes páginas, sem recarregar o navegador, usando JavaScript e um sistema de roteamento personalizado.

## **Funcionalidades**

- **Navegação Dinâmica**: Navegue entre páginas como Home, Exposição, Sobre e Contato sem recarregar a página.
- **Gerenciador de Rotas**: Sistema de rotas customizado para SPA com suporte a links diretos.
- **Design Responsivo**: Interface ajustável para dispositivos móveis e desktop.
- **Componentização**: Uso de componentes modulares para construção de páginas e menus.
- **Gradiente Dinâmico**: Design visual com gradientes animados e estilizados.

## **Tecnologias Utilizadas**

- **HTML5**: Estrutura base do projeto.
- **CSS3**: Estilização visual com classes personalizadas e gradientes.
- **JavaScript (ES6+)**: Lógica da aplicação e gerenciamento de rotas.
- **Node.js, apache, etc..** (para servir o projeto localmente durante o desenvolvimento).

## **Estrutura do Projeto**

```
museu-ohary/
├── index.html            # Página inicial
├── js/
│   ├── config.js         # Configurações gerais do projeto
│   ├── gerenciadorRoute.js # Gerenciador de rotas
│   ├── MenuComponent.js  # Componente de menu
│   ├── MenuItemComponent.js # Itens do menu
│   ├── home.js           # Página inicial
│   ├── AboutPage.js      # Página sobre
│   ├── ContactPage.js    # Página de contato
│   ├── Exposicao.js      # Página de exposição
│   ├── footer.js         # Componente do rodapé
├── css/
│   ├── styles.css        # Estilos globais
└── README.md             # Documentação do projeto
```

## **Como Executar o Projeto**

1. **Clone o repositório:**
   ```bash
   git clone [https://github.com/usuario/museu-ohary.git](https://github.com/francemy/moseuohary.git)
   cd museu-ohary
   ```

2. **Instale um servidor local (opcional):**
   Use um servidor como o `live-server` ou `http-server`:
   ```bash
   npm install -g live-server
   live-server
   ```

3. **Acesse no navegador:**
   Abra o navegador e acesse `http://localhost:8080`.

## **Gerenciador de Rotas**

O sistema de roteamento permite que a aplicação funcione como uma SPA. Cada página é carregada dinamicamente sem recarregar o navegador.

- **Arquitetura:**
  - `Router.js` é responsável por gerenciar as rotas, atualizando a URL e carregando os componentes correspondentes.
  - Eventos como `popstate` e `click` são usados para interceptar mudanças de URL e navegar para a rota apropriada.

- **Rotas Disponíveis:**
  - `/`: Página inicial (Home)
  - `/exposicao`: Página de exposição
  - `/about`: Página sobre
  - `/contact`: Página de contato

## **Estilização do Menu**

- O menu é dinâmico e responsivo.
- Ao clicar em um item, ele muda de estilo para indicar o item selecionado.
- Cada página carrega um gradiente de fundo exclusivo para melhorar a experiência visual.

## **Contribuição**

Contribuições são bem-vindas! Siga os passos abaixo:

1. Faça um fork do repositório.
2. Crie um branch para sua funcionalidade:
   ```bash
   git checkout -b feature/nova-funcionalidade
   ```
3. Commit suas alterações:
   ```bash
   git commit -m "Adiciona nova funcionalidade"
   ```
4. Envie as mudanças:
   ```bash
   git push origin feature/nova-funcionalidade
   ```
5. Abra um Pull Request no repositório principal.

## **Licença**

Este projeto está sob  Apache License  Version 2.0, January 2004 http://www.apache.org/licenses/

## **Autor**

- **Nome:** Francemy Eduardo Sebastião
- **Contato:** [seuemail@exemplo.com](mailto:seuemail@exemplo.com)
- **GitHub:** [github.com/seuusuario](https://github.com/seuusuario)
