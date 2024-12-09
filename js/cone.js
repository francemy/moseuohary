class Cone3D {
    constructor({
      radius = 100,
      height = 150,
      canvasWidth = 600,
      canvasHeight = 600,
      rotationSpeedX = 0.01,
      rotationSpeedY = 0.01,
      color = "red",
      canvasId = null,
    }) {
      if (!canvasId) {
        const componentName = "Cone3D";
        if (ENVIRONMENT[componentName]) {
          ENVIRONMENT[componentName] += 1;
        } else {
          ENVIRONMENT[componentName] = 1;
        }
        canvasId = ENVIRONMENT[componentName];
      }
  
      this.key = canvasId;
      this.canvas =
        document.getElementById("Cone3D-" + canvasId) || document.createElement("canvas");
      if (!this.canvas.id) this.canvas.id = "Cone3D-" + canvasId;
      this.ctx = this.canvas.getContext("2d");
      this.radius = radius;
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
  
      // Vértices do cone: base circular e vértice superior
      this.vertices = [];
      const segments = 30; // Número de segmentos da base
      for (let i = 0; i < segments; i++) {
        const angle = (i * 2 * Math.PI) / segments;
        this.vertices.push({
          x: Math.cos(angle) * radius,
          y: Math.sin(angle) * radius,
          z: 0,
        });
      }
      this.vertices.push({ x: 0, y: 0, z: height }); // Vértice superior
  
      this.addInteraction();
      this.drawCone();
    }
  
    project(x, y, z) {
      const scale = this.projectionDistance / (this.projectionDistance + z);
      const x2d = x * scale + this.centerX;
      const y2d = y * scale + this.centerY;
      return { x: x2d, y: y2d };
    }
  
    drawCone() {
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
  
      const baseVertices = projectedVertices.slice(0, -1); // Vértices da base
      const apexVertex = projectedVertices[projectedVertices.length - 1]; // Vértice superior
  
      // Desenhar a base circular
      this.ctx.beginPath();
      baseVertices.forEach((point, index) => {
        if (index === 0) this.ctx.moveTo(point.x, point.y);
        else this.ctx.lineTo(point.x, point.y);
      });
      this.ctx.closePath();
      this.ctx.fillStyle = `rgba(255, 0, 0, 0.7)`;
      this.ctx.fill();
      this.ctx.strokeStyle = "black";
      this.ctx.lineWidth = 1;
      this.ctx.stroke();
  
      // Desenhar as faces do cone
      baseVertices.forEach((point) => {
        this.ctx.beginPath();
        this.ctx.moveTo(point.x, point.y);
        this.ctx.lineTo(apexVertex.x, apexVertex.y);
        this.ctx.closePath();
        this.ctx.fillStyle = `rgba(255, 0, 0, 0.5)`;
        this.ctx.fill();
        this.ctx.strokeStyle = "black";
        this.ctx.lineWidth = 1;
        this.ctx.stroke();
      });
  
      this.angleX += this.rotationSpeedX;
      this.angleY += this.rotationSpeedY;
  
      requestAnimationFrame(() => this.drawCone());
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
  
  export { Cone3D };
  