import { CardComponent } from "./CardComponent.js";
import { Cavalo3D } from "./Cavalo3D.js";
import { Cilindro3D } from "./Cilindro.js";
import { Cone3D } from "./cone.js";
import { createOrSelectElement } from "./config.js";
import { Cubo3D } from "./cubo.js";
import { Esfera3D } from "./esfera.js";
import { Galeria } from "./GaleryComponent.js";
import { PainelDeControle } from "./PainelDeControle.js";
import { Peao3D } from "./peao3D.js";
import { Piramide3D } from "./piramede.js";
import { Triangulo3D } from "./triangulo.js";

// Função para criar a página
function ExposicaoPage() {
    // Configuração do painel de controle


    // Configuração do container principal
    const containerView = createOrSelectElement({
        id: 'containerView',
        className: 'relative w-full flex h-[60vh] bg-gray-200 p-5',
        type: 'section'
    });

    // Criação e adição do painel de controle
    const painelControle = new PainelDeControle();
    containerView.appendChild(painelControle.render());
    // Função para atualizar a peça exibida no painel de controle
    function setPeca(changePeca) {
        changePeca.rotationSpeedX = 0;
        changePeca.rotationSpeedY = 0;
        painelControle.setComponent3D(changePeca);
    }

    // Dados para os cards
    const cardData = [
        { title: 'Arte 1', description: 'Descrição da arte 1', type: 'triangle', size: 30 },
        { title: 'Arte 2', description: 'Descrição da arte 2', type: 'cone', size: 40 },
        { title: 'Arte 3', description: 'Descrição da arte 3', type: 'piramide', size: 50 },
        { title: 'Arte 4', description: 'Descrição da arte 4', type: 'cube', size: 30 },
        { title: 'Arte 5', description: 'Descrição da arte 5', type: 'cilindro', size: 60 },
        { title: 'Arte 6', description: 'Descrição da arte 6', type: 'esfera', size: 40 },
        { title: 'Arte 10', description: 'Descrição da arte 10', type: 'cavalo', size: 35 },
        { title: 'Arte 7', description: 'Descrição da arte 7', type: 'Peao3D', size: 30 },
        { title: 'Arte 8', description: 'Descrição da arte 8', type: 'triangle', size: 45 },
        { title: 'Arte 9', description: 'Descrição da arte 9', type: 'cube', size: 50 },
        { title: 'Arte 10', description: 'Descrição da arte 10', type: 'cilindro', size: 35 },
        { title: 'Arte 10', description: 'Descrição da arte 10', type: 'cavalo', size: 35 },
        { title: 'Arte 7', description: 'Descrição da arte 7', type: 'piramide', size: 30 },
        { title: 'Arte 8', description: 'Descrição da arte 8', type: 'triangle', size: 45 },
        { title: 'Arte 9', description: 'Descrição da arte 9', type: 'cone', size: 50 },
        { title: 'Arte 10', description: 'Descrição da arte 10', type: 'cilindro', size: 35 },
        { title: 'Arte 10', description: 'Descrição da arte 10', type: 'esfera', size: 35 },
        { title: 'Arte 10', description: 'Descrição da arte 10', type: 'Peao3D', size: 35 },
        { title: 'Arte 10', description: 'Descrição da arte 10', type: 'cavalo', size: 35 },
    ];

    
    // Criação dinâmica dos cards com reutilização de configurações
    const cards = cardData.map((data, index) => {
        const model = createFigure(data.type, data.size, `model-${ index }`).render();
        const view = createFigure(data.type, data.size + 10, `view-${index}`);
        return new CardComponent(
            data.title,
            data.description,
            'Ver mais',
            () => setPeca(view),
            model
        );
    });

     // Configuração do painel de controle
     const config = {
        canvasWidth: 60,
        canvasHeight: 60,
        rotationSpeedX: 0.02,
        rotationSpeedY: 0.02,
        color: 'green', // Cor padrão para as figuras
    };

    // Função para criar instâncias de figuras 3D
    function createFigure(type, size, canvasId) {
        const commonConfig = { cubeSize: size, triangleSize: size, canvasId };
        if (type === 'triangle') {
            return new Triangulo3D(commonConfig);
        } else if (type === 'cube') {
            return new Cubo3D(commonConfig);
        }
        else if(type === 'cilindro'){
            return new Cilindro3D(commonConfig);
        }

        else if(type === 'piramide'){
            return new Piramide3D(commonConfig);
        }
        else if(type === 'cone'){
            return new Cone3D(commonConfig);

        }
        else if(type === 'esfera'){
            return new Esfera3D(commonConfig);

        }
        else if(type === 'Peao3D'){
            return new Peao3D(commonConfig);

        }
        else if(type === 'cavalo'){
            return new Cavalo3D(commonConfig);

        }
        throw new Error(`Tipo desconhecido: ${type}`);
    }


    // Adicionando a galeria ao DOM
    const galeriaContainer = new Galeria(cards);
    containerView.appendChild(galeriaContainer.render())
    return containerView;
}

export { ExposicaoPage };
