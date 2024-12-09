// js/MenuItem.js
import { ENVIRONMENT } from "./config.js";
class MenuItem {
    constructor({ label, link, onClick, icon, key=null }) {
        if(!key)
            {  if(ENVIRONMENT["MenuItem"])
                {
                  ENVIRONMENT["MenuItem"] +=1;
                }
                else
                  ENVIRONMENT["MenuItem"] =1;
                key =  ENVIRONMENT["MenuItem"]
            }
        this.key =  key
        this.label = label;  // Texto do item
        this.link = link;    // Link do item (opcional)
        this.onClick = onClick; // Função a ser chamada ao clicar
        this.icon = icon;    // URL ou ícone para o item
    }

    getID() {
        return this.menuItem.id
      }

    render() {
        const menuItem = document.getElementById('menuItem-'+this.key) || document.createElement('li');
        if(!menuItem.id) menuItem.id ='menuItem-'+this.key
        menuItem.style.display = 'flex';
        menuItem.style.alignItems = 'center';
        menuItem.style.marginBottom = '10px';

        // Se um ícone for fornecido, adiciona o ícone
        if (this.icon) {
            const iconElement = document.getElementById('iconElement-'+this.key) ||  document.createElement('div');
            if(!iconElement.id) iconElement.id ='iconElement-'+this.key
            iconElement.innerHTML = this.icon;
            iconElement.alt = this.label;
            iconElement.style.width = '20px';  // Tamanho do ícone
            iconElement.style.height = '20px';
            iconElement.style.marginRight = '10px';  // Espaço entre o ícone e o texto
            menuItem.appendChild(iconElement);
        }

        // Adiciona o link ou texto normal ao item
        if (this.link) {
            const anchor =document.getElementById('anchor-'+this.key) ||  document.createElement('a');
            if(!anchor.id) anchor.id ='anchor-'+this.key
            anchor.href = this.link;
            anchor.innerText = this.label;
            anchor.addEventListener('click', this.onClick);
            menuItem.appendChild(anchor);
        } else {
            menuItem.innerText = this.label;
            menuItem.addEventListener('click', this.onClick);
        }

        return menuItem;
    }
}

export { MenuItem };
