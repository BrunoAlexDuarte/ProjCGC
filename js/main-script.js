//////////////////////
/* GLOBAL VARIABLES */
//////////////////////

var scene, camera, renderer

var mesh_lambert_material_casa_paredes = new THREE.MeshLambertMaterial(); 
var mesh_phong_material_casa_paredes   = new   THREE.MeshPhongMaterial();
var mesh_toon_material_casa_paredes    = new    THREE.MeshToonMaterial();

var mesh_lambert_material_casa_teto    = new THREE.MeshLambertMaterial();
var mesh_phong_material_casa_teto      = new   THREE.MeshPhongMaterial();
var mesh_toon_material_casa_teto       = new    THREE.MeshToonMaterial();

var mesh_lambert_material_tronco       = new THREE.MeshLambertMaterial();
var mesh_phong_material_tronco         = new   THREE.MeshPhongMaterial(); 
var mesh_toon_material_tronco          = new    THREE.MeshToonMaterial();

var mesh_lambert_material_copa         = new THREE.MeshLambertMaterial();
var mesh_phong_material_copa           = new   THREE.MeshPhongMaterial(); 
var mesh_toon_material_copa            = new    THREE.MeshToonMaterial();

var mesh_lambert_material_cockpit      = new THREE.MeshLambertMaterial();
var mesh_phong_material_cockpit        = new   THREE.MeshPhongMaterial();
var mesh_toon_material_cockpit         = new    THREE.MeshToonMaterial();

var mesh_lambert_material_nave         = new THREE.MeshLambertMaterial();
var mesh_phong_material_nave           = new   THREE.MeshPhongMaterial();
var mesh_toon_material_nave            = new    THREE.MeshToonMaterial();

/////////////////////
/* CREATE SCENE(S) */
/////////////////////
function createScene(){
    'use strict';

    scene = new THREE.Scene()
    scene.add(new THREE.AxesHelper(10))
    buildFloor()
    buildSkyDome()

}

//////////////////////
/* CREATE CAMERA(S) */
//////////////////////
function createCamera() {
    camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.set(50, 50, 50);
    camera.lookAt(scene.position);
}

/////////////////////
/* CREATE LIGHT(S) */
/////////////////////

////////////////////////
/* CREATE OBJECT3D(S) */
////////////////////////

function buildFloor() {
   const loader = new THREE.TextureLoader()
   const displacement = loader.load("heightmap.png")
   floor_material = new THREE.MeshPhongMaterial({
    color : 0xffff00,
    displacementMap : displacement,
    displacementScale : 5,
    wireframe : true
   })
   var floor_cube = new THREE.PlaneGeometry(100, 100, 40  , 25)
   var floor = new THREE.Mesh(floor_cube, floor_material)
   floor.rotation.x = Math.PI/2
   scene.add(floor) 
}

function buildSkyDome() {
    var skyGeo = new THREE.SphereGeometry(50, 25, 25); 
    //var loader  = new THREE.TextureLoader();
    //texture = loader.load( "images/space.jpg" ); // colocar aqui depois a textura que quero
    var material = new THREE.MeshPhongMaterial({ 
        //map: texture
        color : 0xffff00,
        wireframe: true
    });
    var sky = new THREE.Mesh(skyGeo, material);
    sky.material.side = THREE.BackSide;
    scene.add(sky);
}

//////////////////////
/* CHECK COLLISIONS */
//////////////////////
function checkCollisions(){
    'use strict';

}

///////////////////////
/* HANDLE COLLISIONS */
///////////////////////
function handleCollisions(){
    'use strict';

}

////////////
/* UPDATE */
////////////
function update(){
    'use strict';

}

/////////////
/* DISPLAY */
/////////////
function render() {
    'use strict';
    renderer.render(scene, camera)
}

////////////////////////////////
/* INITIALIZE ANIMATION CYCLE */
////////////////////////////////
function init() {
    'use strict';
    renderer = new THREE.WebGLRenderer({
        antialias: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    renderer.setClearColor( 0xffffff, 0);
    createScene();
    createCamera();

    render();

    window.addEventListener("resize", onResize);
    window.addEventListener("keydown", onKeyDown);
}

/////////////////////
/* ANIMATION CYCLE */
/////////////////////
function animate() {
    'use strict';
    update();

    render();
    requestAnimationFrame(animate);
}

////////////////////////////
/* RESIZE WINDOW CALLBACK */
////////////////////////////
function onResize() { 
    'use strict';

}

///////////////////////
/* KEY DOWN CALLBACK */
///////////////////////
function onKeyDown(e) {
    'use strict';

    switch(e.keyCode) {
        case 81: //Q
        case 69: //E
        case 87: //W
        case 82: //R
    }
}

///////////////////////
/* KEY UP CALLBACK */
///////////////////////
function onKeyUp(e){
    'use strict';

}