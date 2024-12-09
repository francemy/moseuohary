class Cavalo3D {
    constructor({
      baseRadius = 30,
      neckHeight = 60,
      headHeight = 40,
      canvasWidth = 600,
      canvasHeight = 600,
      rotationSpeedX = 0.01,
      rotationSpeedY = 0.01,
      color = "black",
      canvasId = null,
    }) {
      if (!canvasId) {
        const componentName = "Cavalo3D";
        if (ENVIRONMENT[componentName]) {
          ENVIRONMENT[componentName] += 1;
        } else {
          ENVIRONMENT[componentName] = 1;
        }
        canvasId = ENVIRONMENT[componentName];
      }
  
      this.key = canvasId;
      this.canvas =
        document.getElementById("Cavalo3D-" + canvasId) || document.createElement("canvas");
      if (!this.canvas.id) this.canvas.id = "Cavalo3D-" + canvasId;
      this.ctx = this.canvas.getContext("2d");
      this.baseRadius = baseRadius;
      this.neckHeight = neckHeight;
      this.headHeight = headHeight;
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
  
      this.vertices = this.generateCavaloVertices();
      this.addInteraction();
      this.drawCavalo();
    }
  
    // Gera os vértices do cavalo
    generateCavaloVertices() {
      const vertices = [];
      const baseHeight = 10;
      const numSides = 16;
  
      // Gerar a base cilíndrica
      for (let i = 0; i < numSides; i++) {
        const angle = (i * 2 * Math.PI) / numSides;
        const x = this.baseRadius * Math.cos(angle);
        const y = this.baseRadius * Math.sin(angle);
        vertices.push({ x, y, z: -baseHeight }); // Base inferior
      }
  
      // Adicionar vértices para o pescoço (cilindro vertical)
      for (let i = 0; i < numSides; i++) {
        const angle = (i * 2 * Math.PI) / numSides;
        const x = (this.baseRadius / 2) * Math.cos(angle);
        const y = (this.baseRadius / 2) * Math.sin(angle);
        vertices.push({ x, y, z: this.neckHeight }); // Pescoço
      }
  
      // Adicionar vértices para a cabeça (cubo simplificado)
      const headBaseZ = this.neckHeight;
      const headTopZ = this.neckHeight + this.headHeight;
      const headSize = this.baseRadius / 1.5;
  
      vertices.push({ x: -headSize, y: -headSize, z: headBaseZ }); // Base da cabeça (cubo)
      vertices.push({ x: headSize, y: -headSize, z: headBaseZ });
      vertices.push({ x: headSize, y: headSize, z: headBaseZ });
      vertices.push({ x: -headSize, y: headSize, z: headBaseZ });
  
      vertices.push({ x: -headSize, y: -headSize, z: headTopZ }); // Topo da cabeça
      vertices.push({ x: headSize, y: -headSize, z: headTopZ });
      vertices.push({ x: headSize, y: headSize, z: headTopZ });
      vertices.push({ x: -headSize, y: headSize, z: headTopZ });
  
      return vertices;
    }
  
    // Projeção 3D para 2D
    project(x, y, z) {
      const scale = this.projectionDistance / (this.projectionDistance + z);
      const x2d = x * scale + this.centerX;
      const y2d = y * scale + this.centerY;
      return { x: x2d, y: y2d };
    }
  
    // Função para desenhar o cavalo
    drawCavalo() {
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
  
      // Desenhar a base
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
  
      // Desenhar o pescoço
      for (let i = 16; i < 32; i++) {
        const p1 = projectedVertices[i];
        const p2 = projectedVertices[(i + 1) % 16 + 16];
        this.ctx.beginPath();
        this.ctx.moveTo(p1.x, p1.y);
        this.ctx.lineTo(p2.x, p2.y);
        this.ctx.closePath();
        this.ctx.strokeStyle = this.color;
        this.ctx.stroke();
      }
  
      // Desenhar a cabeça (cubo simplificado)
      for (let i = 32; i < 40; i++) {
        const p1 = projectedVertices[i];
        const p2 = projectedVertices[(i + 1) % 8 + 32];
        this.ctx.beginPath();
        this.ctx.moveTo(p1.x, p1.y);
        this.ctx.lineTo(p2.x, p2.y);
        this.ctx.closePath();
        this.ctx.strokeStyle = this.color;
        this.ctx.stroke();
      }
  
      this.angleX += this.rotationSpeedX;
      this.angleY += this.rotationSpeedY;
  
      requestAnimationFrame(() => this.drawCavalo());
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
  
  export { Cavalo3D };
  