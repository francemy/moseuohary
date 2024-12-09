import { ENVIRONMENT } from "./config.js";

class Cubo3D {
  constructor({
    cubeSize = 100,
    canvasWidth = 600,
    canvasHeight = 600,
    rotationSpeedX = 0.01,
    rotationSpeedY = 0.01,
    color = "blue",
    canvasId = null,
  }) {
    // Criar ou referenciar um canvas
    if (!canvasId) {
      const componentName = "Cubo3D";
      if (ENVIRONMENT[componentName]) {
        ENVIRONMENT[componentName] += 1;
      } else {
        ENVIRONMENT[componentName] = 1;
      }
      canvasId = ENVIRONMENT[componentName];
    }
    this.key = canvasId;
    this.canvas =
      document.getElementById("Cubo3D-" + canvasId) || document.createElement("canvas");
    if (!this.canvas.id) this.canvas.id = "Cubo3D-" + canvasId;
    this.ctx = this.canvas.getContext("2d");
    this.cubeSize = cubeSize;
    this.angleX = 0;
    this.angleY = 0;
    this.rotationSpeedX = rotationSpeedX;
    this.rotationSpeedY = rotationSpeedY;
    this.centerX = canvasWidth / 2;
    this.centerY = canvasHeight / 2;
    this.color = color;

    this.projectionDistance = 500; // Para ajustar a projeção
    this.canvas.width = canvasWidth;
    this.canvas.height = canvasHeight;

    // Definir os vértices 3D
    this.vertices = [
      { x: -cubeSize, y: -cubeSize, z: -cubeSize },
      { x: cubeSize, y: -cubeSize, z: -cubeSize },
      { x: cubeSize, y: cubeSize, z: -cubeSize },
      { x: -cubeSize, y: cubeSize, z: -cubeSize },
      { x: -cubeSize, y: -cubeSize, z: cubeSize },
      { x: cubeSize, y: -cubeSize, z: cubeSize },
      { x: cubeSize, y: cubeSize, z: cubeSize },
      { x: -cubeSize, y: cubeSize, z: cubeSize },
    ];

    // Adicionar eventos de interação
    this.addInteraction();

    // Iniciar animação
    this.drawCube();
  }

  // Projeção 3D para 2D
  project(x, y, z) {
    const scale = this.projectionDistance / (this.projectionDistance + z);
    const x2d = x * scale + this.centerX;
    const y2d = y * scale + this.centerY;
    return { x: x2d, y: y2d };
  }

  // Função para desenhar o cubo
  drawCube() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Rotaciona os vértices
    const rotatedVertices = this.vertices.map((vertex) => {
      const xRot = vertex.x * Math.cos(this.angleY) - vertex.z * Math.sin(this.angleY);
      const zRot = vertex.x * Math.sin(this.angleY) + vertex.z * Math.cos(this.angleY);
      const yRot = vertex.y * Math.cos(this.angleX) - zRot * Math.sin(this.angleX);
      const zFinal = vertex.y * Math.sin(this.angleX) + zRot * Math.cos(this.angleX);
      return { x: xRot, y: yRot, z: zFinal };
    });

    // Projeta os pontos 3D para 2D
    const projectedVertices = rotatedVertices.map((vertex) =>
      this.project(vertex.x, vertex.y, vertex.z)
    );

    // Define as faces do cubo
    const faces = [
      [0, 1, 2, 3], // Frente
      [4, 5, 6, 7], // Trás
      [0, 1, 5, 4], // Topo
      [2, 3, 7, 6], // Base
      [1, 2, 6, 5], // Lado direito
      [0, 3, 7, 4], // Lado esquerdo
    ];

    // Desenhar faces preenchidas
    faces.forEach((face, index) => {
      this.ctx.beginPath();
      face.forEach((vertexIndex, i) => {
        const point = projectedVertices[vertexIndex];
        if (i === 0) this.ctx.moveTo(point.x, point.y);
        else this.ctx.lineTo(point.x, point.y);
      });
      this.ctx.closePath();
      this.ctx.fillStyle = `rgba(0, 0, 255, ${0.5 + index * 0.1})`;
      this.ctx.fill();
      this.ctx.strokeStyle = "black";
      this.ctx.lineWidth = 1;
      this.ctx.stroke();
    });

    // Incrementa os ângulos para a rotação
    this.angleX += this.rotationSpeedX;
    this.angleY += this.rotationSpeedY;

    // Continua a animação
    requestAnimationFrame(() => this.drawCube());
  }

  // Controle de rotação com o mouse
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

  // Métodos de controle externo
  setRotationSpeed(speedX, speedY) {
    this.rotationSpeedX = speedX;
    this.rotationSpeedY = speedY;
  }

  resetPosition() {
    this.angleX = 0;
    this.angleY = 0;
  }

  render() {
    return this.canvas;
  }
}

export { Cubo3D };
