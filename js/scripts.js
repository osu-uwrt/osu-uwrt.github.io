import * as THREE from '../node_modules/three/src/Three.js';
import {VRMLLoader} from '../node_modules/three/examples/jsm/loaders/VRMLLoader.js';
import { OrbitControls } from '../node_modules/three/examples/jsm/controls/OrbitControls.js';


var container;
var camera, controls, scene, renderer;
var lighting, ambient, keyLight, fillLight, backLight;
var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;

init();
//animate();


function init() {
    container = document.createElement('div');
    document.body.appendChild(container);

    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 2, 1000);
    camera.position.z = 10;
    camera.position.x = 10;
    camera.position.y = 10;
    
    scene = new THREE.Scene();
    ambient = new THREE.AmbientLight(0xffffff, 1.0);
    scene.add(ambient);
    
    keyLight = new THREE.DirectionalLight(new THREE.Color('hsl(30, 100%, 75%)'), 1.0);
    keyLight.position.set(-100, 0, 100);

    fillLight = new THREE.DirectionalLight(new THREE.Color('hsl(240, 100%, 75%)'), 0.75);
    fillLight.position.set(100, 0, 100);

    backLight = new THREE.DirectionalLight(0xffffff, 1.0);
    backLight.position.set(100, 0, -100).normalize();

    scene.add(keyLight);
    scene.add(fillLight);
    scene.add(backLight);
    
    const loader = new VRMLLoader();
    
    loader.load('assets/l200.wrl', function (vrml){
                    scene.add(vrml);
                }, undefined, function(error){
                    console.error( error);
                });

        

}



renderer = new THREE.WebGLRenderer();
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(new THREE.Color("hsl(0, 0%, 10%)"));

container.appendChild(renderer.domElement);

const vector = new THREE.Vector3(250, 250, 250);
const canvas = renderer.domElement; // `renderer` is a THREE.WebGLRenderer

vector.project(camera); // `camera` is a THREE.PerspectiveCamera

vector.x = Math.round((0.5 + vector.x / 2) * (canvas.width / window.devicePixelRatio));
vector.y = Math.round((0.5 - vector.y / 2) * (canvas.height / window.devicePixelRatio));

const annotation = document.querySelector('.annotation');
annotation.style.top = `${vector.y}px`;
annotation.style.left = `${vector.x}px`;

controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.25;
controls.enableZoom = false;


function render() {
    requestAnimationFrame(render);
    controls.update();
    renderer.render(scene, camera);
}

render();