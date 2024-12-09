import { ButtonComponent } from "./ButtonVarialComponent.js";
import { ENVIRONMENT } from "./config.js";

class CardComponent {
  constructor(title, description, buttonLabel, onClick, mediaComponent = null, key = null) {
    this.title = title;
    this.description = description;
    this.buttonLabel = buttonLabel;
    this.onClick = onClick;
    this.mediaComponent = mediaComponent;

    // Gerar chave única, se não fornecida
    if (!key) {
      const componentName = "CardComponent";
      if (ENVIRONMENT[componentName]) {
        ENVIRONMENT[componentName] += 1;
      } else {
        ENVIRONMENT[componentName] = 1;
      }
      key = ENVIRONMENT[componentName];
    }
    this.key = key;

    // Criar ou reutilizar elemento principal
    const elementId = `CardComponent-${key}`;
    this.card = document.getElementById(elementId) || document.createElement("div");
    if (!this.card.id) this.card.id = elementId;

    this.card.className =
      "flex flex-col border border-gray-200 rounded-lg shadow-lg p-4 max-w-xs w-full hover:shadow-xl transition-shadow";

    this.renderCard();
  }

  renderCard() {
    this.card.innerHTML = ""; // Limpa o conteúdo existente

    // Mídia
    if (this.mediaComponent) {
      const mediaContainer = document.getElementById('mediaContainer-' + this.key) || document.createElement("div");
      if (!mediaContainer.id) mediaContainer.id = 'mediaContainer-' + this.key;
      mediaContainer.className = "aspect-video overflow-hidden rounded-lg mb-4";

      // Adiciona imagem, vídeo ou canvas dinamicamente
      if (
        this.mediaComponent.tagName === "IMG" ||
        this.mediaComponent.tagName === "VIDEO" ||
        this.mediaComponent.tagName === "CANVAS"
      ) {
        this.mediaComponent.className = "object-cover w-full h-full cursor-pointer";
        this.mediaComponent.addEventListener("click", this.onClick);
        mediaContainer.appendChild(this.mediaComponent);
      } else {
        console.error("O `mediaComponent` deve ser um elemento <img>, <video> ou <canvas>.");
      }

      this.card.appendChild(mediaContainer);
    }



    // Título
    const titleElement = document.getElementById('titleElement-' + this.key) || document.createElement("h3");
    if (!titleElement.id) titleElement.id = 'titleElement-' + this.key;
    titleElement.innerText = this.title;
    titleElement.className = "text-lg font-semibold text-gray-800 mb-2";
    this.card.appendChild(titleElement);

    // Descrição
    if (this.description) {
      const descriptionElement = document.getElementById('descriptionElement-' + this.key) || document.createElement("p");
      if (!descriptionElement.id) descriptionElement.id = 'descriptionElement-' + this.key;
      descriptionElement.innerText = this.description;
      descriptionElement.className = "text-sm text-gray-600 mb-4";
      this.card.appendChild(descriptionElement);
    }

    // Botão
    if (this.buttonLabel) {
      const button = new ButtonComponent({
        label: this.buttonLabel,
        className: "px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 cursor-pointer",
        onClick: this.onClick,
      });
      this.card.appendChild(button.render());
    }
  }

  getID() {
    return this.card.id
  }

  render() {
    return this.card;
  }

}

export { CardComponent };
