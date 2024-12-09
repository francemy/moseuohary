class Peao3D {
    constructor({
      baseRadius = 30,
      height = 100,
      canvasWidth = 600,
      canvasHeight = 600,
      rotationSpeedX = 0.01,
      rotationSpeedY = 0.01,
      color = "black",
      canvasId = null,
    }) {
      if (!canvasId) {
        const componentName = "Peao3D";
        if (ENVIRONMENT[componentName]) {
          ENVIRONMENT[componentName] += 1;
        } else {
          ENVIRONMENT[componentName] = 1;
        }
        canvasId = ENVIRONMENT[componentName];
      }
  
      this.key = canvasId;
      this.canvas =
        document.getElementById("Peao3D-" + canvasId) || document.createElement("canvas");
      if (!this.canvas.id) this.canvas.id = "Peao3D-" + canvasId;
      this.ctx = this.canvas.getContext("2d");
      this.baseRadius = baseRadius;
      this.height = height;
      this.angleX = 0;
      this.angleY = 0;
      this.rotationSpeedX = rotationSpeedX;
      this.rotationSpeedY = rotationSpeedY;
      this.centerX = canvasWidth / 2;
      this.centerY = canvasHeight / 2;
      this.color = color;
  
      this.projectionDistance = 500;
      this.canvas.width = canvasWidth;
      this.canvas.height = canvasHeight;
  
      this.vertices = this.generatePeaoVertices();
      this.addInteraction();
      this.drawPeao();
    }
  
    // Gera os vértices do peão (base cilíndrica e corpo)
    generatePeaoVertices() {
      const vertices = [];
      // Gerar vértices para a base
      const baseHeight = 10;
      const numSides = 16; // Número de lados da base cilíndrica
      for (let i = 0; i < numSides; i++) {
        const angle = (i * 2 * Math.PI) / numSides;
        const x = this.baseRadius * Math.cos(angle);
        const y = this.baseRadius * Math.sin(angle);
        vertices.push({ x, y, z: -baseHeight }); // Base
      }
  
      // Vértices para a parte superior do peão
      vertices.push({ x: 0, y: 0, z: this.height }); // Topo
  
      return vertices;
    }
  
    // Projeção 3D para 2D
    project(x, y, z) {
      const scale = this.projectionDistance / (this.projectionDistance + z);
      const x2d = x * scale + this.centerX;
      const y2d = y * scale + this.centerY;
      return { x: x2d, y: y2d };
    }
  
    // Função para desenhar o peão
    drawPeao() {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  
      const rotatedVertices = this.vertices.map((vertex) => {
        const xRot = vertex.x * Math.cos(this.angleY) - vertex.z * Math.sin(this.angleY);
        const zRot = vertex.x * Math.sin(this.angleY) + vertex.z * Math.cos(this.angleY);
        const yRot = vertex.y * Math.cos(this.angleX) - zRot * Math.sin(this.angleX);
        const zFinal = vertex.y * Math.sin(this.angleX) + zRot * Math.cos(this.angleX);
        return { x: xRot, y: yRot, z: zFinal };
      });
  
      const projectedVertices = rotatedVertices.map((vertex) =>
        this.project(vertex.x, vertex.y, vertex.z)
      );
  
      // Desenhar a base (cilindro)
      for (let i = 0; i < 16; i++) {
        const p1 = projectedVertices[i];
        const p2 = projectedVertices[(i + 1) % 16];
        this.ctx.beginPath();
        this.ctx.moveTo(p1.x, p1.y);
        this.ctx.lineTo(p2.x, p2.y);
        this.ctx.closePath();
        this.ctx.strokeStyle = this.color;
        this.ctx.stroke();
      }
  
      // Desenhar a parte superior (corpo do peão)
      const topVertex = projectedVertices[16]; // Vértice superior
      for (let i = 0; i < 16; i++) {
        const p1 = projectedVertices[i];
        this.ctx.beginPath();
        this.ctx.moveTo(p1.x, p1.y);
        this.ctx.lineTo(topVertex.x, topVertex.y);
        this.ctx.closePath();
        this.ctx.strokeStyle = this.color;
        this.ctx.stroke();
      }
  
      this.angleX += this.rotationSpeedX;
      this.angleY += this.rotationSpeedY;
  
      requestAnimationFrame(() => this.drawPeao());
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
  
    render() {
      return this.canvas;
    }
  }
  
  export { Peao3D };
  