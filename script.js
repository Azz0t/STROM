import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js";
import { GLTFLoader } from "https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/loaders/GLTFLoader.js";

const container = document.getElementById("skull-container");

const scene = new THREE.Scene();
scene.background = new THREE.Color("#0a0a0a");

// Camera
const camera = new THREE.PerspectiveCamera(
  50,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

camera.position.z = 3.5;

const renderer = new THREE.WebGLRenderer({
  antialias: true,
  alpha: true
});

renderer.setSize(
  container.clientWidth,
  container.clientHeight
);
renderer.setClearColor(0x0a0a0a, 1);

container.appendChild(renderer.domElement);

renderer.domElement.style.width = "100%";
renderer.domElement.style.height = "100%";

const light = new THREE.DirectionalLight(0xffffff, 1.5);
light.position.set(2, 2, 2);
scene.add(light);

scene.add(new THREE.AmbientLight(0xffffff, 0.5));

const loader = new GLTFLoader();

let skull;

loader.load("/models/skull.glb", (gltf) => {
  skull = gltf.scene;

  const box = new THREE.Box3().setFromObject(skull);

  const size = new THREE.Vector3();
  const center = new THREE.Vector3();

  box.getSize(size);
  box.getCenter(center);

  skull.position.sub(center);

  const maxSize = Math.max(size.x, size.y, size.z);
  const scale = 1.5 / maxSize;

  skull.scale.setScalar(scale);

  skull.position.set(-0.8, -0.1, 0);


  console.log("Skull loaded", {
    size,
    center,
    scale
  });


  scene.add(skull);
});

const mouse = new THREE.Vector2();

window.addEventListener("mousemove", (event) => {

  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;

  mouse.y = (event.clientY / window.innerHeight) * 2 - 1;

});


window.addEventListener("resize", () => {

  const width = container.clientWidth;
  const height = container.clientHeight;

  camera.aspect = width / height;
  camera.updateProjectionMatrix();

  renderer.setSize(width, height);

});


// Animation
function animate() {

  requestAnimationFrame(animate);


  if (skull) {

    skull.rotation.y = THREE.MathUtils.lerp(
      skull.rotation.y,
      mouse.x * (Math.PI / 2),
      0.05
    );

    skull.rotation.x = THREE.MathUtils.lerp(
      skull.rotation.x,
      mouse.y * 0.3,
      0.05
    );

  }

  renderer.render(scene, camera);

}

animate();





/*==========| HEADER |==========*/
const nav = document.querySelector('header nav');
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('header nav a');

window.addEventListener('scroll', () => {
    let scrollPos = window.scrollY;
    let opacity = Math.min(0.5 + (scrollPos / 200) * 0.7, 1.0);
    nav.style.opacity = opacity;

    if (scrollPos > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

const observerOptions = {
    root: null,
    threshold: 0.6
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            navLinks.forEach(link => link.classList.remove('active'));
            
            const id = entry.target.getAttribute('id');
            const activeLink = document.querySelector(`header nav a[href="#${id}"]`);
            if (activeLink) activeLink.classList.add('active');
        }
    });
}, observerOptions);

sections.forEach(section => observer.observe(section));





/*==========| IMG - SECTION HISTORY |==========*/
const images = [
    './images/logos/logo-1.png',   
    './images/logos/logo-2.png',
    './images/logos/logo-3.png',
    './images/logos/logo-4.png',
];

let current = 0;
const imgElement = document.getElementById('rotating-image');

setInterval(() => {
    current = (current + 1) % images.length;
    imgElement.style.opacity = 0;
    setTimeout(() => {
        imgElement.src = images[current];
        imgElement.style.opacity = 1;
    }, 70);
}, 200);





/*==========| SCROLL GALLERY |==========*/
const section = document.querySelector(".section-gallery");
const tracks = section.querySelectorAll(".track");

let lastScroll = window.scrollY;

let isDown = false;
let lastX = 0;

// clone loop
tracks.forEach(track => {
  const items = Array.from(track.children);
  items.forEach(el => track.appendChild(el.cloneNode(true)));
});

const getCycleWidth = (track) => track.scrollWidth / 2;


section.addEventListener("pointerdown", (e) => {
  isDown = true;
  lastX = e.clientX;
  section.style.cursor = "grabbing";
  section.setPointerCapture(e.pointerId);
});

section.addEventListener("pointermove", (e) => {
  if (!isDown) return;

  const dx = e.clientX - lastX;
  lastX = e.clientX;

  tracks.forEach((track, i) => {
    const direction = i === 0 ? -0.7 : 0.7;

    let x = track._x || 0;
    const cycleWidth = getCycleWidth(track);

    x += dx * direction;

    if (x <= -cycleWidth) x += cycleWidth;
    if (x >= 0) x -= cycleWidth;

    track._x = x;
    track.style.transform = `translateX(${x}px)`;
  });
});

section.addEventListener("pointerup", (e) => {
  isDown = false;
  section.style.cursor = "grab";
  section.releasePointerCapture(e.pointerId);
});


function loop() {
  const currentScroll = window.scrollY;
  const deltaScroll = currentScroll - lastScroll;
  lastScroll = currentScroll;

  if (!isDown) {
    tracks.forEach((track, i) => {
      const direction = i === 0 ? -0.7 : 0.7;

      let x = track._x || 0;
      const cycleWidth = getCycleWidth(track);

      x += deltaScroll * direction;

      if (x <= -cycleWidth) x += cycleWidth;
      if (x >= 0) x -= cycleWidth;

      track._x = x;
      track.style.transform = `translateX(${x}px)`;
    });
  }

  requestAnimationFrame(loop);
}

loop();





/*==========| Language switcher |==========*/

window.setLang = function(lang) {

    document.querySelectorAll('[data-lang]').forEach(el => {

        el.style.display =
            el.getAttribute('data-lang') === lang
            ? ''
            : 'none';

    });


    // afficher uniquement l'autre langue
    document.getElementById('btn-en').style.display =
        lang === 'RU' ? '' : 'none';

    document.getElementById('btn-ru').style.display =
        lang === 'EN' ? '' : 'none';


    localStorage.setItem("language", lang);
};


// chargement
const savedLang = localStorage.getItem("language");

window.setLang(savedLang || "EN");
