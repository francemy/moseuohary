class Esfera3D {
    constructor({
      radius = 100,
      canvasWidth = 600,
      canvasHeight = 600,
      rotationSpeedX = 0.01,
      rotationSpeedY = 0.01,
      color = "purple",
      canvasId = null,
    }) {
      if (!canvasId) {
        const componentName = "Esfera3D";
        if (ENVIRONMENT[componentName]) {
          ENVIRONMENT[componentName] += 1;
        } else {
          ENVIRONMENT[componentName] = 1;
        }
        canvasId = ENVIRONMENT[componentName];
      }
  
      this.key = canvasId;
      this.canvas =
        document.getElementById("Esfera3D-" + canvasId) || document.createElement("canvas");
      if (!this.canvas.id) this.canvas.id = "Esfera3D-" + canvasId;
      this.ctx = this.canvas.getContext("2d");
      this.radius = radius;
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
  
      // Gerando pontos da esfera
      const segments = 30;
      const rings = 15;
      this.vertices = [];
      for (let lat = 0; lat <= rings; lat++) {
        const theta = (lat * Math.PI) / rings;
        const sinTheta = Math.sin(theta);
        const cosTheta = Math.cos(theta);
        for (let lon = 0; lon <= segments; lon++) {
          const phi = (lon * 2 * Math.PI) / segments;
          const sinPhi = Math.sin(phi);
          const cosPhi = Math.cos(phi);
  
          const x = this.radius * sinTheta * cosPhi;
          const y = this.radius * sinTheta * sinPhi;
          const z = this.radius * cosTheta;
  
          this.vertices.push({ x, y, z });
        }
      }
  
      this.addInteraction();
      this.drawEsfera();
    }
  
    project(x, y, z) {
      const scale = this.projectionDistance / (this.projectionDistance + z);
      const x2d = x * scale + this.centerX;
      const y2d = y * scale + this.centerY;
      return { x: x2d, y: y2d };
    }
  
    drawEsfera() {
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
  
      // Desenhar as linhas conectando os pontos da esfera
      for (let lat = 0; lat < 15; lat++) {
        for (let lon = 0; lon < 30; lon++) {
          const i = lat * (30 + 1) + lon;
          const nextLon = (lon + 1) % 30;
          const nextLat = (lat + 1) % 15;
  
          // Conectar as linhas
          this.ctx.beginPath();
          this.ctx.moveTo(projectedVertices[i].x, projectedVertices[i].y);
          this.ctx.lineTo(projectedVertices[i + 1].x, projectedVertices[i + 1].y);
          this.ctx.lineTo(projectedVertices[i + (30 + 1)].x, projectedVertices[i + (30 + 1)].y);
          this.ctx.closePath();
          this.ctx.strokeStyle = "purple";
          this.ctx.stroke();
        }
      }
  
      this.angleX += this.rotationSpeedX;
      this.angleY += this.rotationSpeedY;
  
      requestAnimationFrame(() => this.drawEsfera());
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
  
  export { Esfera3D };
  