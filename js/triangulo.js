import { ENVIRONMENT } from "./config.js";

class Triangulo3D {
    constructor({
      canvasId = null,
      triangleSize = 100,
      canvasWidth = 600,
      canvasHeight = 600,
      rotationSpeedX = 0.01,
      rotationSpeedY = 0.01,
      color = "red",
    }) {
      // Criar ou referenciar um canvas
      if (canvasId === null) {
        const componentName = "Triangulo3D";
        if (ENVIRONMENT[componentName]) {
          ENVIRONMENT[componentName] += 1;
        } else {
          ENVIRONMENT[componentName] = 1;
        }
        canvasId = ENVIRONMENT[componentName];
      }
      this.key = canvasId;
      this.canvas = document.getElementById('Triangulo3D-'+ this.key) || document.createElement('canvas');
      if(!this.canvas.id) this.canvas.id = 'Triangulo3D-'+ this.key
      this.ctx = this.canvas.getContext('2d');
      this.triangleSize = triangleSize;
      this.angleX = 0;
      this.angleY = 0;
      this.rotationSpeedX = rotationSpeedX;
      this.rotationSpeedY = rotationSpeedY;
      this.centerX = canvasWidth / 2;
      this.centerY = canvasHeight / 2;
      this.color = color;
  
      // Ajuste o tamanho do canvas de acordo com os parâmetros
      this.canvas.width = canvasWidth;
      this.canvas.height = canvasHeight;
  
      // Definir as coordenadas dos vértices 3D do triângulo
      this.vertices = [
        { x: 0, y: -triangleSize, z: 0 }, // Vértice superior
        { x: -triangleSize, y: triangleSize, z: -triangleSize }, // Vértice inferior esquerdo
        { x: triangleSize, y: triangleSize, z: -triangleSize },  // Vértice inferior direito
      ];
  
      // Inicia a animação
      this.addInteraction() 
      this.drawTriangle();
      
    }
  
    // Função para projetar o ponto 3D para 2D
    project(x, y, z) {
      const scale = 500 / (500 + z); // Fator de perspectiva
      const x2d = x * scale + this.centerX;
      const y2d = y * scale + this.centerY;
      return { x: x2d, y: y2d };
    }
  
    // Função para desenhar o triângulo
    drawTriangle() {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  
      const rotatedVertices = this.vertices.map(vertex => {
        const xRot = vertex.x * Math.cos(this.angleY) - vertex.z * Math.sin(this.angleY);
        const zRot = vertex.x * Math.sin(this.angleY) + vertex.z * Math.cos(this.angleY);
        const yRot = vertex.y * Math.cos(this.angleX) - zRot * Math.sin(this.angleX);
        return { x: xRot, y: yRot, z: zRot };
      });
  
      const projectedVertices = rotatedVertices.map(vertex => this.project(vertex.x, vertex.y, vertex.z));
  
      // Desenhar as arestas do triângulo
      this.ctx.beginPath();
      this.ctx.moveTo(projectedVertices[0].x, projectedVertices[0].y);
      this.ctx.lineTo(projectedVertices[1].x, projectedVertices[1].y);
      this.ctx.lineTo(projectedVertices[2].x, projectedVertices[2].y);
      this.ctx.closePath();
      this.ctx.strokeStyle = this.color;
      this.ctx.lineWidth = 2;
      this.ctx.stroke();
  
      this.angleX += this.rotationSpeedX;
      this.angleY += this.rotationSpeedY;
  
      requestAnimationFrame(() => this.drawTriangle());
    }

    getID()
    {
      return this.canvas.id
    }

    addInteraction() {
      let isDragging = false;
      let lastX, lastY;
  
      this.canvas.addEventListener("mousedown", (e) => {
        isDragging = true;
        lastX = e.clientX;
        lastY = e.clientY;
      });
  
      this.canvas.addEventListener("mousemove", (e) => {
        if (isDragging) {
          const deltaX = e.clientX - lastX;
          const deltaY = e.clientY - lastY;
          this.angleY += deltaX * 0.01;
          this.angleX += deltaY * 0.01;
          lastX = e.clientX;
          lastY = e.clientY;
        }
      });
  
      this.canvas.addEventListener("mouseup", () => {
        isDragging = false;
      });
  
      this.canvas.addEventListener("mouseleave", () => {
        isDragging = false;
      });
    }
  
    // Método para renderizar o canvas
    render() {
      return this.canvas;
    }
  }
  
  export {Triangulo3D}