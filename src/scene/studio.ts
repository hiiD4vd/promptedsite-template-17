import * as THREE from 'three';
  // Create custom Studio HDR lighting environment for metals and diamonds
export const createStudioEnvironment = (renderer: THREE.WebGLRenderer) => {
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    pmremGenerator.compileEquirectangularShader();

    const envScene = new THREE.Scene();
    envScene.background = new THREE.Color(0x060607);

    const addStudioPanel = (
      w: number,
      h: number,
      intensity: number,
      pos: [number, number, number],
      rot: [number, number, number],
      hexColor: number = 0xffffff
    ) => {
      const geom = new THREE.PlaneGeometry(w, h);
      const mat = new THREE.MeshBasicMaterial({ side: THREE.DoubleSide });
      mat.color.setHex(hexColor).multiplyScalar(intensity);
      const mesh = new THREE.Mesh(geom, mat);
      mesh.position.set(...pos);
      mesh.rotation.set(...rot);
      envScene.add(mesh);
    };

    // 6 strategic studio softbox light panels
    addStudioPanel(8, 8, 12, [0, 5.6, 0.6], [Math.PI / 2, 0, 0]);
    addStudioPanel(0.85, 8, 190, [-4.2, 0.4, 1.6], [0, Math.PI / 2, 0]);
    addStudioPanel(0.85, 8, 150, [4.2, 0.2, -0.8], [0, -Math.PI / 2, 0]);
    addStudioPanel(7, 5, 90, [0, 0.8, -5.4], [0, 0, 0], 0xfff6ea);
    addStudioPanel(1.4, 1.4, 320, [1.1, 1.4, -5.3], [0, 0, 0]);
    addStudioPanel(7, 7, 18, [0, -5.4, 0], [-Math.PI / 2, 0, 0], 0xfff2e0);

    const envMap = pmremGenerator.fromScene(envScene, 0.02).texture;
    pmremGenerator.dispose();
    return envMap;
  };

  // Engraving canvas texture generator
export const createEngravingTexture = (text: string) => {
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, 1024, 512);

    // Heart icon
    ctx.save();
    ctx.translate(512, 160);
    ctx.beginPath();
    ctx.moveTo(0, 32);
    ctx.bezierCurveTo(-4, 24, -50, 0, -50, -22);
    ctx.bezierCurveTo(-50, -44, -26, -50, -14, -40);
    ctx.bezierCurveTo(-6, -33, 0, -24, 0, -24);
    ctx.bezierCurveTo(0, -24, 6, -33, 14, -40);
    ctx.bezierCurveTo(26, -50, 50, -44, 50, -22);
    ctx.bezierCurveTo(50, 0, 4, 24, 0, 32);
    ctx.closePath();
    ctx.fillStyle = '#0000ff';
    ctx.fill();
    ctx.restore();

    // Text lines
    ctx.fillStyle = '#ff0000';
    ctx.font = '600 68px "Inter", sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    const lines = text.split('\n');
    lines.forEach((line, idx) => {
      ctx.fillText(line, 512, 280 + idx * 80);
    });

    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.ClampToEdgeWrapping;
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.anisotropy = 4;
    tex.needsUpdate = true;
    return tex;
  };

  // Setup Three.js scene on mount
