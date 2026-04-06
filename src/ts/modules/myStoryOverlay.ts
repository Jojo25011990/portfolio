import * as THREE from 'three';
import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';

export default function myStoryOverlay() {
  // --- Select elements ---
  const myStory = document.querySelector<HTMLElement>('.my-story');
  const canvas =
    document.querySelector<HTMLCanvasElement>('.my-story__overlay');

  // --- Create overlay button ---
  const overlayButton = document.createElement('button');
  overlayButton.textContent = 'Enter Story';
  overlayButton.className = 'overlay-button';
  myStory!.appendChild(overlayButton);

  const overlayParagraph = document.createElement('p');
  overlayParagraph.textContent =
    'Best experienced with sound on. Headphones recommended.';
  overlayParagraph.className = 'my-story__overlay-description';
  myStory!.appendChild(overlayParagraph);

  // --- Scene & Camera ---
  const width = myStory!.clientWidth;
  const height = myStory!.clientHeight;

  const scene = new THREE.Scene();
  scene.background = new THREE.Color('#111');

  const camera = new THREE.PerspectiveCamera(70, width / height, 0.1, 100);
  camera.position.set(0, 0, 15);

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
      //   bevelSize: 0.05,
      bevelSize: 0.05,
    });
    textGeometry.center();
    // textGeometry.rotateZ;

    const material = new THREE.MeshPhongMaterial({ color: '#4ee1a0' });
    const textMesh = new THREE.Mesh(textGeometry, material);
    scene.add(textMesh);

    animate();
  });

  // --- Animate function ---
  function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
  }

  // --- Resize listener ---
  window.addEventListener('resize', () => {
    const w = myStory!.clientWidth;
    const h = myStory!.clientHeight;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
  });

  // --- Button to hide overlay ---
  overlayButton.addEventListener('click', () => {
    canvas!.style.transform = 'translateY(-100%)';
    overlayButton.style.display = 'none';
    overlayParagraph.style.display = 'none';
    // sem môžeš spustiť svoj dragon storytelling anim
  });
}
