	var scene = new THREE.Scene();


var renderer;// = new THREE.WebGLRenderer();
//renderer.setSize( window.innerWidth, window.innerHeight );
//document.body.appendChild( renderer.domElement );
//var geometry = new THREE.BoxGeometry( 1, 1, 1 );
//var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
//var cube = new THREE.Mesh( geometry, material );
//scene.add( cube );

//camera.position.z = 5;
var clock = new THREE.Clock();
var MARGIN = 0;
			var SCREEN_HEIGHT = window.innerHeight - MARGIN * 2;
			var SCREEN_WIDTH  = window.innerWidth;
var camera;
var container;
var controls;
var mouseControls;
var geometry;
var material;
var cube;
init();
render();
rend();

function init(){
	camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

	container = document.createElement( 'div' );
				document.body.appendChild( container );
								
	controls = new THREE.FlyControls( camera );
	controls.movementSpeed = 10;
	controls.domElement = container;
	controls.rollSpeed = Math.PI / 24;
	controls.autoForward = false;
	controls.dragToLook = false;
	//controls.addEventListener( 'change', render );
				
	mouseControls = new THREE.OrbitControls( camera );
	mouseControls.damping = 0.2;
	mouseControls.addEventListener( 'change', rend );
				
	renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
container.appendChild( renderer.domElement );
geometry = new THREE.BoxGeometry( 1, 1, 1 );
material =  new THREE.MeshNormalMaterial( )  ;//new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
cube = new THREE.Mesh( geometry, material );
scene.add( cube );

geometry = new THREE.BoxGeometry( 1, 1, 1 );
material =  new THREE.MeshNormalMaterial( )  ;//new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
cube = new THREE.Mesh( geometry, material );
cube.position.set( 10, 10, 0 );
scene.add( cube );

var line_material = new THREE.LineBasicMaterial( { color: 0x303030 } ),
					geometry = new THREE.Geometry(),
					floor = -75, step = 25;

				for ( var i = 0; i <= 40; i ++ ) {

					geometry.vertices.push( new THREE.Vector3( - 500, floor, i * step - 500 ) );
					geometry.vertices.push( new THREE.Vector3(   500, floor, i * step - 500 ) );

					geometry.vertices.push( new THREE.Vector3( i * step - 500, floor, -500 ) );
					geometry.vertices.push( new THREE.Vector3( i * step - 500, floor,  500 ) );

				}

				var line = new THREE.Line( geometry, line_material, THREE.LinePieces );
				scene.add( line );

var line_material = new THREE.LineBasicMaterial( { color: 0x330000 } ),
					geometry = new THREE.Geometry(),
					floor = 75, step = 25;

				for ( var i = 0; i <= 40; i ++ ) {

					geometry.vertices.push( new THREE.Vector3( - 500, floor, i * step - 500 ) );
					geometry.vertices.push( new THREE.Vector3(   500, floor, i * step - 500 ) );

					geometry.vertices.push( new THREE.Vector3( i * step - 500, floor, -500 ) );
					geometry.vertices.push( new THREE.Vector3( i * step - 500, floor,  500 ) );

				}

				var line = new THREE.Line( geometry, line_material, THREE.LinePieces );
				scene.add( line );
				
camera.position.z = 5;
				
}

function changeTarget(vector){
	var rot = camera.getWorldRotation();
	mouseControls.target.copy(vector);
	//camera.lookAt( vector );
	//mouseControls.update();
	render();
	camera.setRotationFromEuler(rot);
}

 function onKeyDown( event ) {
	switch ( event.keyCode ) {

			 case 13:
				 changeTarget(camera.position);
				 break;
	}
 }
// this.addEventListener( 'dblclick', changeTarget, false );
this.addEventListener( 'keydown', onKeyDown, false );
function render() {
	requestAnimationFrame( render );
	

				var delta = clock.getDelta();
				controls.update( delta );
				//	mouseControls.target.add(camera.position);
			//	mouseControls.update();
			//mouseControls.reset(camera.position);
//var dx = Math.abs(mouseControls.target.x - camera.position.x);
//var dy = Math.abs(mouseControls.target.y - camera.position.y);
//mouseControls.pan(dx, dy);

renderer.clear();
	renderer.render( scene, camera );
}

function rend() {
//var rot = camera.getWorldRotation();
	
//		mouseControls.update();	
	renderer.clear();
	renderer.render( scene, camera );
	
	//camera.setRotationFromEuler(rot);
}