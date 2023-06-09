//////////////////////
/* GLOBAL VARIABLES */
//////////////////////

var scene, camera, renderer
var geometry, material, mesh;


var mesh_lambert_material_casa_paredes = new THREE.MeshLambertMaterial(); 
var mesh_phong_material_casa_paredes   = new   THREE.MeshPhongMaterial();
var mesh_toon_material_casa_paredes    = new    THREE.MeshToonMaterial();

var mesh_lambert_material_casa_teto    = new THREE.MeshLambertMaterial();
var mesh_phong_material_casa_teto      = new   THREE.MeshPhongMaterial();
var mesh_toon_material_casa_teto       = new    THREE.MeshToonMaterial();

var mesh_lambert_material_tronco       = new THREE.MeshLambertMaterial();
var mesh_phong_material_tronco         = new   THREE.MeshPhongMaterial({ color: 0xD2691E}); 
var mesh_toon_material_tronco          = new    THREE.MeshToonMaterial();

var mesh_lambert_material_copa         = new THREE.MeshLambertMaterial();
var mesh_phong_material_copa           = new   THREE.MeshPhongMaterial({color:0x7CFC00}); 
var mesh_toon_material_copa            = new    THREE.MeshToonMaterial();

var mesh_lambert_material_cockpit      = new THREE.MeshLambertMaterial();
var mesh_phong_material_cockpit        = new   THREE.MeshPhongMaterial({color:0xE8E8E8});
var mesh_toon_material_cockpit         = new    THREE.MeshToonMaterial();

var mesh_lambert_material_nave         = new THREE.MeshLambertMaterial();
var mesh_phong_material_nave           = new   THREE.MeshPhongMaterial({color:0x808080});
var mesh_toon_material_nave            = new    THREE.MeshToonMaterial();

var mesh_phong_material_tronco         = new   THREE.MeshBasicMaterial({ color: 0xD2691E});
var mesh_phong_material_copa           = new   THREE.MeshBasicMaterial({color:0x7CFC00}); 

var cylinderlight, pointlight1, pointlight2, pointlight3, pointlight4;

var ovni;

var ovni_body_geometry,sphere_geometry;

var scale = 10;

var ovni_body,cockpit,ovni_cylinder;
var material_ovni_body=new THREE.MeshBasicMaterial({color:0x808080});
var material_ovni_cockpit=new THREE.MeshBasicMaterial({color:0xDC143C});
var material_ovni_cylinder=new THREE.MeshBasicMaterial({color:0x00FF00});
var material_ovni_light=new THREE.MeshBasicMaterial({color:0x9932CC});

var forward = false, backward = false, left = false, right = false;
var ovni_velocity=0.1;

var material_casa_paredes, material_casa_teto, material_tronco, material_copa, material_cockpit, material_nave;

/////////////////////
/* CREATE SCENE(S) */
/////////////////////
function createScene(){
    'use strict';

    scene = new THREE.Scene();
    scene.add(new THREE.AxesHelper(10));
    buildFloor();
    buildSkyDome();

    
    ovni=new THREE.Object3D();
    createTree(0,0,0);
    createTree(20,0,0);
    createTree(0,0,20);
    createOvni();
}

//////////////////////
/* CREATE CAMERA(S) */
//////////////////////
function createCamera() {
    //width = window.innerWidth / 2;
    //height = window.innerHeight / 2;
    //camera = new THREE.OrthographicCamera(- width, width, height, -height, 1, 1000);
    //camera.position.set(100, 0, 100);
    //camera.lookAt(scene.position);

    camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.set(25, 25, 25);
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
   //var texture == loader.load("texture do chao");
   floor_material = new THREE.MeshPhongMaterial({
    color : 0xffff00,
    displacementMap : displacement,
    displacementScale : 5,
    wireframe : true
   })
   var floor_cube = new THREE.PlaneGeometry(100, 100, 40, 25)
   var floor = new THREE.Mesh(floor_cube, floor_material)
   floor.rotation.x = Math.PI/2
   scene.add(floor) 
}

function buildSkyDome() {
    var skyGeo = new THREE.SphereGeometry(100, 25, 25); 
    //var loader  = new THREE.TextureLoader();
    //texture = loader.load( "images/space.jpg" ); // colocar aqui depois a textura que quero
    var material = new THREE.MeshPhongMaterial({ 
        //map: texture
        color : 0xffff00,
        wireframe: true
    });
    var sky = new THREE.Mesh(skyGeo, material);
    sky.material.side = THREE.BackSide;
    sky.position.y = -10
    scene.add(sky);
}

function createTree(x,y,z){
    tree=new THREE.Object3D();
    //create the main branch
    var tronco_principal = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.5, 5), mesh_phong_material_tronco);// raio de cima,raio debaixo,altura
    tronco_principal.position.set(0,2,0);
    
    //create the secondary branch
    var tronco_secundario=new THREE.Mesh(new THREE.CylinderGeometry(0.5,0.5,7),mesh_phong_material_tronco);
    tronco_secundario.position.set(2,7,0);
    tronco_secundario.rotation.z=-Math.PI/4;
   
    
    //create the minor branch
    var branch=new THREE.Mesh(new THREE.CylinderGeometry(0.5,0.5,3),mesh_phong_material_tronco);
    branch.position.set(-1,6,0);
    branch.rotation.z=Math.PI/3;

    
    //create the bigger treetop
    //comprimento,largura,altura
    var tree_geometry=new THREE.SphereGeometry(1);
    var copa_principal=new THREE.Mesh(tree_geometry,mesh_phong_material_copa);
    copa_principal.position.set(1,9,-1);

    copa_principal.scale.x = 2; // Scale along the x-axis
    copa_principal.scale.y = 2; // Scale along the y-axis
    copa_principal.scale.z = 6; // Scale along the z-axis

    
    
    
    //create the left treetoop
    var copa_1=new THREE.Mesh(tree_geometry,mesh_phong_material_copa);
    copa_1.position.set(-3,8,1);

    copa_1.scale.x=1.5;
    copa_1.scale.y=1.5;
    copa_1.scale.z=3;


    //create the right treetop
    var copa_2=new THREE.Mesh(tree_geometry,mesh_phong_material_copa);
    copa_2.position.set(5,9,0);

    copa_2.scale.x=1.5;
    copa_2.scale.y=1.5;
    copa_2.scale.z=3;

    //create tree
    tree.add(tronco_principal);
    tree.add(tronco_secundario);
    tree.add(branch);
    tree.add(copa_principal);
    tree.add(copa_1);
    tree.add(copa_2);
    tree.position.set(x,y,z);
    scene.add(tree);
}

function createOvni() {
    //create ovni body
    var ovni_body_geometry=new THREE.SphereGeometry(1);
    var ovni_body=new THREE.Mesh(ovni_body_geometry,material_ovni_body);
    ovni_body.position.set(0,20,0);
    ovni_body.rotation.x=Math.PI/2;

    ovni_body.scale.x=20;
    ovni_body.scale.y=20;
    ovni_body.scale.z=2;

    //create ovni cockpit
    var thetaStart = 0; // Ângulo inicial da calota (em radianos)
    var thetaLength = Math.PI; // Ângulo de abertura da calota (em radianos)
    var phiStart = 0; // Ângulo inicial da esfera completa (em radianos)
    var phiLength =Math.PI; // Ângulo de abertura da esfera completa (em radianos)

    var cockpit_geometry=new THREE.SphereGeometry(6,32, 32, thetaStart, thetaLength, phiStart, phiLength);
    var cockpit=new THREE.Mesh(cockpit_geometry,material_ovni_cockpit);
    cockpit.position.set(0,21,0);
    cockpit.rotation.x=-Math.PI/2;
    
    
    //create ovni cylinder
    var ovni_cylinder=new THREE.Mesh(new THREE.CylinderGeometry(7,7,2),material_ovni_cylinder);
    ovni_cylinder.position.set(0,18,0);
    cylinderlight=new THREE.SpotLight(0xFFFF00, 1, 0, 50);
    ovni_cylinder.add(cylinderlight);
    

    //create ovni lights
    var ovni_light1=new THREE.Mesh(new THREE.SphereGeometry(3,32,32),material_ovni_light);
    ovni_light1.position.set(12,18,0);
    pointlight1=new THREE.PointLight(0xFFFF00,1,60);
    ovni_light1.add(pointlight1);

    var ovni_light2=new THREE.Mesh(new THREE.SphereGeometry(3,32,32),material_ovni_light);
    ovni_light2.position.set(-12,18,0);
    pointlight2=new THREE.PointLight(0xFFFF00,1,60);
    ovni_light2.add(pointlight2);

    var ovni_light3=new THREE.Mesh(new THREE.SphereGeometry(3,32,32),material_ovni_light);
    ovni_light3.position.set(0,18,12);
    pointlight3=new THREE.PointLight(0xFFFF00,1,60);
    ovni_light3.add(pointlight3);

    var ovni_light4=new THREE.Mesh(new THREE.SphereGeometry(3,32,32),material_ovni_light);
    ovni_light4.position.set(0,18,-12);
    pointlight4=new THREE.PointLight(0xFFFF00,1,60);
    ovni_light4.add(pointlight4);

    //create the ovni
    ovni=new THREE.Object3D();
    ovni.add(ovni_body);
    ovni.add(cockpit);
    ovni.add(ovni_cylinder);
    ovni.add(ovni_light1);
    ovni.add(ovni_light2);
    ovni.add(ovni_light3);
    ovni.add(ovni_light4);
    scene.add(ovni);

}

function createCasa() {

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
    update_velocity();
    var rotation_velocity=0.01;
    ovni.rotation.y+=rotation_velocity;
}

function update_velocity() {
    // update velocity to the atrelado
    if (left && forward) {
        ovni.position.x -= ovni_velocity*Math.sqrt(2)/2;
        ovni.position.z -= ovni_velocity*Math.sqrt(2)/2;
    } else if (left && backward) {
        ovni.position.x -= ovni_velocity*Math.sqrt(2)/2;
        ovni.position.z += ovni_velocity*Math.sqrt(2)/2;
    } else if (right && forward) {
        ovni.position.x += ovni_velocity*Math.sqrt(2)/2;
        ovni.position.z -= ovni_velocity*Math.sqrt(2)/2;
    } else if (right && backward) {
        ovni.position.x += ovni_velocity*Math.sqrt(2)/2;
        ovni.position.z += ovni_velocity*Math.sqrt(2)/2;
    } else {
        if (forward) {
            ovni.position.z -= ovni_velocity;
        } else if (backward) {
            ovni.position.z += ovni_velocity;
        } else if (left) {
            ovni.position.x -= ovni_velocity;
        } else if (right) {
            ovni.position.x += ovni_velocity;
        }
    }
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
    window.addEventListener("keyup", onKeyUp);
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

    switch (e.keyCode) {
    //luzes
        case 80:
            console.log("bolas");
            pointlight1.intensity = 1 - pointlight1.intensity;
            pointlight2.intensity = 1 - pointlight2.intensity;
            pointlight3.intensity = 1 - pointlight3.intensity;
            pointlight4.intensity = 1 - pointlight4.intensity;
            break;

        case 83:
            console.log("cilindro");
            console.log(cylinderlight);
            cylinderlight.inteisity = 1 - cylinderlight.intensity;
            break;
        // arrow keys mudam variaveis booleanas que sao usadas no update
        case 37: // left arrow
            left = true;
            break;

        case 38: // up arrow
            forward = true;
            break;
        
        case 39: // right arrow
            right = true;
            break;

        case 40: // down arrow
            backward = true;
            break;
        case 81: //Q
            material_casa_paredes = mesh_lambert_material_casa_paredes;
            material_casa_teto    = mesh_lambert_material_casa_teto;
            material_tronco       = mesh_lambert_material_tronco;
            material_copa         = mesh_lambert_material_copa;
            material_cockpit      = mesh_lambert_material_cockpit;
            material_nave         = mesh_lambert_material_nave;
        case 69: //E
            material_casa_paredes = mesh_phong_material_casa_paredes;
            material_casa_teto    = mesh_phong_material_casa_teto;
            material_tronco       = mesh_phong_material_tronco;
            material_copa         = mesh_phong_material_copa;
            material_cockpit      = mesh_phong_material_cockpit;
            material_nave         = mesh_phong_material_nave;
        case 87: //W
            material_casa_paredes = mesh_toon_material_casa_paredes;
            material_casa_teto    = mesh_toon_material_casa_teto;
            material_tronco       = mesh_toon_material_tronco;
            material_copa         = mesh_toon_material_copa;
            material_cockpit      = mesh_toon_material_cockpit;
            material_nave         = mesh_toon_material_nave;
        case 82: //R
    }
    
}

///////////////////////
/* KEY UP CALLBACK */
///////////////////////
function onKeyUp(e){
    'use strict';

    switch(e.keyCode){
        // arrow keys mudam variaveis booleanas que sao usadas no update
        case 37: // left arrow
            left = false;
            break;
    
        case 38: // up arrow
            forward = false;
            break;
        
        case 39: // right arrow
            right = false;
            break;
    
        case 40: // down arrow
            backward = false;
            break;
        }
}
