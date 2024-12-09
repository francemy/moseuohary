import { ENVIRONMENT } from "./config.js";

class ButtonComponent {
  constructor({
    label = 'Button',
    styleConfig = {},
    className = '',
    onClick = () => { },
    icon = null
  }) {
    if (ENVIRONMENT["ButtonComponent"]) {
      ENVIRONMENT["ButtonComponent"] += 1;
    }
    else
      ENVIRONMENT["ButtonComponent"] = 1;
    this.key = ENVIRONMENT["ButtonComponent"]
    this.button = document.getElementById('ButtonComponent-' + this.key) || document.createElement('button');
    if (!this.button.id) this.button.id = 'ButtonComponent-' + this.key
    this.button.innerText = label;
    this.icon = icon

    // Estilo padrão responsivo
    const defaultStyle = {
      padding: '10px 20px',
      fontSize: '16px',
      backgroundColor: '#007bff',
      color: '#fff',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      transition: 'background-color 0.3s, transform 0.2s',
      maxWidth: '100%',
    };

    // Combina os estilos padrão e fornecidos
    const combinedStyle = Object.assign({}, defaultStyle, styleConfig);

    // Aplica os estilos inline


    // Adiciona a classe personalizada, se fornecida
    if (className) {

      this.button.className = className;
    }
    else {
      Object.keys(combinedStyle).forEach((key) => {
        this.button.style[key] = combinedStyle[key];
      });
      this.button.classList.add('responsive-button');

    }

    // Adiciona classe padrão para estilos responsivos


    // Configura o evento de clique
    this.button.addEventListener('click', onClick);
  }

  addIcon(icon = null) {
    if (icon)
      this.icon = icon;
    if (this.icon) {
      if (this.icon instanceof Node) {
        this.button.appendChild(this.icon)
      }
      else {
        // console.log(this.icon)
        const iconElement = document.getElementById('iconElement-' + this.key) || document.createElement('div')
        if (!iconElement.id) iconElement.id = 'iconElement-' + this.key
        iconElement.innerHTML = ''
        iconElement.alt = this.label;
        iconElement.style.width = '2rem';  // Tamanho do ícone
        iconElement.style.height = '2rem';
        iconElement.innerHTML = this.icon
        this.button.appendChild(iconElement)
      }

    }

  }
  getID() {
    return this.button.id
  }

  // Método para renderizar o botão
  render() {
    this.addIcon()
    return this.button;
  }
}

export { ButtonComponent };
