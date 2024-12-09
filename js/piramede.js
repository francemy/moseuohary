class Piramide3D {
    constructor({
      baseSize = 100,
      height = 150,
      canvasWidth = 600,
      canvasHeight = 600,
      rotationSpeedX = 0.01,
      rotationSpeedY = 0.01,
      color = "yellow",
      canvasId = null,
    }) {
      if (!canvasId) {
        const componentName = "Piramide3D";
        if (ENVIRONMENT[componentName]) {
          ENVIRONMENT[componentName] += 1;
        } else {
          ENVIRONMENT[componentName] = 1;
        }
        canvasId = ENVIRONMENT[componentName];
      }
  
      this.key = canvasId;
      this.canvas =
        document.getElementById("Piramide3D-" + canvasId) || document.createElement("canvas");
      if (!this.canvas.id) this.canvas.id = "Piramide3D-" + canvasId;
      this.ctx = this.canvas.getContext("2d");
      this.baseSize = baseSize;
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
  
      // Vértices da pirâmide (base quadrada + vértice superior)
      this.vertices = [
        { x: -baseSize, y: -baseSize, z: 0 },
        { x: baseSize, y: -baseSize, z: 0 },
        { x: baseSize, y: baseSize, z: 0 },
        { x: -baseSize, y: baseSize, z: 0 },
        { x: 0, y: 0, z: height }, // Vértice superior
      ];
  
      this.addInteraction();
      this.drawPiramide();
    }
  
    project(x, y, z) {
      const scale = this.projectionDistance / (this.projectionDistance + z);
      const x2d = x * scale + this.centerX;
      const y2d = y * scale + this.centerY;
      return { x: x2d, y: y2d };
    }
  
    drawPiramide() {
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
  
      const faces = [
        [0, 1, 4], [1, 2, 4], [2, 3, 4], [3, 0, 4], // Lados da pirâmide
        [0, 1, 2, 3], // Base
      ];
  
      faces.forEach((face, index) => {
        this.ctx.beginPath();
        face.forEach((vertexIndex, i) => {
          const point = projectedVertices[vertexIndex];
          if (i === 0) this.ctx.moveTo(point.x, point.y);
          else this.ctx.lineTo(point.x, point.y);
        });
        this.ctx.closePath();
        this.ctx.fillStyle = `rgba(255, 255, 0, ${0.5 + index * 0.1})`;
        this.ctx.fill();
        this.ctx.strokeStyle = "black";
        this.ctx.lineWidth = 1;
        this.ctx.stroke();
      });
  
      this.angleX += this.rotationSpeedX;
      this.angleY += this.rotationSpeedY;
  
      requestAnimationFrame(() => this.drawPiramide());
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
  
  export { Piramide3D };
  