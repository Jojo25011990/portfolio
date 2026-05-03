import * as THREE from 'three';
import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';
import gsap from 'gsap';
import myStory from './myStory';

export default function myStoryOverlay() {
  // *** Select Elements ***
  const myOverlay = document.querySelector<HTMLElement>('.my-overlay');
  const myOverlayButton = document.querySelector<HTMLButtonElement>(
    '.my-overlay__button',
  );

  const canvas = document.querySelector<HTMLCanvasElement>(
    '.my-overlay__canvas',
  );
  // *** End of Select Elements ***

  // *** Scene | Camera | Aspect Ratio ***
  const aspectRatio = {
    width: myOverlay!.clientWidth,
    height: myOverlay!.clientHeight,
  };

  const scene = new THREE.Scene();
  scene.background = new THREE.Color('#070707');

  const camera = new THREE.PerspectiveCamera(
    70,
    aspectRatio.width / aspectRatio.height,
    0.1,
    100,
  );
  camera.position.z = 13;
  // *** End of Scene | Camera | Aspect Ratio ***

  // *** Renderer | Lights ****
  const renderer = new THREE.WebGLRenderer({
    canvas: canvas!,
    antialias: true,
  });
  renderer.setSize(aspectRatio.width, aspectRatio.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  const ambientLight = new THREE.AmbientLight(0x4ee1a0, 0.1);
  const dirLight = new THREE.DirectionalLight(0xffffff, 1);

  dirLight.position.set(0, 10, 10);
  scene.add(ambientLight, dirLight);
  // *** End of Renderer | Lights ****

  // *** Responsive Design ***
  let textSize: number;
  if (aspectRatio.width >= 1200) textSize = 1.5;
  else if (aspectRatio.width >= 768) textSize = 1;
  else if (aspectRatio.width >= 500) textSize = 0.8;
  else textSize = 0.6;
  // *** End of Responsive Design ***

  // *** 3D Text | Material | Mesh | Gsap Anim ***
  const fontUrl = '/portfolio/fonts/space-grotesk-bold.json';

  const loader = new FontLoader();
  loader.load(fontUrl, font => {
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
  });
  // *** End of 3D Text | Material | Mesh | Gsap Anim ***

  // *** Animate | Loop ***
  let rafId: number;

  animate();
  function animate() {
    rafId = window.requestAnimationFrame(animate);
    renderer.render(scene, camera);
  }

  myOverlayButton?.addEventListener('click', () => {
    myOverlay?.classList.add('active');

    setTimeout(() => {
      if (myOverlay) myOverlay.style.display = 'none';

      window.cancelAnimationFrame(rafId);
      scene.clear();
      renderer.dispose();
    }, 1250);

    myStory();
  });
  // End of *** Animate | Loop ***
}
