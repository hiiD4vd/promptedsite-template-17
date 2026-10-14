import React, { useEffect, useRef, useState, useMemo } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { MeshoptDecoder } from 'three/examples/jsm/libs/meshopt_decoder.module.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { PRODUCT_MODELS, ModelConfig } from '../data/modelsData';

interface LoadedModelData {
  root: THREE.Group;
  mixer: THREE.AnimationMixer | null;
  openAction: THREE.AnimationAction | null;
  openRange: [number, number];
  openLength: number;
  gridUniforms: Array<any>;
  materials: THREE.Material[];
  shellMats: THREE.MeshStandardMaterial[];
  shellBaseColor: THREE.Color | null;
  partNodes: Array<{ node: THREE.Object3D; belongs: Record<string, string> }>;
  detailAnchor: THREE.Vector3 | null;
  engAnchor: THREE.Vector3 | null;
  engUniforms: any | null;
  basePos: THREE.Vector3;
  baseScale: number;
  centerPos: THREE.Vector3;
}

const MODEL_WEIGHTS: Record<string, number> = {
  luggage: 1.0,
  leather: 1.0,
  furniture: 1.45,
  chairs: 1.0,
  footwear: 1.0,
  bottles: 1.0,
  jewellery: 1.0
};
const TOTAL_WEIGHT = 7.45;

const CHAIR_OPTION_PRICES: Record<string, number> = {
  size_a: 0,
  size_b: 60,
  size_c: 120,
  fixed_arms: 0,
  fully_adjustable_arms: 150,
  upholstered_armpads: 0,
  leather_armpads: 95,
  posture_fit: 0,
  adjustable_lumbar_support: 60,
  adjustable_posturefit_sl: 110,
  caster_grp: 0,
  hard_caster_grp: 20,
  braking_caster_grp: 35,
  glide_grp: 15,
  standart_tilt_grp: 0,
  tilt_limiter_grp: 75,
  tilt_limiter_and_seat_angle_grp: 120
};

const CHAIR_OPTION_LABELS: Record<string, string> = {
  size_a: 'Size A',
  size_b: 'Size B',
  size_c: 'Size C',
  fixed_arms: 'Fixed arms',
  fully_adjustable_arms: 'Fully adjustable arms',
  upholstered_armpads: 'Upholstered armpads',
  leather_armpads: 'Leather armpads',
  posture_fit: 'PostureFit',
  adjustable_lumbar_support: 'Adjustable lumbar',
  adjustable_posturefit_sl: 'PostureFit SL',
  caster_grp: 'Standard casters',
  hard_caster_grp: 'Hard-floor casters',
  braking_caster_grp: 'Braking casters',
  glide_grp: 'Glides',
  standart_tilt_grp: 'Standard tilt',
  tilt_limiter_grp: 'Tilt limiter',
  tilt_limiter_and_seat_angle_grp: 'Tilt limiter + seat angle'
};

interface DeltaChip {
  id: number;
  label: string;
  amount: number;
}

export const Interactive3DSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [activeModelIndex, setActiveModelIndex] = useState<number>(0);
  const [localProgress, setLocalProgress] = useState<number>(0);
  const [modelScaleFactor, setModelScaleFactor] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isInteractive, setIsInteractive] = useState<boolean>(false);
  const [isPointerDownState, setIsPointerDownState] = useState<boolean>(false);
  const [chairStep, setChairStep] = useState<number>(0);
  const [deltaChips, setDeltaChips] = useState<DeltaChip[]>([]);
  const chipIdRef = useRef<number>(0);
  const prevChairStepRef = useRef<Record<string, string> | null>(null);

  // Three.js references
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const displayGroup = useRef<THREE.Group>(new THREE.Group());
  const modelsCache = useRef<Map<number, LoadedModelData>>(new Map());
  const loadingSet = useRef<Set<number>>(new Set());
  const studioEnvTexRef = useRef<THREE.Texture | null>(null);

  // Animation & input refs
  const activeModelIdxRef = useRef<number>(0);
  const localDRef = useRef<number>(0);
  const isPointerDown = useRef<boolean>(false);
  const dragRotation = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const dragVelocity = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const lastPointer = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const animFrameId = useRef<number | null>(null);

  // Create custom Studio HDR lighting environment for metals and diamonds
  const createStudioEnvironment = (renderer: THREE.WebGLRenderer) => {
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
  const createEngravingTexture = (text: string) => {
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
  useEffect(() => {
    if (!containerRef.current) return;

    const width = containerRef.current.clientWidth || window.innerWidth;
    const height = containerRef.current.clientHeight || window.innerHeight;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
    camera.position.set(0, 0, 5.2);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
      preserveDrawingBuffer: true
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    rendererRef.current = renderer;

    containerRef.current.replaceChildren(renderer.domElement);

    // Studio Environment map using PMREMGenerator & RoomEnvironment
    const pmrem = new THREE.PMREMGenerator(renderer);
    pmrem.compileEquirectangularShader();
    const roomEnv = new RoomEnvironment();
    scene.environment = pmrem.fromScene(roomEnv, 0.04).texture;
    scene.environmentIntensity = 0.55;

    // Custom studio environment for jewellery
    studioEnvTexRef.current = createStudioEnvironment(renderer);

    // Single active container group
    scene.add(displayGroup.current);

    // Authentic Studio Lighting
    const keyLight = new THREE.DirectionalLight(0xffd9a6, 2.7);
    keyLight.position.set(3, 3.4, 2.4);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xa8c4ff, 1.5);
    fillLight.position.set(-3.4, -0.6, -2);
    scene.add(fillLight);

    const softAmbient = new THREE.AmbientLight(0xffffff, 0.16);
    scene.add(softAmbient);

    // Preload all models
    for (let i = 0; i < PRODUCT_MODELS.length; i++) {
      loadModelByIndex(i);
    }

    // Main render loop
    let lastTime = performance.now();
    const animate = () => {
      animFrameId.current = requestAnimationFrame(animate);

      const now = performance.now();
      const delta = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;

      const currentIdx = activeModelIdxRef.current;
      const D = localDRef.current;
      const modelData = modelsCache.current.get(currentIdx);
      const currentConfig = PRODUCT_MODELS[currentIdx];

      if (modelData) {
        if (displayGroup.current.children[0] !== modelData.root) {
          displayGroup.current.clear();
          displayGroup.current.add(modelData.root);
        }
      }

      // Smooth drag inertia & decay
      if (!isPointerDown.current) {
        dragRotation.current.x += dragVelocity.current.x;
        dragRotation.current.y += dragVelocity.current.y;
        dragVelocity.current.x *= 0.93;
        dragVelocity.current.y *= 0.93;
      }

      if (modelData && currentConfig) {
        const root = modelData.root;

        // Reveal sweep calculation: local 0.3 to 0.56
        const revealVal = Math.max(0, Math.min(1, (D - 0.3) / 0.26));
        modelData.gridUniforms.forEach((u) => {
          u.uReveal.value = revealVal;
        });

        // Elastic Entry and Exit Scale (M factor)
        const H = currentIdx === 0 ? 0.04 : 0.08;
        const Y = currentIdx === PRODUCT_MODELS.length - 1 ? 1 : currentConfig.arDemo ? 0.93 : 0.86;
        let M = 1;
        if (currentIdx === 0 && D < H) {
          M = 1;
        } else if (D < H) {
          const z = D / H;
          M = Math.max(0, 1 + 2.70158 * Math.pow(z - 1, 3) + 1.70158 * Math.pow(z - 1, 2));
        } else if (D > Y) {
          const exitProg = (D - Y) / (1 - Y);
          M = Math.max(0, 1 - (2.70158 * Math.pow(exitProg, 3) - 1.70158 * Math.pow(exitProg, 2)));
        }
        setModelScaleFactor(M);

        // Rotation & poses matching design specifications
        const baseScrollY = D * Math.PI * 0.28;
        const poseX = currentConfig.pose?.x || (currentConfig.openPose ? currentConfig.openPose.x * 0.5 : 0);
        const poseY = currentConfig.pose?.y || (currentConfig.openPose ? currentConfig.openPose.y * 0.5 : 0);
        const poseZ = currentConfig.pose?.z || 0;

        root.rotation.x = poseX + dragRotation.current.x;
        root.rotation.y = poseY + baseScrollY + dragRotation.current.y;
        root.rotation.z = poseZ;

        // Base scale modulated by entrance/exit elastic easing
        let currentScale = modelData.baseScale * M;

        // Animation mixer update (Luggage, Leather)
        if (modelData.mixer && modelData.openAction) {
          const openStart = 0.56;
          const openEnd = 0.92;
          const openProgress = Math.max(0, Math.min(1, (D - openStart) / (openEnd - openStart)));
          const [fromT, toT] = modelData.openRange;
          const targetTime = fromT + openProgress * (toT - fromT);
          modelData.openAction.time = Math.min(targetTime, modelData.openLength - 1e-4);
          modelData.mixer.update(delta);
        }

        // Chairs part switching and step matching
        if (currentConfig.parts && modelData.partNodes.length > 0) {
          const steps = currentConfig.parts.steps;
          const stepProg = Math.max(0, Math.min(1, (D - 0.56) / (Y - 0.56)));
          const stepIdx = Math.min(Math.floor(stepProg * steps.length * 2) % steps.length, steps.length - 1);
          setChairStep(stepIdx);
          const currentStep = steps[stepIdx];

          // Trigger animated chip diffs when options switch
          if (prevChairStepRef.current && prevChairStepRef.current !== currentStep) {
            const oldStep = prevChairStepRef.current;
            for (const [axis, val] of Object.entries(currentStep)) {
              if (oldStep[axis] !== val) {
                const diff = (CHAIR_OPTION_PRICES[val] || 0) - (CHAIR_OPTION_PRICES[oldStep[axis]] || 0);
                const label = CHAIR_OPTION_LABELS[val] || val;
                const newChip: DeltaChip = { id: chipIdRef.current++, label, amount: diff };
                setDeltaChips((prev) => [...prev.slice(-3), newChip]);
                setTimeout(() => {
                  setDeltaChips((prev) => prev.filter((c) => c.id !== newChip.id));
                }, 2200);
              }
            }
          }
          prevChairStepRef.current = currentStep;

          for (const { node, belongs } of modelData.partNodes) {
            node.visible = Object.entries(belongs).every(([axis, val]) => {
              return currentStep[axis] === undefined || currentStep[axis] === val;
            });
          }
        }

        // Bottles finishes and engraving laser
        if (currentConfig.key === 'bottles') {
          // Color blend
          if (currentConfig.finishes && currentConfig.finishes.length > 1 && modelData.shellMats.length > 0) {
            const fProg = Math.max(0, Math.min(1, (D - 0.885) / (0.955 - 0.885)));
            const count = currentConfig.finishes.length;
            const fIdx = Math.min(Math.floor(fProg * (count - 1)), count - 2);
            const factor = fProg * (count - 1) - fIdx;
            const cA = new THREE.Color(currentConfig.finishes[fIdx]);
            const cB = new THREE.Color(currentConfig.finishes[fIdx + 1]);
            cA.lerp(cB, factor);
            modelData.shellMats.forEach((mat) => mat.color.copy(cA));
          }

          // Engraving laser progress
          if (modelData.engUniforms) {
            const engStart = 0.655;
            const engEnd = 0.855;
            const engProg = Math.max(0, Math.min(1, (D - engStart) / (engEnd - engStart)));
            modelData.engUniforms.uEngrave.value = engProg;
          }

          // Camera zoom into bottle engraving
          const zoomStart = 0.575;
          const zoomEnd = 0.645;
          const unzoomStart = 0.865;
          const unzoomEnd = 0.915;
          let engZoom = 0;
          if (D >= zoomStart && D < unzoomEnd) {
            const zIn = Math.max(0, Math.min(1, (D - zoomStart) / (zoomEnd - zoomStart)));
            const zOut = Math.max(0, Math.min(1, (D - unzoomStart) / (unzoomEnd - unzoomStart)));
            engZoom = zIn * (1 - zOut);
          }
          currentScale *= 1 + engZoom * 1.6;
        }

        // Leather color cycle
        if (currentConfig.key === 'leather' && currentConfig.finishes && modelData.shellMats.length > 0) {
          const fProg = Math.max(0, Math.min(1, (D - 0.56) / 0.38));
          const count = currentConfig.finishes.length;
          const fIdx = Math.min(Math.floor(fProg * (count - 1)), count - 2);
          const factor = fProg * (count - 1) - fIdx;
          const cA = new THREE.Color(currentConfig.finishes[fIdx]);
          const cB = new THREE.Color(currentConfig.finishes[fIdx + 1]);
          cA.lerp(cB, factor);
          modelData.shellMats.forEach((mat) => mat.color.copy(cA));
        }

        // Jewellery Zoom into Diamond & Environment Rotation
        if (currentConfig.detailZoom) {
          const zoomStart = 0.56;
          const zoomEnd = 0.7;
          const unzoomStart = 0.8;
          const unzoomEnd = Y;
          const zIn = Math.max(0, Math.min(1, (D - zoomStart) / (zoomEnd - zoomStart)));
          const zOut = Math.max(0, Math.min(1, (D - unzoomStart) / (unzoomEnd - unzoomStart)));
          const smoothZ = (zIn * zIn * (3 - 2 * zIn)) * (1 - (zOut * zOut * (3 - 2 * zOut)));

          currentScale *= 1 + smoothZ * (currentConfig.detailZoom.zoom - 1);
          root.scale.setScalar(currentScale);

          if (modelData.detailAnchor && smoothZ > 0.001) {
            const e3 = modelData.detailAnchor.clone().applyEuler(root.rotation);
            const offsetX = (currentConfig.detailZoom.offset ? currentConfig.detailZoom.offset[0] : 0) * smoothZ * 0.4;
            const offsetY = (currentConfig.detailZoom.offset ? currentConfig.detailZoom.offset[1] : 0) * smoothZ * 0.4;
            root.position.set(
              modelData.basePos.x - e3.x * smoothZ + offsetX,
              modelData.basePos.y - e3.y * smoothZ + offsetY,
              modelData.basePos.z
            );
          } else {
            root.position.copy(modelData.basePos);
          }

          // Rotating HDR light highlights over diamond facets
          const envRotVal = 5.76 + D * 2.4;
          modelData.gridUniforms.forEach((u) => {
            if (u.uEnvRot) u.uEnvRot.value = envRotVal;
          });
        } else {
          root.scale.setScalar(currentScale);
          root.position.copy(modelData.basePos);
        }
      }

      renderer.render(scene, camera);
    };

    animFrameId.current = requestAnimationFrame(animate);

    // Resize handler
    const handleResize = () => {
      if (!containerRef.current || !renderer || !camera) return;
      const w = containerRef.current.clientWidth || window.innerWidth;
      const h = containerRef.current.clientHeight || window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
      renderer.dispose();
      pmrem.dispose();
      roomEnv.dispose();
      if (studioEnvTexRef.current) studioEnvTexRef.current.dispose();
    };
  }, []);

  // Helper to load model into cache
  const loadModelByIndex = (index: number) => {
    if (index < 0 || index >= PRODUCT_MODELS.length) return;
    if (modelsCache.current.has(index) || loadingSet.current.has(index)) return;

    loadingSet.current.add(index);
    const config = PRODUCT_MODELS[index];
    const loader = new GLTFLoader();
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.7/');
    loader.setDRACOLoader(dracoLoader);
    loader.setMeshoptDecoder(MeshoptDecoder);

    loader.load(
      config.url,
      (gltf) => {
        const root = gltf.scene;
        const camera = cameraRef.current;
        if (!camera) return;

        // 1. Traverse meshes and apply nodeMaterials overrides (both exact and prefix)
        const cleanStr = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, '');
        root.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            const mesh = child as THREE.Mesh;
            const cleanName = cleanStr(mesh.name || '');

            let nodeOverride = config.nodeMaterials?.[mesh.name];
            if (!nodeOverride && config.nodeMaterials && cleanName) {
              const sortedKeys = Object.keys(config.nodeMaterials).sort((a, b) => b.length - a.length);
              const matched = sortedKeys.find((k) => cleanName.startsWith(cleanStr(k)));
              if (matched) nodeOverride = config.nodeMaterials[matched];
            }

            if (nodeOverride && !Array.isArray(mesh.material)) {
              const cloned = mesh.material.clone() as THREE.MeshStandardMaterial;
              cloned.name = `tea-node-${mesh.name}`;
              if (nodeOverride.color !== undefined) cloned.color.setHex(nodeOverride.color);
              if (nodeOverride.roughness !== undefined) cloned.roughness = nodeOverride.roughness;
              if (nodeOverride.metalness !== undefined) cloned.metalness = nodeOverride.metalness;
              mesh.material = cloned;
            }
          }
        });

        // 2. Hide unwanted ground / overlay meshes
        if (config.hideMaterials && config.hideMaterials.length > 0) {
          root.traverse((child) => {
            if ((child as THREE.Mesh).isMesh) {
              const mesh = child as THREE.Mesh;
              const mats = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
              if (mats.some((m) => m && config.hideMaterials?.includes(m.name))) {
                mesh.visible = false;
              }
            }
          });
        }

        // 3. Apply config.materials overrides (CRITICAL for metallic Rimowa luggage shell & interior)
        root.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            const mesh = child as THREE.Mesh;
            const mats = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
            mats.forEach((mat) => {
              if (!mat) return;
              const mOverride = config.materials?.[mat.name];
              if (mOverride) {
                if (mOverride.color !== undefined && 'color' in mat) (mat as any).color.setHex(mOverride.color);
                if (mOverride.roughness !== undefined && 'roughness' in mat) (mat as any).roughness = mOverride.roughness;
                if (mOverride.metalness !== undefined && 'metalness' in mat) (mat as any).metalness = mOverride.metalness;
                if (mOverride.envMapIntensity !== undefined && 'envMapIntensity' in mat) (mat as any).envMapIntensity = mOverride.envMapIntensity;
                mat.needsUpdate = true;
              }
            });
          }
        });

        // 4. Calculate fitting scale & center position matching exact bounding box logic
        root.updateMatrixWorld(true);
        const box = new THREE.Box3();
        root.traverseVisible((child) => {
          if ((child as THREE.Mesh).isMesh) box.expandByObject(child);
        });
        if (box.isEmpty()) box.setFromObject(root);

        const size = new THREE.Vector3();
        const center = new THREE.Vector3();
        box.getSize(size);
        box.getCenter(center);

        // Exact framing values: 0.66 default, 0.432 for furniture/dims, 0.83 tall
        const frameVal = config.frame !== undefined ? config.frame : (config.dims ? 0.432 : 0.66);
        const visH = 2 * camera.position.z * Math.tan((camera.fov * Math.PI) / 360);
        const visW = visH * camera.aspect;
        const fitScale = Math.min(
          (visH * frameVal) / Math.max(size.y, 1e-4),
          (visW * frameVal) / Math.max(config.fitDepth ? Math.max(size.x, size.z) : size.x, 1e-4)
        );

        root.scale.setScalar(fitScale);
        root.position.set(-center.x * fitScale, -center.y * fitScale, -center.z * fitScale);
        const basePos = root.position.clone();

        // 5. Generate aGridPos and aGridNrm buffer attributes across all model geometries
        root.updateMatrixWorld(true);
        const invRoot = root.matrixWorld.clone().invert();
        const minBounds = new THREE.Vector3(Infinity, Infinity, Infinity);
        const maxBounds = new THREE.Vector3(-Infinity, -Infinity, -Infinity);

        root.traverse((child) => {
          if ((child as THREE.Mesh).isMesh && child.visible) {
            const mesh = child as THREE.Mesh;
            const geom = mesh.geometry;
            if (!geom.getAttribute('aGridPos')) {
              const localMat = invRoot.clone().multiply(mesh.matrixWorld);
              const normalMat = new THREE.Matrix3().getNormalMatrix(localMat);
              const posAttr = geom.getAttribute('position');
              const nrmAttr = geom.getAttribute('normal');
              const count = posAttr.count;

              const gridPos = new Float32Array(count * 3);
              const gridNrm = new Float32Array(count * 3);
              const tempV = new THREE.Vector3();

              for (let i = 0; i < count; i++) {
                tempV.fromBufferAttribute(posAttr, i).applyMatrix4(localMat);
                gridPos[i * 3] = tempV.x;
                gridPos[i * 3 + 1] = tempV.y;
                gridPos[i * 3 + 2] = tempV.z;
                minBounds.min(tempV);
                maxBounds.max(tempV);

                if (nrmAttr) {
                  tempV.fromBufferAttribute(nrmAttr, i).applyMatrix3(normalMat).normalize();
                  gridNrm[i * 3] = tempV.x;
                  gridNrm[i * 3 + 1] = tempV.y;
                  gridNrm[i * 3 + 2] = tempV.z;
                }
              }

              geom.setAttribute('aGridPos', new THREE.BufferAttribute(gridPos, 3));
              geom.setAttribute('aGridNrm', new THREE.BufferAttribute(gridNrm, 3));
            }
          }
        });

        // 6. Setup Laser Scanning Shader & Diamond Refraction / Sparkling
        const gridDensity = 10 / Math.max(Math.max(maxBounds.x - minBounds.x, maxBounds.y - minBounds.y, maxBounds.z - minBounds.z), 1e-4);
        const gridUniforms: Array<any> = [];
        const materials: THREE.Material[] = [];
        const shellMats: THREE.MeshStandardMaterial[] = [];
        let shellBaseColor: THREE.Color | null = null;
        let engUniforms: any | null = null;
        let engAnchor: THREE.Vector3 | null = null;

        // Create engraving texture for bottles
        if (config.engraving) {
          const engTex = createEngravingTexture(config.engraving.text);
          const midX = (minBounds.x + maxBounds.x) / 2;
          const midZ = (minBounds.z + maxBounds.z) / 2;
          const engY = minBounds.y + config.engraving.at * (maxBounds.y - minBounds.y);
          const engRadius = Math.max(maxBounds.x - minBounds.x, maxBounds.z - minBounds.z) / 2;
          const arcWidth = 2 * config.engraving.arc * engRadius;

          engUniforms = {
            uEngTex: { value: engTex },
            uEngrave: { value: 0 },
            uEngC: { value: new THREE.Vector3(midX, engY, midZ) },
            uEngArc: { value: config.engraving.arc },
            uEngH: { value: arcWidth / (1024 / 512) / 2 },
            uEngRot: { value: (config.engraving.rotDeg * Math.PI) / 180 }
          };
          engAnchor = new THREE.Vector3(midX, engY, midZ).multiplyScalar(fitScale).add(basePos);
        }

        root.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            const mesh = child as THREE.Mesh;
            const mats = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
            mats.forEach((mat) => {
              if (!mat) return;

              // Authentic Diamond & 18k Yellow Gold for Jewellery
              const isDiamond = config.gemMaterial && mat.name === config.gemMaterial;
              const isGoldBand = config.unassignedMetal && (!mat.name || mat.name === 'Material');

              if (isDiamond) {
                const diamondMat = new THREE.MeshStandardMaterial({
                  name: mat.name,
                  color: 0xeef2ff,
                  metalness: 0.1,
                  roughness: 0.05,
                  envMapIntensity: 3.2
                });
                if (studioEnvTexRef.current) diamondMat.envMap = studioEnvTexRef.current;
                mesh.material = diamondMat;
                mat = diamondMat;
              } else if (isGoldBand) {
                const goldMat = new THREE.MeshPhysicalMaterial({
                  name: 'tea-metal',
                  color: config.unassignedMetal,
                  metalness: 1.0,
                  roughness: 0.15,
                  clearcoat: 0.72,
                  clearcoatRoughness: 0.46,
                  envMapIntensity: 1.1
                });
                if (studioEnvTexRef.current) goldMat.envMap = studioEnvTexRef.current;
                mesh.material = goldMat;
                mat = goldMat;
              }

              materials.push(mat);

              if (config.shellMaterial && mat.name === config.shellMaterial && mat instanceof THREE.MeshStandardMaterial) {
                shellMats.push(mat);
                shellBaseColor = mat.color.clone();
                if (config.shellTune) {
                  mat.metalness = config.shellTune.metalness;
                  mat.roughness = config.shellTune.roughness;
                }
              }

              const uniforms: any = {
                uReveal: { value: 0 },
                uGrid: { value: gridDensity },
                uStyle: { value: 0 },
                uLo: { value: minBounds.y },
                uHi: { value: maxBounds.y },
                uEnvRot: { value: 5.76 }
              };
              if (engUniforms) Object.assign(uniforms, engUniforms);
              gridUniforms.push(uniforms);

              mat.onBeforeCompile = (shader) => {
                Object.assign(shader.uniforms, uniforms);

                shader.vertexShader = shader.vertexShader
                  .replace(
                    '#include <common>',
                    `#include <common>
attribute vec3 aGridPos;
attribute vec3 aGridNrm;
varying vec3 vGridPos;
varying vec3 vGridNrm;`
                  )
                  .replace(
                    '#include <begin_vertex>',
                    `#include <begin_vertex>
vGridPos = aGridPos;
vGridNrm = aGridNrm;`
                  );

                // Diamond facet reflections, sparkling points, and dispersion in opaque_fragment
                if (isDiamond) {
                  shader.fragmentShader = shader.fragmentShader.replace(
                    '#include <opaque_fragment>',
                    `#include <opaque_fragment>
#ifdef ENVMAP_TYPE_CUBE_UV
{
    vec3 gV = normalize( vViewPosition );
    vec3 gN = normalize( normal );
    float gNdV = saturate( dot( gN, gV ) );
    float gF = 0.1723 + 0.8277 * pow( 1.0 - gNdV, 5.0 );

    vec3 gRefl = textureCubeUV( envMap, inverseTransformDirection( reflect( -gV, gN ), viewMatrix ), 0.0 ).rgb;
    vec3 gTr = inverseTransformDirection( refract( -gV, gN, 0.41536 ), viewMatrix );
    vec3 gTg = inverseTransformDirection( refract( -gV, gN, 0.41366 ), viewMatrix );
    vec3 gTb = inverseTransformDirection( refract( -gV, gN, 0.40785 ), viewMatrix );
    vec3 gRefr = vec3(
        textureCubeUV( envMap, gTr, 0.0 ).r,
        textureCubeUV( envMap, gTg, 0.0 ).g,
        textureCubeUV( envMap, gTb, 0.0 ).b
    );

    vec3 gBack = textureCubeUV( envMap, inverseTransformDirection( reflect( gV, gN ), viewMatrix ), 0.22 ).rgb;
    vec3 gCol = gRefr * 0.82 + gBack * 0.30 + gRefl * ( gF * 1.5 );
    gCol = mix( vec3( 0.03, 0.035, 0.045 ), gCol, saturate( length( gCol ) ) );

    // Sparkling Highlights
    vec3 sN = normalize( normal );
    vec3 sV = normalize( vViewPosition );
    float sA = dot( sN, normalize( vec3( 0.83, 0.42, 0.37 ) ) );
    float sB = dot( sN, normalize( vec3( -0.29, 0.88, -0.37 ) ) );
    float sC = dot( sN, normalize( vec3( 0.51, -0.34, 0.79 ) ) );
    float sw = sin( sA * 41.0 ) * sin( sB * 37.0 ) * sin( sC * 29.0 );
    float sparkle = smoothstep( 0.86, 0.995, abs( sw ) );
    sparkle *= smoothstep( 0.15, 0.65, saturate( dot( sN, sV ) ) );
    gCol += vec3( 1.0, 0.98, 0.94 ) * sparkle * 1.9;
    gCol *= vec3( 0.97, 0.99, 1.04 );
    gl_FragColor.rgb = gCol;
}
#endif`
                  );
                }

                // Laser scanline and gold triplanar lattice reveal
                shader.fragmentShader = shader.fragmentShader
                  .replace(
                    '#include <common>',
                    `#include <common>
varying vec3 vGridPos;
varying vec3 vGridNrm;
uniform float uReveal;
uniform float uGrid;
uniform float uStyle;
uniform float uLo;
uniform float uHi;
${
  engUniforms
    ? `uniform sampler2D uEngTex;
uniform float uEngrave;
uniform vec3 uEngC;
uniform float uEngArc;
uniform float uEngH;
uniform float uEngRot;`
    : ''
}

float teaLine(float v) {
    float w = fwidth(v);
    float f = abs(fract(v - 0.5) - 0.5);
    return 1.0 - smoothstep(0.0, w * 1.3, f);
}

float teaTri(vec2 p) {
    float a = p.x;
    float b = p.x * 0.5 + p.y * 0.8660254;
    float c = p.x * 0.5 - p.y * 0.8660254;
    return max(max(teaLine(a), teaLine(b)), teaLine(c));
}`
                  )
                  .replace(
                    '#include <dithering_fragment>',
                    `#include <dithering_fragment>
{
    vec3 p = vGridPos * uGrid;
    vec3 n = abs(normalize(vGridNrm));
    n = n / max(n.x + n.y + n.z, 1e-4);
    
    float g = clamp(
        teaTri(p.yz) * n.x +
        teaTri(p.xz) * n.y +
        teaTri(p.xy) * n.z, 0.0, 1.0);

    vec3 gold = vec3(0.792, 0.627, 0.361);
    vec3 skin = vec3(0.055, 0.050, 0.045);
    vec3 done = gl_FragColor.rgb;

    if (uStyle < 0.5) {
        float h = (vGridPos.y - uLo) / max(uHi - uLo, 1e-4);
        float front = uReveal * 1.25 - 0.12;
        float below = smoothstep(front + 0.04, front - 0.04, h);
        float edge = 1.0 - smoothstep(0.0, 0.045, abs(h - front));
        vec3 above = mix(skin, gold, g);
        gl_FragColor.rgb = mix(above, done, below);
        gl_FragColor.rgb = mix(gl_FragColor.rgb, gold, edge * 0.85);
    } else if (uStyle < 1.5) {
        vec3 first = mix(skin, gold, g);
        gl_FragColor.rgb = mix(first, done, uReveal);
    } else {
        gl_FragColor.rgb = mix(gold * 0.82, done, uReveal);
    }
}
${
  engUniforms
    ? `{
    vec3 q = vGridPos - uEngC;
    float ang = atan(q.x, q.z) - uEngRot;
    ang = mod(ang + 3.1415926, 6.2831853) - 3.1415926;
    vec2 euv = vec2(ang / (2.0 * uEngArc) + 0.5, q.y / (2.0 * uEngH) + 0.5);
    vec2 inw = step(vec2(0.0), euv) * step(euv, vec2(1.0));
    vec3 m = texture2D(uEngTex, clamp(euv, 0.0, 1.0)).rgb * (inw.x * inw.y);

    float groove = m.r;
    float lip = clamp(m.g - m.r, 0.0, 1.0);
    float enamel = m.b;

    float head = uEngrave * 1.06 - 0.03;
    float done = smoothstep(head + 0.008, head - 0.008, euv.x);
    float tip = (1.0 - smoothstep(0.0, 0.03, abs(euv.x - head))) * max(max(groove, lip), enamel) * step(0.001, uEngrave) * (1.0 - step(1.0, uEngrave));

    vec3 engGold = vec3(0.792, 0.627, 0.361);
    vec3 col = gl_FragColor.rgb;
    col = mix(col, col * 0.16, groove * done);
    col += engGold * lip * done * 0.28;
    col = mix(col, engGold * 0.92, enamel * done);
    col += engGold * tip * 1.5;
    gl_FragColor.rgb = col;
}`
    : ''
}`
                  );
              };
              mat.needsUpdate = true;
            });
          }
        });

        // 7. Animation Clip (Luggage & Leather opening)
        let mixer: THREE.AnimationMixer | null = null;
        let openAction: THREE.AnimationAction | null = null;
        let openLength = 4;
        if (config.openClip && gltf.animations.length > 0) {
          const clip = gltf.animations.find((c) => c.name === config.openClip) || gltf.animations[0];
          mixer = new THREE.AnimationMixer(root);
          openAction = mixer.clipAction(clip);
          openAction.play();
          openAction.paused = true;
          openAction.clampWhenFinished = true;
          openAction.setLoop(THREE.LoopOnce, 1);
          openLength = clip.duration;
        }

        // 8. Part nodes parser for configurable chairs
        const partNodes: Array<{ node: THREE.Object3D; belongs: Record<string, string> }> = [];
        if (config.parts) {
          const sortedAxes = Object.entries(config.parts.axes).map(([axis, vals]) => [
            axis,
            [...vals].sort((a, b) => b.length - a.length)
          ] as [string, string[]]);

          root.traverse((child) => {
            const childName = cleanStr(child.name || '');
            if (!childName) return;
            const belongs: Record<string, string> = {};
            for (const [axis, options] of sortedAxes) {
              const matched = options.find((opt) => childName.includes(cleanStr(opt)));
              if (matched) {
                belongs[axis] = matched;
              }
            }
            if (Object.keys(belongs).length > 0) {
              partNodes.push({ node: child, belongs });
            }
          });

          // Apply initial step 0 immediately
          const step0 = config.parts.steps[0];
          for (const { node, belongs } of partNodes) {
            node.visible = Object.entries(belongs).every(([axis, val]) => {
              return step0[axis] === undefined || step0[axis] === val;
            });
          }
        }

        // Find largest diamond gem center for focal zooming
        let largestGemCenter: THREE.Vector3 | null = null;
        if (config.gemMaterial) {
          let maxVol = -1;
          root.updateMatrixWorld(true);
          root.traverse((child) => {
            if ((child as THREE.Mesh).isMesh) {
              const mesh = child as THREE.Mesh;
              const mats = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
              if (mats.some((m) => m && m.name === config.gemMaterial)) {
                mesh.geometry.computeBoundingBox();
                const bBox = mesh.geometry.boundingBox;
                if (bBox) {
                  const vol = (bBox.max.x - bBox.min.x) * (bBox.max.y - bBox.min.y) * (bBox.max.z - bBox.min.z);
                  if (vol > maxVol) {
                    maxVol = vol;
                    const cLocal = bBox.getCenter(new THREE.Vector3());
                    cLocal.applyMatrix4(mesh.matrixWorld);
                    root.worldToLocal(cLocal);
                    largestGemCenter = cLocal;
                  }
                }
              }
            }
          });
        }

        const loadedData: LoadedModelData = {
          root,
          mixer,
          openAction,
          openRange: config.openRange || [0, openLength],
          openLength,
          gridUniforms,
          materials,
          shellMats,
          shellBaseColor,
          partNodes,
          detailAnchor: largestGemCenter ? (largestGemCenter as THREE.Vector3).clone().sub(center).multiplyScalar(fitScale) : null,
          engAnchor,
          engUniforms,
          basePos,
          baseScale: fitScale,
          centerPos: center
        };

        modelsCache.current.set(index, loadedData);
        loadingSet.current.delete(index);

        if (index === activeModelIdxRef.current) {
          displayGroup.current.clear();
          displayGroup.current.add(root);
          setIsLoading(false);
        }
      },
      undefined,
      (error) => {
        console.error('Error loading model', config.key, error);
        loadingSet.current.delete(index);
        setIsLoading(false);
      }
    );
  };

  // Switch visible model when activeModelIndex changes
  useEffect(() => {
    activeModelIdxRef.current = activeModelIndex;
    loadModelByIndex(activeModelIndex);

    const modelData = modelsCache.current.get(activeModelIndex);
    if (modelData) {
      if (displayGroup.current.children[0] !== modelData.root) {
        displayGroup.current.clear();
        displayGroup.current.add(modelData.root);
      }
      setIsLoading(false);
    } else {
      setIsLoading(true);
    }
  }, [activeModelIndex]);

  // Window scroll listener using exact model weights mapping
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const totalScrollable = rect.height - window.innerHeight;
      if (totalScrollable <= 0) return;

      const progress = Math.max(0, Math.min(1, -rect.top / totalScrollable));

      // Weighted model interval mapping
      let accumulated = 0;
      let matchedIdx = PRODUCT_MODELS.length - 1;
      let localFraction = 1;

      for (let r = 0; r < PRODUCT_MODELS.length; r++) {
        const itemWeight = (MODEL_WEIGHTS[PRODUCT_MODELS[r].key] || 1.0) / TOTAL_WEIGHT;
        if (progress < accumulated + itemWeight || r === PRODUCT_MODELS.length - 1) {
          matchedIdx = r;
          localFraction = Math.max(0, Math.min(1, (progress - accumulated) / itemWeight));
          break;
        }
        accumulated += itemWeight;
      }

      activeModelIdxRef.current = matchedIdx;
      localDRef.current = localFraction;

      setActiveModelIndex(matchedIdx);
      setLocalProgress(localFraction);
      setIsInteractive(localFraction >= 0.7);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Free pointer orbital drag handlers
  const handlePointerDown = (e: React.PointerEvent) => {
    isPointerDown.current = true;
    setIsPointerDownState(true);
    lastPointer.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isPointerDown.current) return;
    const deltaX = (e.clientX - lastPointer.current.x) * 0.007;
    const deltaY = (e.clientY - lastPointer.current.y) * 0.007;

    dragRotation.current.y += deltaX;
    dragRotation.current.x = Math.max(-0.6, Math.min(0.6, dragRotation.current.x + deltaY));

    dragVelocity.current = { x: deltaY * 0.4, y: deltaX * 0.4 };
    lastPointer.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerUp = () => {
    isPointerDown.current = false;
    setIsPointerDownState(false);
  };

  const currentItem = PRODUCT_MODELS[activeModelIndex] || PRODUCT_MODELS[0];

  // Authentic Chair Configured Pricing
  const chairConfig = PRODUCT_MODELS.find((m) => m.key === 'chairs');
  const currentChairStepConfig = chairConfig?.parts?.steps[chairStep] || chairConfig?.parts?.steps[0];
  const calculatedChairPrice = useMemo(() => {
    if (!currentChairStepConfig) return 1705;
    const base = 1095;
    const extra = Object.values(currentChairStepConfig).reduce((sum, key) => sum + (CHAIR_OPTION_PRICES[key] ?? 0), 0);
    return base + extra;
  }, [currentChairStepConfig]);

  return (
    <section
      ref={sectionRef}
      aria-label="What we build"
      className="relative w-full bg-[var(--bg)]"
      data-section="SC"
      data-section-name="Koncept vertikale"
      id="configurator"
      style={{ height: `${360 * TOTAL_WEIGHT}vh` }}
    >
      <div
        className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between select-none"
        onPointerCancel={handlePointerUp}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        style={{ cursor: isInteractive ? (isPointerDownState ? 'grabbing' : 'grab') : 'default' }}
      >
        {/* AR Room backdrop for Furniture */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 transition-opacity duration-700"
          style={{ opacity: currentItem.key === 'furniture' && localProgress > 0.4 ? 0.85 : 0 }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-[#1a1815] via-[#141311] to-[#0f0e0c]" />
          <div className="absolute left-0 top-0 overflow-hidden rounded-[40px] w-full h-full">
            <img alt="" className="absolute inset-0 h-full w-full object-cover" src="/models/ar-room.webp" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0e0d0c]/40" />
            <div className="absolute left-1/2 top-[22%] h-[60%] w-[70%] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_50%_30%,rgba(255,217,166,0.16)_0%,rgba(255,217,166,0.05)_45%,transparent_72%)]" />
            <div className="absolute inset-x-0 bottom-0 h-[46%]" style={{ perspective: '520px' }}>
              <div
                className="absolute inset-x-[-40%] top-0 h-[220%] origin-top"
                style={{
                  transform: 'rotateX(62deg)',
                  backgroundImage:
                    'linear-gradient(to right, rgba(202,160,92,0.16) 1px, transparent 1px), linear-gradient(to bottom, rgba(202,160,92,0.16) 1px, transparent 1px)',
                  backgroundSize: '56px 56px',
                  maskImage: 'linear-gradient(180deg, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.35) 45%, rgba(0,0,0,0) 100%)',
                  WebkitMaskImage: 'linear-gradient(180deg, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.35) 45%, rgba(0,0,0,0) 100%)'
                }}
              />
            </div>
          </div>
        </div>

        {/* WebGL Canvas Container */}
        <div ref={containerRef} className="absolute inset-0 pointer-events-none" />

        {/* Top Interactive Cue Pill */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-[7%] inline-flex -translate-x-1/2 items-center gap-2 rounded-full border border-brand-border bg-[var(--bg)]/70 backdrop-blur-md px-3.5 py-1.5 transition-opacity duration-500 z-20"
          style={{ opacity: isInteractive ? 1 : 0 }}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-brand-gold animate-pulse" />
          <span className="spec text-[var(--ink)]">Drag to rotate 360°</span>
        </div>

        {/* Center Loading Indicator */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-[42%] inline-flex -translate-x-1/2 items-center gap-2 rounded-full border border-brand-border bg-[var(--bg)]/80 px-4 py-2 backdrop-blur-md transition-opacity duration-500 z-20"
          style={{ opacity: isLoading ? 1 : 0 }}
        >
          <span className="h-2 w-2 rounded-full bg-brand-gold animate-ping" />
          <span className="spec text-[var(--ink)]">Loading 3D model</span>
        </div>


        {/* Bottom HUD: Specs & Details with Parallax Translation */}
        <div
          className="pointer-events-none relative z-10 p-6 sm:p-10 lg:p-16 flex justify-between items-end w-full transition-transform duration-300 ease-out"
          style={{
            transform: `translateY(${(0.5 - localProgress) * 22}px)`,
            opacity: Math.min(modelScaleFactor, 1)
          }}
        >
          <div className="max-w-xl">
            {/* Center Scroll Cue */}
            <div
              aria-hidden="true"
              className="inline-flex items-center gap-2.5 rounded-full border border-brand-border bg-[var(--bg)]/70 px-3.5 py-1.5 mb-4 backdrop-blur-md transition-opacity duration-500"
              style={{ opacity: !isInteractive && !isLoading ? 1 : 0 }}
            >
              <span className="relative h-3.5 w-px overflow-hidden bg-[var(--line-strong)]">
                <span className="vc-scroll-cue absolute inset-x-0 top-0 h-1.5 bg-brand-gold" />
              </span>
              <span className="spec whitespace-nowrap text-[var(--ink)]">Keep scrolling</span>
            </div>

            <p className="section-label w-fit flex items-center border border-brand-border rounded-full px-4 py-1.5 mb-3 bg-[var(--bg)]/40 backdrop-blur-sm">
              <span className="text-brand-gold mr-2" aria-hidden="true">•</span>
              WHAT WE BUILD · {String(activeModelIndex + 1).padStart(2, '0')} / {String(PRODUCT_MODELS.length).padStart(2, '0')}
            </p>

            <h2 className="t-headline text-[var(--ink)] tracking-tight text-4xl sm:text-5xl lg:text-6xl font-normal">
              {currentItem.label}
            </h2>

            <p className="t-lead mt-3 max-w-[52ch] text-[var(--ink-dim)] text-base sm:text-lg">
              {currentItem.line}
            </p>

            <p className="spec mt-4 text-xs font-mono text-[var(--ink-dim)] opacity-80">
              {currentItem.spec}
              {currentItem.dims && <span> · {currentItem.dims.w} × {currentItem.dims.h} × {currentItem.dims.d} {currentItem.dims.unit}</span>}
            </p>

            {currentItem.arDemo && (
              <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-brand-border px-3.5 py-1.5 text-[var(--ink)]">
                <span className="text-brand-gold text-xs">◆</span>
                <span className="spec text-[var(--ink)] text-xs">AR · iPhone and Android, the same model</span>
              </div>
            )}
          </div>

          {/* Bottom Right: Live Chair Options Stack & Pricing */}
          {currentItem.key === 'chairs' && (
            <div className="pointer-events-none flex flex-col items-end">
              {/* Floating Animated Delta Badges */}
              <div className="relative mb-2 flex h-[80px] w-[280px] flex-col items-end justify-end overflow-hidden">
                {deltaChips.map((chip, idx) => (
                  <div
                    key={chip.id}
                    className="absolute right-0 flex items-baseline gap-2 whitespace-nowrap transition-all duration-700 ease-out"
                    style={{
                      bottom: `${idx * 26}px`,
                      opacity: 1
                    }}
                  >
                    <span className="t-small text-[var(--ink-dim)] text-xs font-medium">{chip.label}</span>
                    <span className="spec tabular-nums text-brand-gold font-mono font-bold text-sm">
                      {chip.amount >= 0 ? '+' : '−'} €{Math.abs(chip.amount)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Price Label */}
              <div className="section-label text-[var(--ink-dim)] text-[11px] uppercase tracking-wider font-mono">
                CONFIGURED PRICE
              </div>

              {/* Price Total */}
              <div className="t-headline mt-1 tabular-nums text-[var(--ink)] text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight">
                <span className="text-brand-gold mr-1">€</span>
                {calculatedChairPrice.toLocaleString()}
              </div>

              <div className="t-small mt-1 text-[var(--ink-dim)] opacity-70 text-xs">
                example prices, not a price list
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Interactive3DSection;
