import { ENVIRONMENT, createOrSelectElement } from "./config.js";
import { ButtonComponent } from "./ButtonVarialComponent.js";
import {
  setaDireita,
  setaEsquerda,
  home,
  contact,
  setaCima,
  setaBaixo,
  setaDiagonalEsquerda,
  setaDiagonalDireita,
  about,
  setaPageEsquerda,
  setaPageDireita,
  info,
  galeria,
} from "./IconComponent.js";

class PainelDeControle {
  constructor(component3D) {
    this.initEnvironment();
    this.component3D = component3D;
    this.init();
    this.renderButtons(this.sectionOfButtons);
    this.renderComponent(this.sectionImagem3D);
    this.panel.appendChild(this.sectionImagem3D);
    this.panel.appendChild(this.sectionOfButtons);
  }

  // Inicializa o ambiente
  initEnvironment() {
    if (ENVIRONMENT["PainelDeControle"]) {
      ENVIRONMENT["PainelDeControle"] += 1;
    } else {
      ENVIRONMENT["PainelDeControle"] = 1;
    }
    this.key = ENVIRONMENT["PainelDeControle"];
  }

  setComponent3D(component3D) {
    this.component3D = component3D
    this.renderComponent(this.sectionImagem3D);
  }

  // Valida e prepara o componente 3D
  validateComponent(component) {
    if (component && ["IMG", "VIDEO", "CANVAS"].includes(component.tagName)) {
      if (!component.rotax) component.rotax = 0;
      if (!component.rotay) component.rotay = 0;
      return component;
    }
    else {
      const comp = component.render()
      if (comp && ["IMG", "VIDEO", "CANVAS"].includes(comp.tagName)) {
        if (!comp.rotax) comp.rotax = 0;
        if (!comp.rotay) comp.rotay = 0;
        return comp;
      }
    }

    console.error("O `component3D` deve ser um elemento <img>, <video> ou <canvas>.");
    return null;
  }

  // Configuração inicial do painel
  init() {
    this.panel = this.createOrSelectElement(
      `PainelDeControle-${this.key}`,
      "relative flex flex-row gap-2 relative w-full h-full p-2 border border-3"
    );

    this.sectionImagem3D = this.createOrSelectElement(
      `sectionImagem3D-${this.key}`,
      "relative flex justify-center items-center aspect-video overflow-hidden rounded-lg mb-4 w-full h-60 p-1"
    );

    this.sectionOfButtons = this.createOrSelectElement(
      `sectionOfButtonsControle-${this.key}`,
      "basis-1/4 grid grid-cols-2 gap-2 h-full bg-gray-200 p-2 border-l border-gray-300"
    );

  }

  // Renderiza o componente 3D ou mídia
  renderComponent(section) {
   
    section.innerHTML =''
    if (this.component3D) {
      const figure3D = this.validateComponent(this.component3D);
      figure3D.className = "object-contain w-[100dvw] h-[100dvh] absolute cursor-pointer z-40";
      figure3D.removeEventListener("click", this.handleMediaClick); // Remove listeners antigos
      figure3D.addEventListener("click", this.handleMediaClick);
  
      // Garante que a mídia seja adicionada diretamente
      section.appendChild(figure3D);
     // section.appendChild(this.component3D);
    }
  }

  // Configuração e renderização dos botões
  renderButtons(section) {
    const buttonsConfig = this.getButtonsConfig();
    buttonsConfig.forEach(({ icon, action, key }, index) => {
      const buttonId = `${key}-${index}`;
      const button = document.getElementById(buttonId) || new ButtonComponent({
        label: "",
        styleConfig: { padding: "5px 5px" },
        onClick: action,
        icon: icon,
      });
      if (!button.id) button.id = buttonId;
      section.appendChild(button.render());
    });
  }

  // Configuração dos botões
  getButtonsConfig() {
    return [
      { icon: setaCima(), action: () => this.adjustRotation("up"), key: "buttonsConfig" },
      { icon: setaBaixo(), action: () => this.adjustRotation("down"), key: "buttonsConfig" },
      { icon: setaDireita(), action: () => this.adjustRotation("right"), key: "buttonsConfig" },
      { icon: setaEsquerda(), action: () => this.adjustRotation("left"), key: "buttonsConfig" },
      { icon: setaDiagonalDireita(), action: () => this.adjustRotation("diagonalDr"), key: "buttonsConfig" },
      { icon: setaDiagonalEsquerda(), action: () => this.adjustRotation("diagonalEs"), key: "buttonsConfig" },
      { icon: home(), action: () => this.resetView(), key: "buttonsConfig" },
      { icon: galeria(), action: () => this.toggleGallery(), key: "buttonsConfig" },
      { icon: contact(), action: () => this.showContactInfo(), key: "buttonsConfig" },
      { icon: about(), action: () => this.showAboutInfo(), key: "buttonsConfig" },
      { icon: setaPageDireita(), action: () => this.changePage("next"), key: "buttonsConfig" },
      { icon: setaPageEsquerda(), action: () => this.changePage("previous"), key: "buttonsConfig" },
      { icon: info(), action: () => this.showInfo(), key: "buttonsConfig" },
    ];
  }

  // Ajusta a rotação
  adjustRotation(direction) {
    const speed = 0.05;
    if (!this.component3D) return;

    switch (direction) {
      case "up": this.component3D.angleX -= speed; break;
      case "down": this.component3D.angleX += speed; break;
      case "right": this.component3D.angleY += speed; break;
      case "left": this.component3D.angleY -= speed; break;
      case "diagonalDr":
        this.component3D.angleX += speed;
        this.component3D.angleY += speed;
        break;
      case "diagonalEs":
        this.component3D.angleX -= speed;
        this.component3D.angleY -= speed;
        break;
    }
    console.log(`Rotação ajustada: rotax=${this.component3D.angleX}, rotay=${this.component3D.angleY}`);
  }

  // Cria ou seleciona um elemento do DOM
  createOrSelectElement(id, className) {
    return createOrSelectElement(id, className)
  }

  render() {
    return this.panel;
  }
}

export { PainelDeControle };
