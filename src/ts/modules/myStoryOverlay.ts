import * as THREE from 'three';
import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';
import gsap from 'gsap';
import myStory from './myStory';

export default function myStoryOverlay() {
  // --- Select elements ---
  const myOverlay = document.querySelector<HTMLElement>('.my-overlay');
  const myOverlayButton = document.querySelector<HTMLButtonElement>(
    '.my-overlay__button',
  );

  const canvas = document.querySelector<HTMLCanvasElement>(
    '.my-overlay__canvas',
  );

  // --- Scene & Camera ---
  const width = myOverlay!.clientWidth;
  const height = myOverlay!.clientHeight;

  const scene = new THREE.Scene();
  scene.background = new THREE.Color('#070707');

  const camera = new THREE.PerspectiveCamera(70, width / height, 0.1, 100);
  camera.position.z = 13;

  // --- Renderer ---
  const renderer = new THREE.WebGLRenderer({
    canvas: canvas!,
    antialias: true,
  });
  renderer.setSize(width, height);
  renderer.setPixelRatio(window.devicePixelRatio);

  // --- Lights ---
  const ambientLight = new THREE.AmbientLight(0x4ee1a0, 0.1);
  const dirLight = new THREE.DirectionalLight(0xffffff, 1);
  //   dirLight.position.set(10, 10, 10);
  dirLight.position.set(0, 10, 10);
  //   ambientLight.position.set(50, 500, 30);
  //   scene.add(dirLight);
  //   scene.add(ambientLight);
  scene.add(ambientLight, dirLight);

  // --- Responsive text size ---
  let textSize: number;
  if (width >= 1200) textSize = 1.5;
  else if (width >= 768) textSize = 1;
  else if (width >= 500) textSize = 0.8;
  else textSize = 0.6;

  // --- Load font + create 3D text ---
  const loader = new FontLoader();
  loader.load('src/assets/fonts/Space Grotesk_Bold.json', font => {
    const textGeometry = new TextGeometry('ENTER THE JOURNEY', {
      font,
      size: textSize,
      depth: 2,
      curveSegments: 20,
      bevelEnabled: true,
      bevelThickness: 0.1,
      bevelSize: 0.05,
    });
    textGeometry.center();

    const material = new THREE.MeshPhongMaterial({
      color: 0x4ee1a0,
    });
    const textMesh = new THREE.Mesh(textGeometry, material);
    scene.add(textMesh);

    gsap.from(textMesh.scale, {
      scrollTrigger: {
        trigger: myOverlay,
        start: 'top center',
        once: true,
      },

      x: 0,
      y: 0,
      z: 0,
      duration: 1.5,
      ease: 'power2',
    });

    // --- Back spot light ---

    animate();
  });

  // --- Animate function ---
  function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
  }

  myOverlayButton?.addEventListener('click', () => {
    myOverlay?.classList.add('active');

    myStory();
  });
}
