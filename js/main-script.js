//////////////////////
/* GLOBAL VARIABLES */
//////////////////////
var renderer,scene;
var tronco_principal,tronco_secundario,branch;
var copa_principal,copa_1,copa_2;
var material_tronco   = new THREE.MeshBasicMaterial({ color: 0xD2691E});
var material_copa = new THREE.MeshBasicMaterial({color:0x7CFC00});
var material_ovni_body=new THREE.MeshBasicMaterial({color:0x808080});
var material_ovni_cockpit=new THREE.MeshBasicMaterial({color:0xE8E8E8});
var tree,ovni;
var ovni_body_geometry,sphere_geometry;
var camera_active;
/*
var ovni_body,cockpit,ovni_cylinder;
var ovni_light1,ovni_light2,ovni_light3,ovni_light4;
var material_ovni_body=new THREE.MeshBasicMaterial({color:0xC0C0C0,wireframe:mesh_or_not});
var material_ovni_cockpit=new THREE.MeshBasicMaterial({color:0x708090,wireframe:mesh_or_not});
var material_ovni_cylinder=new THREE.MeshBasicMaterial({color:0x708090,wireframe:mesh_or_not});
var material_ovni_light=new THREE.MeshBasicMaterial({color:0xFFFF00,wireframe:mesh_or_not});
var ovni;
*/

/////////////////////
/* CREATE SCENE(S) */
/////////////////////
function createScene(){
    'use strict';
    scene = new THREE.Scene();
    tree=new THREE.Object3D();
    ovni=new THREE.Object3D();
    createTree();
    createOvni();
    

}

//////////////////////
/* CREATE CAMERA(S) */
//////////////////////
// perspective camera
function createCameras() {
    'use strict';

    // perspective camera
    createFixedPerspectiveCamera(50, 50, 50);

    camera_active = camera_isometric_perspective;
}


function createFixedPerspectiveCamera(fx, fy, fz) {
    camera_isometric_perspective = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 1, 1000);
    camera_isometric_perspective.position.set(fx, fy, fz);
    camera_isometric_perspective.lookAt(scene.position);
}

/////////////////////
/* CREATE LIGHT(S) */
/////////////////////

////////////////////////
/* CREATE OBJECT3D(S) */
////////////////////////
function createTree(){
    //create the main branch
    var tronco_principal = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.5, 5), material_tronco);// raio de cima,raio debaixo,altura
    tronco_principal.position.set(0,2,0);
    
    //create the secondary branch
    var tronco_secundario=new THREE.Mesh(new THREE.CylinderGeometry(0.5,0.5,7),material_tronco);
    tronco_secundario.position.set(0,5,-3);
    tronco_secundario.rotation.z=-Math.PI/4;
   
    
    //create the minor branch
    var branch=new THREE.Mesh(new THREE.CylinderGeometry(0.5,0.5,3),material_tronco);
    branch.position.set(0,6,1);
    branch.rotation.z=Math.PI/3;

    
    //create the bigger treetop
    //comprimento,largura,altura
    var tree_geometry=new THREE.SphereGeometry(1);
    var copa_principal=new THREE.Mesh(tree_geometry,material_copa);
    copa_principal.position.set(0,10,-2);

    copa_principal.scale.x = 2; // Scale along the x-axis
    copa_principal.scale.y = 2; // Scale along the y-axis
    copa_principal.scale.z = 6; // Scale along the z-axis

    
    
    
    //create the left treetoop
    var copa_1=new THREE.Mesh(tree_geometry,material_copa);
    copa_1.position.set(0,9,2);

    copa_1.scale.x=1.5;
    copa_1.scale.y=1.5;
    copa_1.scale.z=3;


    //create the right treetop
    var copa_2=new THREE.Mesh(tree_geometry,material_copa);
    copa_2.position.set(0,7.5,-4);

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
    scene.add(tree);
}

function createOvni(){
    //create ovni body
    var ovni_body_geometry=new THREE.SphereGeometry(1);
    var ovni_body=new THREE.Mesh(ovni_body_geometry,material_ovni_body);
    ovni_body.position.set(0,30,0);
    ovni_body.rotation.x=Math.PI/2;

    ovni_body.scale.x=2;
    ovni_body.scale.y=10;
    ovni_body.scale.z=2;

    //create ovni cockpit
    var thetaStart = 0; // Ângulo inicial da calota (em radianos)
    var thetaLength = Math.PI; // Ângulo de abertura da calota (em radianos)
    var phiStart = 0; // Ângulo inicial da esfera completa (em radianos)
    var phiLength =Math.PI; // Ângulo de abertura da esfera completa (em radianos)

    var cockpit_geometry=new THREE.SphereGeometry(6,32, 32, thetaStart, thetaLength, phiStart, phiLength);
    var cockpit=new THREE.Mesh(cockpit_geometry,material_ovni_cockpit);
    cockpit.position.set(0,31,0);
    
    
    /*
    //create ovni cylinder
    var ovni_cylinder=new THREE.Mesh(new THREE.CylinderGeometry(),material_ovni_cylinder);
    ovni_cylinder.position.set();

    //create ovni lights
    var ovni_light1=new THREE.Mesh(new THREE.SphereGeometry(),material_ovni_light);
    ovni_light1.position.set();

    var ovni_light2=new THREE.Mesh(new THREE.SphereGeometry(),material_ovni_light);
    ovni_light2.position.set();

    var ovni_light3=new THREE.Mesh(new THREE.SphereGeometry(),material_ovni_light);
    ovni_light3.position.set();

    var ovni_light4=new THREE.Mesh(new THREE.SphereGeometry(),material_ovni_light);
    ovni_light4.position.set();*/

    //create the ovni
    ovni=new THREE.Object3D();
    ovni.add(ovni_body);
    ovni.add(cockpit);
    //ovni.add(ovni_cylinder);
    //ovni.add(ovni_light1);
    //ovni.add(ovni_light2);
    //ovni.add(ovni_light3);
    //ovni.add(ovni_light4);
    scene.add(ovni);

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
    renderer.render(scene, camera_active);
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
    createCameras();

    render();

}

/////////////////////
/* ANIMATION CYCLE */
/////////////////////
function animate() {
    'use strict';

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

}

///////////////////////
/* KEY UP CALLBACK */
///////////////////////
function onKeyUp(e){
    'use strict';

}