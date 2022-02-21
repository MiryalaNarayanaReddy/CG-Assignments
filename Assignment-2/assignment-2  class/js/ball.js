const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const geometry = new THREE.SphereGeometry();
const material = new THREE.MeshPhongMaterial({ color: 0x44aa88 });
const ball = new THREE.Mesh(geometry, material);
scene.add(ball);

camera.position.z = 5;


const color = 0xFFFFFF;
const intensity = 1;
const light = new THREE.DirectionalLight(color, intensity);
light.position.set(-1, 2, 4);
scene.add(light);

var velocity = 0
var accelaration = 0.01

function animate() {
    requestAnimationFrame(animate);

    // ball.rotation.x += 0.01;
    // ball.rotation.y += 0.01;

    // ball.posit

    // ball.position.y +=0.001
 
    ball.position.y += velocity
    velocity += accelaration;
  
    if (ball.position.y <= 0) {
        velocity = -velocity;
    }

    renderer.render(scene, camera);
};

animate();